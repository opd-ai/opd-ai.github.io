class StoryStructureScanner {
    constructor() {
        this.storyPattern = /^[A-Z][A-Za-z]+$/;
        this.episodePattern = /^(\d{2})_Episode$/;
        this.knownStories = []; // Will be populated from CSV
    }

    async loadStoriesFromCSV() {
        try {
            const response = await fetch('/assets/csv/stories.csv');
            if (!response.ok) {
                throw new Error('Failed to load stories.csv');
            }
            
            const csvText = await response.text();
            // Split CSV text into lines and filter out empty lines
            this.knownStories = csvText
                .split('\n')
                .map(line => line.trim())
                .filter(line => line && this.storyPattern.test(line));
                
            if (this.knownStories.length === 0) {
                console.warn('No valid stories found in stories.csv');
            }
        } catch (error) {
            console.error('Error loading stories.csv:', error);
            // Fallback to default stories if CSV fails to load
            this.knownStories = ['DarkestNight'];
        }
    }

    async checkFileExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    async scanStories() {
        // Load stories from CSV if not already loaded
        if (this.knownStories.length === 0) {
            await this.loadStoriesFromCSV();
        }
        return this.knownStories;
    }

    async checkFileExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    async scanEpisodes(storyName) {
        const episodes = [];
        let episodeNum = 0;
        let continueScanning = true;

        while (continueScanning && episodeNum <= 99) {
            const paddedNum = episodeNum.toString().padStart(2, '0');
            const episodeDir = `${paddedNum}_Episode`;
            const contentsPath = `/stories/${storyName}/${episodeDir}/Contents.md`;
            const episodePath = `/stories/${storyName}/${episodeDir}/Episode.md`;

            // Check if both required files exist
            const [contentsExists, episodeExists] = await Promise.all([
                this.checkFileExists(contentsPath),
                this.checkFileExists(episodePath)
            ]);

            if (contentsExists && episodeExists) {
                episodes.push(episodeDir);
                episodeNum++;
            } else {
                continueScanning = false;
            }
        }

        return episodes;
    }
}

class StoryNavigator {
    constructor() {
        this.scanner = new StoryStructureScanner();
        this.currentStory = null;
        this.episodeCache = new Map(); // Cache for episode content
    }

    async initialize() {
        const stories = await this.scanner.scanStories();
        this.populateStoryList(stories);
    }

    populateStoryList(stories) {
        const storyList = document.querySelector('.story-entries');
        storyList.innerHTML = '';

        stories.forEach((storyName, index) => {
            const li = document.createElement('li');
            li.classList.add('story-entry');
            li.style.animationDelay = `${index * 0.1}s`;
            li.innerHTML = `
                <button class="story-button" data-story="${storyName}">
                    ${this.formatStoryTitle(storyName)}
                </button>
            `;
            storyList.appendChild(li);
        });
    }

    async loadEpisodes(storyName) {
        const episodeList = document.querySelector('.episode-entries');
        episodeList.innerHTML = '<li class="loading">Scanning episodes...</li>';

        try {
            const episodes = await this.scanner.scanEpisodes(storyName);
            episodeList.innerHTML = '';

            episodes.forEach((episodeName, index) => {
                const li = document.createElement('li');
                li.classList.add('episode-entry');
                li.style.animationDelay = `${index * 0.1}s`;
                li.innerHTML = `
                    <button class="episode-button" 
                            data-story="${storyName}" 
                            data-episode="${episodeName}">
                        Episode ${parseInt(episodeName)}
                    </button>
                `;
                episodeList.appendChild(li);
            });

            if (episodes.length === 0) {
                episodeList.innerHTML = '<li class="no-episodes">No episodes found</li>';
            }
        } catch (error) {
            episodeList.innerHTML = '<li class="error">Error loading episodes</li>';
            console.error('Error loading episodes:', error);
        }
    }

    async loadEpisodeContent(storyName, episodeName) {
        const cacheKey = `${storyName}/${episodeName}`;
        
        // Check cache first
        if (this.episodeCache.has(cacheKey)) {
            return this.episodeCache.get(cacheKey);
        }

        try {
            const contentsPath = `/stories/${storyName}/${episodeName}/Contents.md`;
            const episodePath = `/stories/${storyName}/${episodeName}/Episode.md`;

            const [contentsResponse, episodeResponse] = await Promise.all([
                fetch(contentsPath),
                fetch(episodePath)
            ]);

            const [contents, episode] = await Promise.all([
                contentsResponse.text(),
                episodeResponse.text()
            ]);

            const content = {
                contents,
                episode
            };

            // Cache the content
            this.episodeCache.set(cacheKey, content);
            return content;
        } catch (error) {
            console.error('Error loading episode content:', error);
            throw new Error('Failed to load episode content');
        }
    }

    formatStoryTitle(name) {
        return name.replace(/([A-Z])/g, ' $1').trim();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    const navigator = new StoryNavigator();
    await navigator.initialize();

    document.addEventListener('click', async (e) => {
        if (e.target.matches('.story-button')) {
            const storyName = e.target.dataset.story;
            document.querySelector('.current-story-title').textContent = 
                navigator.formatStoryTitle(storyName);
            await navigator.loadEpisodes(storyName);
        }
        
        if (e.target.matches('.episode-button')) {
            const { story, episode } = e.target.dataset;
            const contentDisplay = document.querySelector('.content-display');
            contentDisplay.innerHTML = `Loading ${episode} of ${story}...`;
            
            try {
                const content = await navigator.loadEpisodeContent(story, episode);
                contentDisplay.innerHTML = `
                    <div class="episode-content">
                        <div class="contents-section">
                            <h3>Contents</h3>
                            <div class="markdown-content">${content.contents}</div>
                        </div>
                        <div class="episode-section">
                            <h3>Episode</h3>
                            <div class="markdown-content">${content.episode}</div>
                        </div>
                    </div>
                `;
            } catch (error) {
                contentDisplay.innerHTML = `
                    <div class="error-message">
                        Failed to load episode content
                    </div>
                `;
            }
        }
    });
});