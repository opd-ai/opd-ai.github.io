class PDFManager {
    constructor() {
        this.pdfCache = new Map();
    }

    async checkPDFExists(storyPath, episodeName) {
        const cacheKey = `${storyPath}/${episodeName}`;
        
        if (this.pdfCache.has(cacheKey)) {
            return this.pdfCache.get(cacheKey);
        }

        const pdfPath = `/${storyPath}/${episodeName}/index.html.pdf`;
        
        try {
            const response = await fetch(pdfPath, { method: 'HEAD' });
            const exists = response.status === 200;
            this.pdfCache.set(cacheKey, exists);
            return exists;
        } catch (error) {
            this.pdfCache.set(cacheKey, false);
            return false;
        }
    }

    createPDFButton(storyPath, episodeName) {
        const pdfPath = `/${storyPath}/${episodeName}/index.html.pdf`;
        return `
            <div class="pdf-download-section">
                <a href="${pdfPath}" 
                   class="pdf-download-button" 
                   download 
                   target="_blank">
                    📥 Download PDF Version
                </a>
            </div>
        `;
    }
}

class IllustrationManager {
    constructor() {
        this.illustrations = [];
    }

    createIllustrationHTML(illustrations) {
        if (illustrations.length === 0) return '';

        return `
            <div class="illustrations-section">
                <h3>Illustrations</h3>
                <div class="illustrations-grid">
                    ${illustrations.map(ill => `
                        <figure class="illustration-item">
                            <img src="${ill.imagePath}" 
                                 alt="${ill.caption}" 
                                 loading="lazy"
                                 onclick="openLightbox(this)">
                            <figcaption class="illustration-caption">
                                ${ill.caption}
                            </figcaption>
                        </figure>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async scanForIllustrations(storyPath, episodeName) {
        const illustrations = [];
        const markdownRenderer = new MarkdownRenderer();
        markdownRenderer.setStoryPath(storyPath);

        for (let i = 1; i <= 10; i++) {
            const captionPath = `/${storyPath}/${episodeName}/Caption_${i}.md`;
            try {
                const response = await fetch(captionPath);
                if (response.ok) {
                    const captionText = await response.text();
                    // Extract the first image and its caption from the markdown
                    const imgMatch = captionText.match(/!\[(.*?)\]\((.*?)\)/);
                    if (imgMatch) {
                        const [, altText, imagePath] = imgMatch;
                        // Use the rest of the text as caption
                        const caption = captionText
                            .replace(/!\[(.*?)\]\((.*?)\)/, '') // Remove image markdown
                            .trim();
                        
                        illustrations.push({
                            imagePath: `/${storyPath}/${episodeName}/${imagePath.replace(/^\/+/, '')}`,
                            caption: caption || altText
                        });
                    }
                }
            } catch (error) {
                console.log(`No Caption_${i}.md found`);
            }
        }

        for (let i = 1; i <= 10; i++) {
            const captionPath = `/${storyPath}/${episodeName}/${i}_Illustration.md`;
            try {
                const response = await fetch(captionPath);
                if (response.ok) {
                    const captionText = await response.text();
                    // Extract the first image and its caption from the markdown
                    const imgMatch = captionText.match(/!\[(.*?)\]\((.*?)\)/);
                    if (imgMatch) {
                        const [, altText, imagePath] = imgMatch;
                        // Use the rest of the text as caption
                        const caption = captionText
                            .replace(/!\[(.*?)\]\((.*?)\)/, '') // Remove image markdown
                            .trim();
                        
                        illustrations.push({
                            imagePath: `/${storyPath}/${episodeName}/${imagePath.replace(/^\/+/, '')}`,
                            caption: caption || altText
                        });
                    }
                }
            } catch (error) {
                console.log(`No ${i}_Illustration.md found`);
            }
        }
        
        for (let i = 1; i <= 10; i++) {
            const captionPath = `/${storyPath}/${episodeName}/${i}_CoverIllustration.md`;
            try {
                const response = await fetch(captionPath);
                if (response.ok) {
                    const captionText = await response.text();
                    // Extract the first image and its caption from the markdown
                    const imgMatch = captionText.match(/!\[(.*?)\]\((.*?)\)/);
                    if (imgMatch) {
                        const [, altText, imagePath] = imgMatch;
                        // Use the rest of the text as caption
                        const caption = captionText
                            .replace(/!\[(.*?)\]\((.*?)\)/, '') // Remove image markdown
                            .trim();
                        
                        illustrations.push({
                            imagePath: `/${storyPath}/${episodeName}/${imagePath.replace(/^\/+/, '')}`,
                            caption: caption || altText
                        });
                    }
                }
            } catch (error) {
                console.log(`No ${i}_CoverIllustration.md found`);
            }
        }

        return illustrations;
    }
}

class MarkdownRenderer {
    constructor() {
        // Configure marked options as before
        marked.setOptions({
            gfm: true,
            breaks: true,
            headerIds: true,
            mangle: false,
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(code, { language: lang }).value;
                    } catch (e) {
                        console.error('Highlight error:', e);
                    }
                }
                return code;
            }
        });

        // Custom renderer for additional features
        const renderer = new marked.Renderer();
        
        // Modified image rendering to include storyPath
        renderer.image = (href, title, text) => {
            // Get the current storyPath from the data attribute we'll set
            const storyPath = this.currentStoryPath || '';
            
            // Only prefix the href if it's a relative path (doesn't start with http/https)
            const imageSrc = href.startsWith('http') ? 
                href : 
                `/${storyPath}/${href.replace(/^\/+/, '')}`;

            return `
                <figure class="markdown-image">
                    <img src="${imageSrc}" 
                         alt="${text}" 
                         title="${title || text}" 
                         loading="lazy" 
                         onclick="openLightbox(this)">
                    ${title ? `<figcaption>${title}</figcaption>` : ''}
                </figure>
            `;
        };

        // Keep the existing link renderer
        renderer.link = (href, title, text) => {
            const isExternal = href.startsWith('http');
            return `
                <a href="${href}" 
                   ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''} 
                   title="${title || text}"
                   class="${isExternal ? 'external-link' : 'internal-link'}">
                    ${text}
                </a>
            `;
        };

        marked.use({ renderer });
    }

    // Add method to set the current story path
    setStoryPath(path) {
        this.currentStoryPath = path;
    }

    render(markdown) {
        try {
            const html = marked.parse(markdown);
            return html;
        } catch (error) {
            console.error('Markdown parsing error:', error);
            return `<div class="markdown-error">Error parsing markdown: ${error.message}</div>`;
        }
    }
}

class StoryStructureScanner {
    constructor() {
        // First segment: Must start with capital letter, only letters
        // After slash: Can start with number or capital letter, 
        // and include letters, numbers, hyphens, and underscores
        this.storyPattern = /^([A-Z][A-Za-z]*)(\/[A-Z0-9][A-Za-z0-9_-]*)*$/;
        this.episodePattern = /^(\d{2})_Episode$/;
        this.knownStories = [];
    }

    async loadStoriesFromCSV() {
        try {
            const response = await fetch('/assets/csv/stories.csv');
            if (!response.ok) {
                throw new Error('Failed to load stories.csv');
            }
            
            const csvText = await response.text();
            this.knownStories = csvText
                .split('\n')
                .map(line => line.trim())
                .filter(line => {
                    if (!line) return false;
                    const isValid = this.storyPattern.test(line);
                    if (!isValid) {
                        console.warn(
                            `Invalid story name in CSV: "${line}". ` +
                            `First segment must contain only letters and start with capital. ` +
                            `After a slash, segments can start with numbers or capitals ` +
                            `and include letters, numbers, hyphens, and underscores.`
                        );
                    }
                    return isValid;
                });
                
            if (this.knownStories.length === 0) {
                console.warn('No valid stories found in stories.csv');
            }
        } catch (error) {
            console.error('Error loading stories.csv:', error);
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
        let episodeNum = 1;
        let continueScanning = true;

        while (continueScanning && episodeNum <= 99) {
            const paddedNum = episodeNum.toString().padStart(2, '0');
            const episodeDir = `${paddedNum}_Episode`;
            const contentsPath = `/${storyName}/${episodeDir}/Contents.md`;
            const episodePath = `/${storyName}/${episodeDir}/Episode.md`;

            // Check if both required files exist
            const [contentsExists, episodeExists] = await Promise.all([
                this.checkFileExists(contentsPath),
                this.checkFileExists(episodePath)
            ]);

            if (contentsExists || episodeExists) {
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
        this.episodeCache = new Map();
        this.markdownRenderer = new MarkdownRenderer();
        this.illustrationManager = new IllustrationManager();
        this.pdfManager = new PDFManager();
    }

    async initialize() {
        const stories = await this.scanner.scanStories();
        this.populateStoryList(stories);
    }

    formatStoryTitle(name) {
        // Format for display only - split by slash and process each part
        return name
            .split('/')
            .map(part => {
                // Preserve numbers but add spaces before capital letters
                return part.replace(/([A-Z])/g, ' $1').trim();
            })
            .join(' / ');
    }

    populateStoryList(stories) {
        const storyList = document.querySelector('.story-entries');
        storyList.innerHTML = '';

        stories.forEach((storyName, index) => {
            const li = document.createElement('li');
            li.classList.add('story-entry');
            li.style.animationDelay = `${index * 0.1}s`;
            
            // Use data-story-path for the actual file path
            li.innerHTML = `
                <button class="story-button" 
                        data-story-path="${storyName}"
                        data-story-display="${this.formatStoryTitle(storyName)}">
                    ${this.formatStoryTitle(storyName)}
                </button>
            `;
            storyList.appendChild(li);
        });
    }

    async loadEpisodes(storyPath) {
        const episodeList = document.querySelector('.episode-entries');
        episodeList.innerHTML = '<li class="loading">Scanning episodes...</li>';

        try {
            // Use exact story path for file operations
            const episodes = await this.scanner.scanEpisodes(storyPath);
            episodeList.innerHTML = '';

            episodes.forEach((episodeName, index) => {
                const li = document.createElement('li');
                li.classList.add('episode-entry');
                li.style.animationDelay = `${index * 0.1}s`;
                li.innerHTML = `
                    <button class="episode-button" 
                            data-story-path="${storyPath}" 
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

    async loadEpisodeContent(storyPath, episodeName) {
        const cacheKey = `${storyPath}/${episodeName}`;
        
        if (this.episodeCache.has(cacheKey)) {
            return this.episodeCache.get(cacheKey);
        }

        try {
            // Load episode content, illustrations, and check PDF availability concurrently
            const [episodeResponse, illustrations, hasPDF] = await Promise.all([
                fetch(`/${storyPath}/${episodeName}/Episode.md`),
                this.illustrationManager.scanForIllustrations(storyPath, episodeName),
                this.pdfManager.checkPDFExists(storyPath, episodeName)
            ]);

            if (!episodeResponse.ok) {
                throw new Error('Failed to load episode files');
            }

            this.markdownRenderer.setStoryPath(storyPath);
            
            const content = {
                episode: episodeResponse.ok ? 
                    this.markdownRenderer.render(await episodeResponse.text()) : '',
                hasEpisode: episodeResponse.ok,
                illustrations: illustrations,
                hasPDF: hasPDF
            };

            this.episodeCache.set(cacheKey, content);
            return content;
        } catch (error) {
            console.error('Error loading episode content:', error);
            throw error;
        }
    }
}

// Add lightbox functionality
function openLightbox(img) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.onclick = () => lightbox.remove();
    
    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.alt = img.alt;
    
    lightbox.appendChild(imgClone);
    document.body.appendChild(lightbox);
}

// Update the event listeners
document.addEventListener('DOMContentLoaded', async () => {
    const navigator = new StoryNavigator();
    await navigator.initialize();

    document.addEventListener('click', async (e) => {
        if (e.target.matches('.story-button')) {
            const storyPath = e.target.dataset.storyPath;
            const storyDisplay = e.target.dataset.storyDisplay;
            
            // Update display title but use exact path for loading
            document.querySelector('.current-story-title').textContent = storyDisplay;
            await navigator.loadEpisodes(storyPath);
        }
        
        if (e.target.matches('.episode-button')) {
            const storyPath = e.target.dataset.storyPath;
            const episode = e.target.dataset.episode;
            const contentDisplay = document.querySelector('.content-display');
            
            contentDisplay.innerHTML = `Loading ${episode} of ${storyPath}...`;
            
            try {
                const content = await navigator.loadEpisodeContent(storyPath, episode);
                contentDisplay.innerHTML = `
                    <div class="episode-content">
                        <div class="episode-section">
                            <h3>Episode</h3>
                            ${content.hasPDF ? 
                                navigator.pdfManager.createPDFButton(storyPath, episode) : 
                                ''}
                            <div class="markdown-content">${content.episode}</div>
                        </div>
                        ${content.illustrations.length > 0 ? 
                            navigator.illustrationManager.createIllustrationHTML(content.illustrations) : 
                            ''}
                    </div>
                `;
            } catch (error) {
                contentDisplay.innerHTML = `
                    <div class="error-message">
                        Failed to load episode content: ${error.message}
                    </div>
                `;
            }
        }

        if (e.target.matches('.story-button')) {
            // Toggle active state for story
            const wasActive = e.target.classList.contains('active');
            document.querySelectorAll('.story-button').forEach(btn => 
                btn.classList.remove('active'));
            if (!wasActive) e.target.classList.add('active');
    
            // Toggle episode list visibility
            const episodeList = e.target.nextElementSibling;
            document.querySelectorAll('.episode-list').forEach(list => 
                list.classList.remove('active'));
            if (!wasActive && episodeList) episodeList.classList.add('active');
        }
    
        if (e.target.matches('.episode-button')) {
            document.querySelectorAll('.episode-button').forEach(btn => 
                btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

});
