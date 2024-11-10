#!/bin/bash

BASE_URL="https://opd-ai.github.io"  # Replace with your domain
START_DATE="2023-01-01"
OUTPUT_FILE="feed.xml"

# Function to extract and clean text content
extract_description() {
    local file="$1"
    # Extract content between episode-content div, remove HTML tags, 
    # take first 10 lines and limit to ~300 chars
    sed -n '/<div class="episode-content">/,/<\/div>/p' "$file" |
        sed 's/<[^>]*>//g' |
        tr '\n' ' ' |
        sed 's/[[:space:]]\+/ /g' |
        sed 's/\. /\.\n/g' |
        head -n 10 |
        tr '\n' ' ' |
        cut -c 1-300 |
        sed 's/\s*$/.../'
}

# Function to generate sequential date
generate_date() {
    local story="$1"
    local episode="$2"
    
    # Convert first letter of story to number (A=0, B=1, etc.)
    local story_num=$(printf "%d" "'${story:0:1}")
    story_num=$((story_num - 65))
    
    # Extract episode number
    local ep_num=$(echo "$episode" | grep -o '^[0-9]\+')
    
    # Calculate days to add
    local days_to_add=$((story_num * 100 + ep_num))
    
    # Generate date
    date -u -d "$START_DATE + $days_to_add days" "+%a, %d %b %Y %H:%M:%S GMT"
}

# Start RSS file
cat > "$OUTPUT_FILE" << EOF
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
    <title>Your Story Collection</title>
    <link>${BASE_URL}</link>
    <description>A collection of episodic stories</description>
    <language>en-us</language>
    <lastBuildDate>$(date -u "+%a, %d %b %Y %H:%M:%S GMT")</lastBuildDate>
EOF

# Create temporary file for items
TEMP_ITEMS=$(mktemp)

# Process each story
while IFS= read -r story_path; do
    # Skip empty lines and invalid paths
    [[ -z "$story_path" || ! "$story_path" =~ ^[A-Z][A-Za-z]*(/[A-Z0-9][A-Za-z0-9_-]*)*$ ]] && continue
    
    # Find all episode directories
    find "$story_path" -type d -name "[0-9][0-9]_Episode" | sort | while read -r episode_dir; do
        index_file="$episode_dir/index.html"
        
        # Skip if index.html doesn't exist
        [[ ! -f "$index_file" ]] && continue
        
        # Extract episode number
        episode_num=$(basename "$episode_dir" | grep -o '^[0-9]\+')
        
        # Generate publication date
        pub_date=$(generate_date "$story_path" "$episode_num")
        
        # Extract title
        title=$(grep -o '<title>.*</title>' "$index_file" | sed 's/<[^>]*>//g' || echo "$story_path - Episode $episode_num")
        
        # Generate description
        description=$(extract_description "$index_file")
        
        # Extract content
        content=$(sed -n '/<div class="episode-content">/,/<\/div>/p' "$index_file")
        
        # Create RSS item
        cat >> "$TEMP_ITEMS" << EOF
    <item>
        <title><![CDATA[${title}]]></title>
        <link>${BASE_URL}/${episode_dir}/</link>
        <guid isPermaLink="true">${BASE_URL}/${episode_dir}/</guid>
        <description><![CDATA[${description}]]></description>
        <content:encoded><![CDATA[${content}]]></content:encoded>
        <pubDate>${pub_date}</pubDate>
    </item>
EOF
    done
done < "assets/csv/stories.csv"

# Sort items by pubDate (newest first) and append to main file
sort -r -t'>' -k6 "$TEMP_ITEMS" >> "$OUTPUT_FILE"

# Close RSS feed
echo "</channel>" >> "$OUTPUT_FILE"
echo "</rss>" >> "$OUTPUT_FILE"

# Clean up
rm "$TEMP_ITEMS"

echo "RSS feed generated successfully at $OUTPUT_FILE"
