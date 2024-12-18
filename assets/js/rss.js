class RSSGenerator {
    constructor() {
        this.baseUrl = window.location.origin;
        this.storyPattern = /^([A-Z][A-Za-z]*)(\/[A-Z0-9][A-Za-z0-9_-]*)*$/;
        this.episodePattern = /^(\d{2})_Episode$/;
        this.rssItems = [];
        this.startDate = new Date('2023-01-01'); // Base date for sequential ordering
    }

    async generateRSS() {
        try {
            const stories = await this.loadStories();
            await this.processStories(stories);
            const rssXML = this.createRSSXML();
            this.downloadRSS(rssXML);
        } catch (error) {
            console.error('Error generating RSS feed:', error);
        }
    }

    async loadStories() {
        try {
            const response = await fetch('assets/csv/stories.csv');
            const csvText = await response.text();
            return csvText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line && this.storyPattern.test(line));
        } catch (error) {
            console.error('Error loading stories.csv:', error);
            throw error;
        }
    }

    async processStories(stories) {
        // Sort stories alphabetically
        stories.sort();
        
        for (const storyPath of stories) {
            await this.processStory(storyPath);
        }
    }

    generateSequentialDate(storyPath, episodeNumber) {
        // Create a deterministic but sequential date based on story and episode order
        const storyIndex = parseInt(storyPath.charAt(0).charCodeAt(0) - 65); // A=0, B=1, etc.
        const episodeIndex = parseInt(episodeNumber);
        
        const daysToAdd = (storyIndex * 100) + episodeIndex; // 100 episodes per story max
        const date = new Date(this.startDate);
        date.setDate(date.getDate() + daysToAdd);
        return date.toUTCString();
    }

    extractDescription(content, maxLength = 300) {
        // Remove HTML tags
        const textContent = content.replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        // Get first 10 lines or up to maxLength characters
        const lines = textContent.split('. ')
            .slice(0, 10)
            .join('. ');

        if (lines.length > maxLength) {
            return lines.substring(0, maxLength).trim() + '...';
        }
        return lines.trim();
    }

    async processStory(storyPath) {
        try {
            const indexResponse = await fetch(`${storyPath}/index.html`);
            if (!indexResponse.ok) return;

            const indexHTML = await indexResponse.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(indexHTML, 'text/html');
            
            // Find and sort episode links
            const episodeLinks = Array.from(doc.querySelectorAll('a[href*="_Episode"]'))
                .map(link => link.getAttribute('href'))
                .filter(href => this.episodePattern.test(href.split('/').pop()))
                .sort(); // Sort alphabetically

            // Process each episode
            for (const episodeLink of episodeLinks) {
                await this.processEpisode(storyPath, episodeLink);
            }
        } catch (error) {
            console.error(`Error processing story ${storyPath}:`, error);
        }
    }

    async processEpisode(storyPath, episodeLink) {
        try {
            const response = await fetch(`${storyPath}/${episodeLink}/index.html`);
            if (!response.ok) return;

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract episode number from the link
            const episodeMatch = episodeLink.match(/(\d+)_Episode/);
            const episodeNumber = episodeMatch ? episodeMatch[1] : '00';

            const content = doc.querySelector('.episode-content')?.innerHTML || '';
            const title = doc.querySelector('title')?.textContent || 
                         `${storyPath} - Episode ${episodeNumber}`;
            
            // Generate description from content
            const description = this.extractDescription(content);
            
            // Generate sequential publication date
            const pubDate = this.generateSequentialDate(storyPath, episodeNumber);

            this.rssItems.push({
                title: title,
                description: description,
                content: content,
                link: `${this.baseUrl}/${storyPath}/${episodeLink}/`,
                pubDate: pubDate,
                guid: `${this.baseUrl}/${storyPath}/${episodeLink}/`
            });
        } catch (error) {
            console.error(`Error processing episode ${episodeLink}:`, error);
        }
    }

    createRSSXML() {
        // Sort items by pubDate
        this.rssItems.sort((a, b) => 
            new Date(b.pubDate) - new Date(a.pubDate)
        );

        const rssHeader = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
    <title>Your Story Collection</title>
    <link>${this.baseUrl}</link>
    <description>A collection of episodic stories</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

        const rssFooter = `
</channel>
</rss>`;

        const rssItems = this.rssItems.map(item => `
    <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${item.link}</link>
        <guid isPermaLink="true">${item.guid}</guid>
        <description><![CDATA[${item.description}]]></description>
        <content:encoded><![CDATA[${item.content}]]></content:encoded>
        <pubDate>${item.pubDate}</pubDate>
    </item>`).join('');

        return rssHeader + rssItems + rssFooter;
    }

    downloadRSS(rssXML) {
        const blob = new Blob([rssXML], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'feed.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}