Project Path: archive

I'd like you to generate a high-quality README file for this project, suitable for hosting on GitHub. Analyze the codebase to understand the purpose, functionality, and structure of the project. 

Source Tree:
```
archive
├── index.html
├── push.sh
├── rss.go
├── go.mod
├── README.md
├── config.yaml
├── robots.txt
├── sitemap.go
├── sitemap.html
├── go.sum
└── robots.go

```

`/home/user/go/src/github.com/opd-ai/archive/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dark Tales & Dangerous Dungeons</title>
    <meta name="description" content="Embark on thrilling adventures with Dark Tales & Dangerous Dungeons! Discover AI-generated campaigns released weekly—join the quest!"/>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=MedievalSharp&family=Crimson+Text:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="assets/css/style.css">
    <script type="text/javascript" src="assets/js/script.js"> </script>
    
    <script type="text/javascript" src="assets/js/hero-content.js"> </script>
    <!-- Add these in your HTML head -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const generateButton = document.getElementById('generateRSS');
            const generator = new RSSGenerator();
            
            generateButton.addEventListener('click', () => {
                generator.generateRSS();
            });
        });
    </script>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 20px;
    }
    .share-links {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 15px; /* Space between grid items */
        list-style-type: none;
        padding: 0;
    }
    .share-link {
        padding: 10px; /* Padding for the badges */
        border-radius: 12px; /* Rounded corners */
        color: white;
        text-decoration: none;
        font-weight: bold;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        height: 40px; /* Fixed height for rectangular shape */
        display: flex;
        align-items: center;
        justify-content: center; /* Center align text */
    }
    .facebook { background: #3b5998; }
    .twitter { background: #1da1f2; }
    .linkedin { background: #0077b5; }
    .pinterest { background: #bd081c; }
    .whatsapp { background: #25D366; }
    .telegram { background: #0088cc; }
    .reddit { background: #ff4500; }
    .instagram { background: #c32aa3; }
    .mastodon { background: #4c4c4c; }
    .matrix { background: #00ff00; }
    .nostr { background: #ffcc00; }
    .email { background: #0077cc; } /* Blue background for email */
    .copy-button {
        background: #555;
        color: white;
        border: none;
        border-radius: 12px; /* Rounded corners */
        padding: 10px; /* Padding for the button */
        cursor: pointer;
        font-weight: bold;
        text-align: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        height: 40px; /* Fixed height for rectangular shape */
        display: flex;
        align-items: center;
        justify-content: center; /* Center align text */
        grid-column: 1 / -1; /* Span across all columns */
    }

    .share-link:hover, .copy-button:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }
</style>
</head>
<body>
    <header class="hero">
        <div class="hero-content">
            <h1 id="hero-headline">The Dungeon Scribe's Vault</h1>
            <div id="hero-intro">Explore an endless archive of mystical adventures, each crafted through arcane automation for your tabletop campaigns.</div>
            <div class="hero-whoami">
                <h2>The Nature of the Vault</h2>
                <p>
                    Within these digital halls lies an ever-expanding collection of automated adventures, each born from the 
                    marriage of artificial intelligence and careful human curation. The Vault's enchanted machinery transforms 
                    simple inspirations into fully-realized campaigns and dungeons, maintaining consistency through a 
                    methodical seven-phase ritual.
                </p>
    
                <h2>The Seven-Phase Ritual</h2>
                <div class="ritual-phases">
                    <div class="phase">
                        <h3>1. The Spark</h3>
                        <p>Every tale begins with inspiration - a vivid scene, a mysterious location, or an intriguing concept 
                           provided by the Vault's keeper.</p>
                    </div>
    
                    <div class="phase">
                        <h3>2. The Weaving</h3>
                        <p>Our automated Scribe takes this spark and begins its arcane calculations, transforming it into the 
                           foundation of a greater narrative.</p>
                    </div>
    
                    <div class="phase">
                        <h3>3. The Blueprint</h3>
                        <p>The narrative crystallizes into a series of One-Page Dungeons, each capturing the essence of a 
                           chapter or location within the greater tale.</p>
                    </div>
    
                    <div class="phase">
                        <h3>4. The Illumination</h3>
                        <p>Details flourish as the Scribe breathes life into characters, enriches locations with atmosphere, 
                           and imbues items with histories and purposes.</p>
                    </div>
    
                    <div class="phase">
                        <h3>5. The Visualization</h3>
                        <p>Through digital alchemy, three unique illustrations manifest for each adventure, complete with 
                           carefully crafted descriptions.</p>
                    </div>
    
                    <div class="phase">
                        <h3>6. The Purification</h3>
                        <p>Each element undergoes scrutiny to ensure originality and freedom from existing intellectual 
                           properties.</p>
                    </div>
    
                    <div class="phase">
                        <h3>7. The Binding</h3>
                        <p>All components are woven together into a cohesive document, sealed within the Vault until its 
                           appointed release.</p>
                    </div>
                </div>
    
                <div class="vault-schedule">
                    <h2>The Vault's Rhythm</h2>
                    <p>
                        Each week, one complete adventure emerges from the Vault's depths, freely available to all seekers 
                        of tales. This consistent flow is maintained through careful automation and curation.
                    </p>
                </div>
    
                <div class="technical-note">
                    <h2>A Note on Origins</h2>
                    <p>
                        While the first adventure was crafted by hand to establish our standards, all subsequent tales 
                        emerge through our automated ritual. The Vault's keeper provides initial direction, but the 
                        Scribe's machinery handles the intricate work of expansion and refinement.
                    </p>ll
                </div>
            </div>
    
            <div class="hero-donate">
                <h2>Supporting the Vault</h2>
                <p>
                    Though all adventures are freely given, those wishing to support the continuation of this work may 
                    contribute through Monero:
                </p>
                <pre class="monero-address"><code>43H3Uqnc9rfEsJjUXZYmam45MbtWmREFSANAWY5hijY4aht8cqYaT2BCNhfBhua5XwNdx9Tb6BEdt4tjUHJDwNW5H7mTiwe</code></pre>
                <p>
                    Or with Bitcoin.
                </p>
                <pre class="bitcoin-address"><code>bc1qew5kx0srtp8c4hlpw8ax0gllhnpsnp9ylthpas</code></pre>
                <p class="support-note">Your support keeps the arcane machinery running and the Vault expanding.</p>
            </div>
    
            <footer class="hero-footer">
                <p class="scribe-signature">
                    — The Dungeon Scribe<br>
                    <em>May your dice roll true</em>
                </p>
            </footer>
        </div>
    </header>
    <main class="main-content">
        <a href="feed.xml" class="rss-button">Subscribe to the Vault</a>
        <nav class="story-navigator">
            <div class="story-list">
                <h2>Stories</h2>
                <ul class="story-entries">
                    <li class="loading">Loading stories...</li>
                </ul>
            </div>
            
            <div class="episode-container">
                <h2 class="current-story-title">Select a Story</h2>
                <ul class="episode-entries"></ul>
            </div>
        </nav>
        <div class="content-display">
            <p>Select a story to begin your adventure...</p>
        </div>
    </main>

    <h2>Share this site</h2>
    <ul class="share-links">
        <li><a id="facebook" class="share-link facebook" href="#" target="_blank">Facebook</a></li>
        <li><a id="twitter" class="share-link twitter" href="#" target="_blank">Twitter</a></li>
        <li><a id="linkedin" class="share-link linkedin" href="#" target="_blank">LinkedIn</a></li>
        <li><a id="pinterest" class="share-link pinterest" href="#" target="_blank">Pinterest</a></li>
        <li><a id="whatsapp" class="share-link whatsapp" href="#" target="_blank">WhatsApp</a></li>
        <li><a id="telegram" class="share-link telegram" href="#" target="_blank">Telegram</a></li>
        <li><a id="reddit" class="share-link reddit" href="#" target="_blank">Reddit</a></li>
        <li><a id="instagram" class="share-link instagram" href="#" target="_blank">Instagram</a></li>
        <li><a id="mastodon" class="share-link mastodon" href="#" target="_blank">Mastodon</a></li>
        <li><a id="matrix" class="share-link matrix" href="#" target="_blank">Matrix</a></li>
        <li><a id="nostr" class="share-link nostr" href="#" target="_blank">Nostr</a></li>
        <li><a id="email" class="share-link email" href="#">Email</a></li>
        <li><button id="copyButton" class="copy-button">Copy Link</button></li>
    </ul>

    <script>
        const domain = window.location.href; // Get the current page URL
        const message = "Check out this great site!";
        const hashtag = "MyWebsite";
        const emailSubject = "Check this out!";
        const emailBody = `I found this website that you might like: ${domain}`;

        // Social Media Sharing Links
        document.getElementById('facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(domain)}`;
        document.getElementById('twitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(domain)}&text=${encodeURIComponent(message)}&hashtags=${hashtag}`;
        document.getElementById('linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(domain)}`;
        document.getElementById('pinterest').href = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(domain)}`;
        document.getElementById('whatsapp').href = `https://wa.me/?text=${encodeURIComponent(domain)}`;
        document.getElementById('telegram').href = `https://t.me/share/url?url=${encodeURIComponent(domain)}`;
        document.getElementById('reddit').href = `https://www.reddit.com/submit?url=${encodeURIComponent(domain)}`;
        document.getElementById('instagram').href = `https://www.instagram.com/?url=${encodeURIComponent(domain)}`;
        document.getElementById('mastodon').href = `https://mastodon.social/share?text=${encodeURIComponent(domain)}`;
        document.getElementById('matrix').href = `https://matrix.to/#/${encodeURIComponent(domain)}`;
        document.getElementById('nostr').href = `https://nostr.com/share?url=${encodeURIComponent(domain)}`;
        
        // Email Sharing
        document.getElementById('email').href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Copy to Clipboard Functionality
        document.getElementById('copyButton').onclick = function() {
            navigator.clipboard.writeText(domain).then(() => {
                alert('Link copied to clipboard!');
            }).catch(err => {
                console.error('Error copying link: ', err);
            });
        };
    </script>
</body>
</html>
```

`/home/user/go/src/github.com/opd-ai/archive/push.sh`:

```sh
#! /usr/bin/env sh
go build -o rss .
./rss
git add .
DATE=$(date)
git commit -am "$DATE"
git push --all

```

`/home/user/go/src/github.com/opd-ai/archive/rss.go`:

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	//    "sort"

	"github.com/gorilla/feeds"
	ignore "github.com/sabhiram/go-gitignore"
	"github.com/spf13/viper"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/ast"
	"github.com/yuin/goldmark/text"
)

// Add this new function to check if paths should be ignored
func newGitIgnore(baseDir string) (*ignore.GitIgnore, error) {
	gitignorePath := filepath.Join(baseDir, ".gitignore")
	if _, err := os.Stat(gitignorePath); err != nil {
		if os.IsNotExist(err) {
			// If .gitignore doesn't exist, return a matcher that ignores nothing
			return ignore.CompileIgnoreLines([]string{}...), nil
		}
		return nil, fmt.Errorf("checking .gitignore: %w", err)
	}
	return ignore.CompileIgnoreFileAndLines(gitignorePath)
}

type Story struct {
	Path        string
	Campaign    string
	Episode     string
	Number      string
	Summary     string
	EpisodePath string
	IndexPath   string
	Order       int // For sorting episodes chronologically
}

func getFirstParagraph(filename string) (string, error) {
	content, err := os.ReadFile(filename)
	if err != nil {
		return "", fmt.Errorf("reading markdown file: %w", err)
	}

	// Parse markdown to find first real paragraph, but keep markdown formatting
	md := goldmark.New()
	reader := text.NewReader(content)
	doc := md.Parser().Parse(reader)

	// Find the first paragraph node
	var firstParagraph string
	ast.Walk(doc, func(n ast.Node, entering bool) (ast.WalkStatus, error) {
		if entering && n.Kind() == ast.KindParagraph {
			// Get the raw content of the paragraph
			lines := n.Lines()
			if lines.Len() > 0 {
				var sb strings.Builder
				for i := 0; i < lines.Len(); i++ {
					line := lines.At(i)
					sb.Write(line.Value(content))
				}
				firstParagraph = sb.String()
				return ast.WalkStop, nil
			}
		}
		return ast.WalkContinue, nil
	})

	if firstParagraph == "" {
		return "", fmt.Errorf("no valid paragraphs found")
	}

	return strings.TrimSpace(firstParagraph), nil
}

func calculatePublishDate(story Story, baseDate time.Time) time.Time {
	// Calculate episode number for ordering
	campaignNum := strings.TrimPrefix(strings.Split(story.Path, "/")[0], "Cult/")
	campaignOrder, _ := strings.CutPrefix(campaignNum, "0")
	episodeNum := strings.TrimPrefix(story.Number, "0")

	// Convert to integers for calculation
	c, _ := strconv.Atoi(campaignOrder)
	e, _ := strconv.Atoi(episodeNum)

	// Each episode is published 7 days after the previous one
	daysToAdd := (c-1)*100 + e*7 // Campaigns are spread apart by 100 days
	return baseDate.AddDate(0, 0, daysToAdd)
}

func getEpisodePaths(baseDir, storyPath string) ([]string, error) {
	storyDir := filepath.Join(baseDir, storyPath)
	var episodePaths []string

	// Initialize gitignore
	ignorer, err := newGitIgnore(baseDir)
	if err != nil {
		return nil, fmt.Errorf("setting up gitignore: %w", err)
	}

	// Look for directories matching the pattern XX_Episode
	for i := 0; i <= 99; i++ { // Assuming max 100 episodes
		episodeDir := filepath.Join(storyDir, fmt.Sprintf("%02d_Episode", i))

		// Check if the path should be ignored
		relPath, err := filepath.Rel(baseDir, episodeDir)
		if err != nil {
			continue
		}

		if ignorer.MatchesPath(relPath) {
			continue
		}

		if _, err := os.Stat(episodeDir); err == nil {
			episodePaths = append(episodePaths, episodeDir)
		}
	}

	if len(episodePaths) == 0 {
		return nil, fmt.Errorf("no episode directories found in %s", storyDir)
	}

	return episodePaths, nil
}

func readStoriesFromCSV(filename, baseDir string) ([]Story, error) {
	// Initialize gitignore
	ignorer, err := newGitIgnore(baseDir)
	if err != nil {
		return nil, fmt.Errorf("setting up gitignore: %w", err)
	}

	file, err := os.Open(filename)
	if err != nil {
		return nil, fmt.Errorf("opening CSV file: %w", err)
	}
	defer file.Close()

	var stories []Story
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		path := scanner.Text()

		// Check if the path should be ignored
		if ignorer.MatchesPath(path) {
			continue
		}

		parts := strings.Split(path, "/")
		if len(parts) != 2 {
			continue
		}

		episodeParts := strings.SplitN(parts[1], "-", 2)
		if len(episodeParts) != 2 {
			continue
		}

		episodePaths, err := getEpisodePaths(baseDir, path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Warning: %v\n", err)
			continue
		}

		// Use the first episode for the main summary
		mainEpisodePath := filepath.Join(episodePaths[0], "Episode.md")
		summary, err := getFirstParagraph(mainEpisodePath)
		if err != nil {
			summary = fmt.Sprintf("Join us for Chapter %s of the %s campaign", episodeParts[0], parts[0])
		}

		story := Story{
			Path:        path,
			Campaign:    parts[0],
			Episode:     episodeParts[1],
			Number:      episodeParts[0],
			Summary:     summary,
			EpisodePath: mainEpisodePath,
			IndexPath:   filepath.Join(episodePaths[0], "index.html"),
		}
		stories = append(stories, story)
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("scanning CSV: %w", err)
	}

	return stories, nil
}

func generateFeed(stories []Story, config Config) (*feeds.Feed, error) {
	feed := &feeds.Feed{
		Title:       "Tales from the Cult Campaign",
		Link:        &feeds.Link{Href: config.BaseURL},
		Description: "An epic D&D campaign following heroes as they uncover ancient mysteries and battle dark forces.",
		Author:      &feeds.Author{Name: "The DM"},
		Created:     time.Now(),
	}

	baseDate := time.Date(2023, 1, 1, 12, 0, 0, 0, time.UTC)

	for _, story := range stories {
		publishDate := calculatePublishDate(story, baseDate)

		// Get all episode directories for this story
		episodePaths, err := getEpisodePaths(config.BaseDir, story.Path)
		if err != nil {
			continue
		}

		// Create an item for each episode
		for i, episodePath := range episodePaths {
			episodeDir := filepath.Base(episodePath)
			episodeMd := filepath.Join(episodePath, "Episode.md")

			summary, err := getFirstParagraph(episodeMd)
			if err != nil {
				summary = story.Summary
			}

			partSuffix := ""
			if len(episodePaths) > 1 {
				partSuffix = fmt.Sprintf(" (Part %d)", i+1)
			}

			item := &feeds.Item{
				Title: fmt.Sprintf("%s: Chapter %s - %s%s",
					story.Campaign, story.Number, story.Episode, partSuffix),
				Link: &feeds.Link{Href: fmt.Sprintf("%s/%s/%s/index.html",
					config.BaseURL, story.Path, episodeDir)},
				Description: summary,
				Created:     publishDate.AddDate(0, 0, i), // Space out multiple parts by 1 day
				Id: fmt.Sprintf("%s/%s/%s/index.html",
					config.BaseURL, story.Path, episodeDir),
			}
			feed.Items = append(feed.Items, item)
		}
	}

	return feed, nil
}

type Config struct {
	BaseURL  string
	BaseDir  string
	CSVPath  string
	FeedPath string
}

func loadConfig() (Config, error) {
	viper.SetDefault("base_url", "https://opd-ai.github.io")
	viper.SetDefault("base_dir", ".")
	viper.SetDefault("csv_path", "assets/csv/stories.csv")
	viper.SetDefault("feed_path", "feed.xml")

	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			return Config{}, fmt.Errorf("reading config: %w", err)
		}
	}

	return Config{
		BaseURL:  viper.GetString("base_url"),
		BaseDir:  viper.GetString("base_dir"),
		CSVPath:  viper.GetString("csv_path"),
		FeedPath: viper.GetString("feed_path"),
	}, nil
}

func main() {
	config, err := loadConfig()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading config: %v\n", err)
		os.Exit(1)
	}

	stories, err := readStoriesFromCSV(config.CSVPath, config.BaseDir)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error reading stories: %v\n", err)
		os.Exit(1)
	}

	feed, err := generateFeed(stories, config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error generating feed: %v\n", err)
		os.Exit(1)
	}

	rss, err := feed.ToRss()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error converting to RSS: %v\n", err)
		os.Exit(1)
	}

	if err := os.WriteFile(config.FeedPath, []byte(rss), 0o644); err != nil {
		fmt.Fprintf(os.Stderr, "Error writing feed: %v\n", err)
		os.Exit(1)
	}
	if err := sitemapmain(config.BaseURL, config.BaseDir); err != nil {
		fmt.Fprintf(os.Stderr, "Error writing sitemap: %v\n", err)
		os.Exit(1)
	}
	if err := robotsmain(config.BaseDir); err != nil {
		fmt.Fprintf(os.Stderr, "Error writing robots: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Successfully generated RSS feed!")
}

```

`/home/user/go/src/github.com/opd-ai/archive/go.mod`:

```mod
module github.com/opd-ai/opd-ai.github.io

go 1.21.3

require (
	github.com/gorilla/feeds v1.2.0
	github.com/sabhiram/go-gitignore v0.0.0-20210923224102-525f6e181f06
	github.com/spf13/viper v1.19.0
	github.com/yuin/goldmark v1.7.8
)

require (
	github.com/fsnotify/fsnotify v1.7.0 // indirect
	github.com/hashicorp/hcl v1.0.0 // indirect
	github.com/magiconair/properties v1.8.7 // indirect
	github.com/mitchellh/mapstructure v1.5.0 // indirect
	github.com/pelletier/go-toml/v2 v2.2.2 // indirect
	github.com/sagikazarmark/locafero v0.4.0 // indirect
	github.com/sagikazarmark/slog-shim v0.1.0 // indirect
	github.com/sourcegraph/conc v0.3.0 // indirect
	github.com/spf13/afero v1.11.0 // indirect
	github.com/spf13/cast v1.6.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	github.com/subosito/gotenv v1.6.0 // indirect
	go.uber.org/atomic v1.9.0 // indirect
	go.uber.org/multierr v1.9.0 // indirect
	golang.org/x/exp v0.0.0-20230905200255-921286631fa9 // indirect
	golang.org/x/sys v0.18.0 // indirect
	golang.org/x/text v0.14.0 // indirect
	gopkg.in/ini.v1 v1.67.0 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

```

`/home/user/go/src/github.com/opd-ai/archive/README.md`:

```md
# opd-ai.github.io

<nav class="story-navigator">
  <div class="story-list">
    <h2>Stories</h2>
    <ul class="story-entries">
      <!-- Dynamically populated -->
    </ul>
  </div>
  
  <div class="episode-list">
    <h3 class="current-story-title"></h3>
    <ul class="episode-entries">
      <!-- Dynamically populated -->
    </ul>
  </div>
</nav>
```

`/home/user/go/src/github.com/opd-ai/archive/config.yaml`:

```yaml
base_url: "https://opd-ai.github.io"
base_dir: "."
csv_path: "assets/csv/stories.csv"
feed_path: "feed.xml"
```

`/home/user/go/src/github.com/opd-ai/archive/robots.txt`:

```txt
User-agent: *
Disallow: /Obsidian
Disallow: /Symphony
Disallow: /Serpent
Disallow: /.vscode
Disallow: /rss
Disallow: /.bak
Disallow: /script.md
Allow: /assets/
Allow: /images/
Allow: /css/
Allow: /js/
Sitemap: /sitemap.xml

```

`/home/user/go/src/github.com/opd-ai/archive/sitemap.go`:

```go
// main.go
package main

import (
	"fmt"
	"html/template"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/sabhiram/go-gitignore" // For parsing .gitignore
)

type Page struct {
	Path       string
	LastMod    time.Time
	ChangeFreq string
	Priority   float64
}

type SiteMap struct {
	Pages   []Page
	BaseURL string
	GenDate time.Time
}

func findHTMLFiles(root string, ignore *ignore.GitIgnore) ([]Page, error) {
	var pages []Page

	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip directories
		if info.IsDir() {
			return nil
		}

		// Convert path to relative path
		relPath, err := filepath.Rel(root, path)
		if err != nil {
			return err
		}

		// Check if file should be ignored
		if ignore != nil && ignore.MatchesPath(relPath) {
			return nil
		}

		// Only process .html files
		if filepath.Ext(path) == ".html" {
			pages = append(pages, Page{
				Path:       "/" + filepath.ToSlash(relPath),
				LastMod:    info.ModTime(),
				ChangeFreq: "weekly",
				Priority:   0.5,
			})
		}

		return nil
	})

	return pages, err
}

func generateXMLSitemap(sitemap SiteMap, outputPath string) error {
	xmlTemplate := `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {{range .Pages}}
    <url>
        <loc>{{$.BaseURL}}{{.Path}}</loc>
        <lastmod>{{.LastMod.Format "2006-01-02"}}</lastmod>
        <changefreq>{{.ChangeFreq}}</changefreq>
        <priority>{{.Priority}}</priority>
    </url>
    {{end}}
</urlset>`

	tmpl, err := template.New("sitemap").Parse(xmlTemplate)
	if err != nil {
		return err
	}

	f, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer f.Close()

	return tmpl.Execute(f, sitemap)
}

func generateHTMLSitemap(sitemap SiteMap, outputPath string) error {
	htmlTemplate := `<!DOCTYPE html>
<html>
<head>
    <title>Sitemap</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .sitemap { max-width: 800px; margin: 0 auto; }
        .page { margin: 10px 0; }
        .meta { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="sitemap">
        <h1>Sitemap</h1>
        <p>Generated on: {{.GenDate.Format "2006-01-02 15:04:05"}}</p>
        {{range .Pages}}
        <div class="page">
            <a href="{{.Path}}">{{.Path}}</a>
            <div class="meta">Last modified: {{.LastMod.Format "2006-01-02"}}</div>
        </div>
        {{end}}
    </div>
</body>
</html>`

	tmpl, err := template.New("sitemap").Parse(htmlTemplate)
	if err != nil {
		return err
	}

	f, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer f.Close()

	return tmpl.Execute(f, sitemap)
}

func sitemapmain(baseURL, dir string) error {
	// Load .gitignore if it exists
	ignore, err := newGitIgnore(dir)
	if err != nil {
		return fmt.Errorf("Gitignore compilation error: %s", err)
	}

	// Find HTML files
	pages, err := findHTMLFiles(dir, ignore)
	if err != nil {
		return fmt.Errorf("Error finding HTML files: %s", err)
	}

	sitemap := SiteMap{
		Pages:   pages,
		BaseURL: strings.TrimRight(baseURL, "/"),
		GenDate: time.Now(),
	}

	// Generate XML sitemap
	if err := generateXMLSitemap(sitemap, "sitemap.xml"); err != nil {
		return fmt.Errorf("Error generating XML sitemap: %s", err)
	}

	// Generate HTML sitemap
	if err := generateHTMLSitemap(sitemap, "sitemap.html"); err != nil {
		return fmt.Errorf("Error generating HTML sitemap: %s", err)
	}

	fmt.Printf("Generated sitemaps with %d pages\n", len(pages))
	return nil
}

```

`/home/user/go/src/github.com/opd-ai/archive/sitemap.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Sitemap</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .sitemap { max-width: 800px; margin: 0 auto; }
        .page { margin: 10px 0; }
        .meta { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="sitemap">
        <h1>Sitemap</h1>
        <p>Generated on: 2024-12-19 17:18:52</p>
        
        <div class="page">
            <a href="/Cult/01-Temple/00_Contents/index.html">/Cult/01-Temple/00_Contents/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/01_Episode/index.html">/Cult/01-Temple/01_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/02_Episode/index.html">/Cult/01-Temple/02_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/03_Episode/index.html">/Cult/01-Temple/03_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/04_Episode/index.html">/Cult/01-Temple/04_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/05_Episode/index.html">/Cult/01-Temple/05_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/06_Episode/index.html">/Cult/01-Temple/06_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/07_Episode/index.html">/Cult/01-Temple/07_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/08_Episode/index.html">/Cult/01-Temple/08_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/09_Episode/index.html">/Cult/01-Temple/09_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/10_Episode/index.html">/Cult/01-Temple/10_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/11_Episode/index.html">/Cult/01-Temple/11_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/12_Episode/index.html">/Cult/01-Temple/12_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/01-Temple/13_Episode/index.html">/Cult/01-Temple/13_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/00_Contents/index.html">/Cult/02-Shadows/00_Contents/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/01_Episode/index.html">/Cult/02-Shadows/01_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/02_Episode/index.html">/Cult/02-Shadows/02_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/03_Episode/index.html">/Cult/02-Shadows/03_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/04_Episode/index.html">/Cult/02-Shadows/04_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/05_Episode/index.html">/Cult/02-Shadows/05_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/06_Episode/index.html">/Cult/02-Shadows/06_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/07_Episode/index.html">/Cult/02-Shadows/07_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/02-Shadows/08_Episode/index.html">/Cult/02-Shadows/08_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/00_Contents/index.html">/Cult/03-Echoes/00_Contents/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/01_Episode/index.html">/Cult/03-Echoes/01_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/02_Episode/index.html">/Cult/03-Echoes/02_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/03_Episode/index.html">/Cult/03-Echoes/03_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/04_Episode/index.html">/Cult/03-Echoes/04_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/05_Episode/index.html">/Cult/03-Echoes/05_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/06_Episode/index.html">/Cult/03-Echoes/06_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/07_Episode/index.html">/Cult/03-Echoes/07_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/08_Episode/index.html">/Cult/03-Echoes/08_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/09_Episode/index.html">/Cult/03-Echoes/09_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/10_Episode/index.html">/Cult/03-Echoes/10_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/11_Episode/index.html">/Cult/03-Echoes/11_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/03-Echoes/12_Episode/index.html">/Cult/03-Echoes/12_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/04-Wyrmwood/00_Contents/index.html">/Cult/04-Wyrmwood/00_Contents/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/04-Wyrmwood/01_Episode/index.html">/Cult/04-Wyrmwood/01_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/04-Wyrmwood/02_Episode/index.html">/Cult/04-Wyrmwood/02_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/04-Wyrmwood/03_Episode/index.html">/Cult/04-Wyrmwood/03_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/04-Wyrmwood/04_Episode/index.html">/Cult/04-Wyrmwood/04_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/05-War/00_Contents/index.html">/Cult/05-War/00_Contents/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/05-War/01_Episode/index.html">/Cult/05-War/01_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/05-War/02_Episode/index.html">/Cult/05-War/02_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/05-War/03_Episode/index.html">/Cult/05-War/03_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/05-War/05_Episode/index.html">/Cult/05-War/05_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/00_Contents/index.html">/Cult/06-Dark/00_Contents/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/01_Episode/index.html">/Cult/06-Dark/01_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/02_Episode/index.html">/Cult/06-Dark/02_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/03_Episode/index.html">/Cult/06-Dark/03_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/04_Episode/index.html">/Cult/06-Dark/04_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/05_Episode/index.html">/Cult/06-Dark/05_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/06_Episode/index.html">/Cult/06-Dark/06_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/07_Episode/index.html">/Cult/06-Dark/07_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/Cult/06-Dark/08_Episode/index.html">/Cult/06-Dark/08_Episode/index.html</a>
            <div class="meta">Last modified: 2024-12-18</div>
        </div>
        
        <div class="page">
            <a href="/index.html">/index.html</a>
            <div class="meta">Last modified: 2024-12-19</div>
        </div>
        
        <div class="page">
            <a href="/sitemap.html">/sitemap.html</a>
            <div class="meta">Last modified: 2024-12-19</div>
        </div>
        
    </div>
</body>
</html>
```

`/home/user/go/src/github.com/opd-ai/archive/go.sum`:

```sum
github.com/davecgh/go-spew v1.1.0/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/davecgh/go-spew v1.1.1/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/davecgh/go-spew v1.1.2-0.20180830191138-d8f796af33cc h1:U9qPSI2PIWSS1VwoXQT9A3Wy9MM3WgvqSxFWenqJduM=
github.com/davecgh/go-spew v1.1.2-0.20180830191138-d8f796af33cc/go.mod h1:J7Y8YcW2NihsgmVo/mv3lAwl/skON4iLHjSsI+c5H38=
github.com/frankban/quicktest v1.14.6 h1:7Xjx+VpznH+oBnejlPUj8oUpdxnVs4f8XU8WnHkI4W8=
github.com/frankban/quicktest v1.14.6/go.mod h1:4ptaffx2x8+WTWXmUCuVU6aPUX1/Mz7zb5vbUoiM6w0=
github.com/fsnotify/fsnotify v1.7.0 h1:8JEhPFa5W2WU7YfeZzPNqzMP6Lwt7L2715Ggo0nosvA=
github.com/fsnotify/fsnotify v1.7.0/go.mod h1:40Bi/Hjc2AVfZrqy+aj+yEI+/bRxZnMJyTJwOpGvigM=
github.com/google/go-cmp v0.5.9 h1:O2Tfq5qg4qc4AmwVlvv0oLiVAGB7enBSJ2x2DqQFi38=
github.com/google/go-cmp v0.5.9/go.mod h1:17dUlkBOakJ0+DkrSSNjCkIjxS6bF9zb3elmeNGIjoY=
github.com/gorilla/feeds v1.2.0 h1:O6pBiXJ5JHhPvqy53NsjKOThq+dNFm8+DFrxBEdzSCc=
github.com/gorilla/feeds v1.2.0/go.mod h1:WMib8uJP3BbY+X8Szd1rA5Pzhdfh+HCCAYT2z7Fza6Y=
github.com/hashicorp/hcl v1.0.0 h1:0Anlzjpi4vEasTeNFn2mLJgTSwt0+6sfsiTG8qcWGx4=
github.com/hashicorp/hcl v1.0.0/go.mod h1:E5yfLk+7swimpb2L/Alb/PJmXilQ/rhwaUYs4T20WEQ=
github.com/kr/pretty v0.3.1 h1:flRD4NNwYAUpkphVc1HcthR4KEIFJ65n8Mw5qdRn3LE=
github.com/kr/pretty v0.3.1/go.mod h1:hoEshYVHaxMs3cyo3Yncou5ZscifuDolrwPKZanG3xk=
github.com/kr/text v0.2.0 h1:5Nx0Ya0ZqY2ygV366QzturHI13Jq95ApcVaJBhpS+AY=
github.com/kr/text v0.2.0/go.mod h1:eLer722TekiGuMkidMxC/pM04lWEeraHUUmBw8l2grE=
github.com/magiconair/properties v1.8.7 h1:IeQXZAiQcpL9mgcAe1Nu6cX9LLw6ExEHKjN0VQdvPDY=
github.com/magiconair/properties v1.8.7/go.mod h1:Dhd985XPs7jluiymwWYZ0G4Z61jb3vdS329zhj2hYo0=
github.com/mitchellh/mapstructure v1.5.0 h1:jeMsZIYE/09sWLaz43PL7Gy6RuMjD2eJVyuac5Z2hdY=
github.com/mitchellh/mapstructure v1.5.0/go.mod h1:bFUtVrKA4DC2yAKiSyO/QUcy7e+RRV2QTWOzhPopBRo=
github.com/pelletier/go-toml/v2 v2.2.2 h1:aYUidT7k73Pcl9nb2gScu7NSrKCSHIDE89b3+6Wq+LM=
github.com/pelletier/go-toml/v2 v2.2.2/go.mod h1:1t835xjRzz80PqgE6HHgN2JOsmgYu/h4qDAS4n929Rs=
github.com/pmezard/go-difflib v1.0.0/go.mod h1:iKH77koFhYxTK1pcRnkKkqfTogsbg7gZNVY4sRDYZ/4=
github.com/pmezard/go-difflib v1.0.1-0.20181226105442-5d4384ee4fb2 h1:Jamvg5psRIccs7FGNTlIRMkT8wgtp5eCXdBlqhYGL6U=
github.com/pmezard/go-difflib v1.0.1-0.20181226105442-5d4384ee4fb2/go.mod h1:iKH77koFhYxTK1pcRnkKkqfTogsbg7gZNVY4sRDYZ/4=
github.com/rogpeppe/go-internal v1.9.0 h1:73kH8U+JUqXU8lRuOHeVHaa/SZPifC7BkcraZVejAe8=
github.com/rogpeppe/go-internal v1.9.0/go.mod h1:WtVeX8xhTBvf0smdhujwtBcq4Qrzq/fJaraNFVN+nFs=
github.com/sabhiram/go-gitignore v0.0.0-20210923224102-525f6e181f06 h1:OkMGxebDjyw0ULyrTYWeN0UNCCkmCWfjPnIA2W6oviI=
github.com/sabhiram/go-gitignore v0.0.0-20210923224102-525f6e181f06/go.mod h1:+ePHsJ1keEjQtpvf9HHw0f4ZeJ0TLRsxhunSI2hYJSs=
github.com/sagikazarmark/locafero v0.4.0 h1:HApY1R9zGo4DBgr7dqsTH/JJxLTTsOt7u6keLGt6kNQ=
github.com/sagikazarmark/locafero v0.4.0/go.mod h1:Pe1W6UlPYUk/+wc/6KFhbORCfqzgYEpgQ3O5fPuL3H4=
github.com/sagikazarmark/slog-shim v0.1.0 h1:diDBnUNK9N/354PgrxMywXnAwEr1QZcOr6gto+ugjYE=
github.com/sagikazarmark/slog-shim v0.1.0/go.mod h1:SrcSrq8aKtyuqEI1uvTDTK1arOWRIczQRv+GVI1AkeQ=
github.com/sourcegraph/conc v0.3.0 h1:OQTbbt6P72L20UqAkXXuLOj79LfEanQ+YQFNpLA9ySo=
github.com/sourcegraph/conc v0.3.0/go.mod h1:Sdozi7LEKbFPqYX2/J+iBAM6HpqSLTASQIKqDmF7Mt0=
github.com/spf13/afero v1.11.0 h1:WJQKhtpdm3v2IzqG8VMqrr6Rf3UYpEF239Jy9wNepM8=
github.com/spf13/afero v1.11.0/go.mod h1:GH9Y3pIexgf1MTIWtNGyogA5MwRIDXGUr+hbWNoBjkY=
github.com/spf13/cast v1.6.0 h1:GEiTHELF+vaR5dhz3VqZfFSzZjYbgeKDpBxQVS4GYJ0=
github.com/spf13/cast v1.6.0/go.mod h1:ancEpBxwJDODSW/UG4rDrAqiKolqNNh2DX3mk86cAdo=
github.com/spf13/pflag v1.0.5 h1:iy+VFUOCP1a+8yFto/drg2CJ5u0yRoB7fZw3DKv/JXA=
github.com/spf13/pflag v1.0.5/go.mod h1:McXfInJRrz4CZXVZOBLb0bTZqETkiAhM9Iw0y3An2Bg=
github.com/spf13/viper v1.19.0 h1:RWq5SEjt8o25SROyN3z2OrDB9l7RPd3lwTWU8EcEdcI=
github.com/spf13/viper v1.19.0/go.mod h1:GQUN9bilAbhU/jgc1bKs99f/suXKeUMct8Adx5+Ntkg=
github.com/stretchr/objx v0.1.0/go.mod h1:HFkY916IF+rwdDfMAkV7OtwuqBVzrE8GR6GFx+wExME=
github.com/stretchr/objx v0.4.0/go.mod h1:YvHI0jy2hoMjB+UWwv71VJQ9isScKT/TqJzVSSt89Yw=
github.com/stretchr/objx v0.5.0/go.mod h1:Yh+to48EsGEfYuaHDzXPcE3xhTkx73EhmCGUpEOglKo=
github.com/stretchr/objx v0.5.2/go.mod h1:FRsXN1f5AsAjCGJKqEizvkpNtU+EGNCLh3NxZ/8L+MA=
github.com/stretchr/testify v1.3.0/go.mod h1:M5WIy9Dh21IEIfnGCwXGc5bZfKNJtfHm1UVUgZn+9EI=
github.com/stretchr/testify v1.6.1/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.7.1/go.mod h1:6Fq8oRcR53rry900zMqJjRRixrwX3KX962/h/Wwjteg=
github.com/stretchr/testify v1.8.0/go.mod h1:yNjHg4UonilssWZ8iaSj1OCr/vHnekPRkoO+kdMU+MU=
github.com/stretchr/testify v1.8.4/go.mod h1:sz/lmYIOXD/1dqDmKjjqLyZ2RngseejIcXlSw2iwfAo=
github.com/stretchr/testify v1.9.0 h1:HtqpIVDClZ4nwg75+f6Lvsy/wHu+3BoSGCbBAcpTsTg=
github.com/stretchr/testify v1.9.0/go.mod h1:r2ic/lqez/lEtzL7wO/rwa5dbSLXVDPFyf8C91i36aY=
github.com/subosito/gotenv v1.6.0 h1:9NlTDc1FTs4qu0DDq7AEtTPNw6SVm7uBMsUCUjABIf8=
github.com/subosito/gotenv v1.6.0/go.mod h1:Dk4QP5c2W3ibzajGcXpNraDfq2IrhjMIvMSWPKKo0FU=
github.com/yuin/goldmark v1.7.8 h1:iERMLn0/QJeHFhxSt3p6PeN9mGnvIKSpG9YYorDMnic=
github.com/yuin/goldmark v1.7.8/go.mod h1:uzxRWxtg69N339t3louHJ7+O03ezfj6PlliRlaOzY1E=
go.uber.org/atomic v1.9.0 h1:ECmE8Bn/WFTYwEW/bpKD3M8VtR/zQVbavAoalC1PYyE=
go.uber.org/atomic v1.9.0/go.mod h1:fEN4uk6kAWBTFdckzkM89CLk9XfWZrxpCo0nPH17wJc=
go.uber.org/multierr v1.9.0 h1:7fIwc/ZtS0q++VgcfqFDxSBZVv/Xo49/SYnDFupUwlI=
go.uber.org/multierr v1.9.0/go.mod h1:X2jQV1h+kxSjClGpnseKVIxpmcjrj7MNnI0bnlfKTVQ=
golang.org/x/exp v0.0.0-20230905200255-921286631fa9 h1:GoHiUyI/Tp2nVkLI2mCxVkOjsbSXD66ic0XW0js0R9g=
golang.org/x/exp v0.0.0-20230905200255-921286631fa9/go.mod h1:S2oDrQGGwySpoQPVqRShND87VCbxmc6bL1Yd2oYrm6k=
golang.org/x/sys v0.18.0 h1:DBdB3niSjOA/O0blCZBqDefyWNYveAYMNF1Wum0DYQ4=
golang.org/x/sys v0.18.0/go.mod h1:/VUhepiaJMQUp4+oa/7Zr1D23ma6VTLIYjOOTFZPUcA=
golang.org/x/text v0.14.0 h1:ScX5w1eTa3QqT8oi6+ziP7dTV1S2+ALU0bI+0zXKWiQ=
golang.org/x/text v0.14.0/go.mod h1:18ZOQIKpY8NJVqYksKHtTdi31H5itFRjB5/qKTNYzSU=
gopkg.in/check.v1 v0.0.0-20161208181325-20d25e280405/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/check.v1 v1.0.0-20190902080502-41f04d3bba15 h1:YR8cESwS4TdDjEe65xsg0ogRM/Nc3DYOhEAlW+xobZo=
gopkg.in/check.v1 v1.0.0-20190902080502-41f04d3bba15/go.mod h1:Co6ibVJAznAaIkqp8huTwlJQCZ016jof/cbN4VW5Yz0=
gopkg.in/ini.v1 v1.67.0 h1:Dgnx+6+nfE+IfzjUEISNeydPJh9AXNNsWbGP9KzCsOA=
gopkg.in/ini.v1 v1.67.0/go.mod h1:pNLf8WUiyNEtQjuu5G5vTm06TEv9tsIgeAvK8hOrP4k=
gopkg.in/yaml.v3 v3.0.0-20200313102051-9f266ea9e77c/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=
gopkg.in/yaml.v3 v3.0.1 h1:fxVm/GzAzEWqLHuvctI91KS9hhNmmWOoWu0XTYJS7CA=
gopkg.in/yaml.v3 v3.0.1/go.mod h1:K4uyk7z7BCEPqu6E+C64Yfv1cQ7kz7rIZviUmN+EgEM=

```

`/home/user/go/src/github.com/opd-ai/archive/robots.go`:

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// Generator handles the robots.txt generation
type Generator struct {
	DocRoot     string
	GitIgnore   string
	SitemapURLs []string
}

// NewGenerator creates a new robots.txt generator instance
func NewGenerator(docRoot string) *Generator {
	return &Generator{
		DocRoot:     docRoot,
		GitIgnore:   filepath.Join(docRoot, ".gitignore"),
		SitemapURLs: make([]string, 0),
	}
}

// FindSitemaps searches for XML sitemaps in the document root
func (g *Generator) FindSitemaps() error {
	pattern := filepath.Join(g.DocRoot, "*sitemap*.xml")
	matches, err := filepath.Glob(pattern)
	if err != nil {
		return fmt.Errorf("error finding sitemaps: %w", err)
	}

	for _, match := range matches {
		// Convert absolute path to URL path
		relPath, err := filepath.Rel(g.DocRoot, match)
		if err != nil {
			return fmt.Errorf("error converting path %s: %w", match, err)
		}
		g.SitemapURLs = append(g.SitemapURLs, "/"+filepath.ToSlash(relPath))
	}
	return nil
}

// ConvertGitIgnorePatterns reads .gitignore and converts patterns to robots.txt format
func (g *Generator) ConvertGitIgnorePatterns() ([]string, error) {
	if _, err := os.Stat(g.GitIgnore); os.IsNotExist(err) {
		return nil, nil // Return empty if .gitignore doesn't exist
	}

	file, err := os.Open(g.GitIgnore)
	if err != nil {
		return nil, fmt.Errorf("error opening .gitignore: %w", err)
	}
	defer file.Close()

	var disallowRules []string
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		// Convert .gitignore pattern to robots.txt format
		rule := strings.TrimPrefix(line, "/")
		rule = strings.TrimPrefix(rule, "*")
		rule = strings.TrimSuffix(rule, "*")

		if rule != "" {
			disallowRules = append(disallowRules, "/"+strings.TrimPrefix(rule, "/"))
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("error reading .gitignore: %w", err)
	}

	return disallowRules, nil
}

// Generate creates the robots.txt content
func (g *Generator) Generate() (string, error) {
	if err := g.FindSitemaps(); err != nil {
		return "", err
	}

	disallowRules, err := g.ConvertGitIgnorePatterns()
	if err != nil {
		return "", err
	}

	var builder strings.Builder

	// Add default header
	builder.WriteString("User-agent: *\n")

	// Add Disallow rules
	for _, rule := range disallowRules {
		builder.WriteString(fmt.Sprintf("Disallow: %s\n", rule))
	}

	// Add Allow rules for common public directories
	builder.WriteString("Allow: /assets/\n")
	builder.WriteString("Allow: /images/\n")
	builder.WriteString("Allow: /css/\n")
	builder.WriteString("Allow: /js/\n")

	// Add sitemaps
	for _, sitemap := range g.SitemapURLs {
		builder.WriteString(fmt.Sprintf("Sitemap: %s\n", sitemap))
	}

	return builder.String(), nil
}

func robotsmain(docroot string) error {
	generator := NewGenerator(docroot)
	content, err := generator.Generate()
	if err != nil {
		return err
	}

	// Write to robots.txt
	return os.WriteFile("robots.txt", []byte(content), 0o644)
}

```


The README should include the following sections:

1. Project Title
2. Brief description (1-2 sentences)
3. Features
4. Installation instructions
5. Usage examples
6. Configuration options (if applicable) 
7. Contribution guidelines
8. Testing instructions
9. License
10. Acknowledgements/Credits

Write the content in Markdown format. Use your analysis of the code to generate accurate and helpful content, but also explain things clearly for users who may not be familiar with the implementation details.

Feel free to infer reasonable details if needed, but try to stick to what can be determined from the codebase itself. Let me know if you have any other questions as you're writing!