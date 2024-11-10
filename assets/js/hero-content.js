
// hero-content.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the custom markdown renderer
    const mdRenderer = new MarkdownRenderer();

    // Get elements by ID
    const heroHeadline = document.getElementById('hero-headline');
    const heroIntro = document.getElementById('hero-intro');

    // Store original content as fallback
    const fallbackContent = {
        headline: heroHeadline ? heroHeadline.innerHTML : 'Dark Tales & Dangerous Dungeons',
        intro: heroIntro ? heroIntro.innerHTML : 'Embark on perilous adventures through haunted dungeons and cursed lands.'
    };

    // Function to fetch and process markdown content
    async function fetchMarkdownContent(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}`);
            }
            const markdown = await response.text();
            // Use the custom renderer to convert markdown to HTML
            return mdRenderer.render(markdown);
        } catch (error) {
            console.error('Error loading markdown:', error);
            return null;
        }
    }

    // Function to update content with fade effect
    function updateContentWithFade(element, content) {
        element.style.opacity = '0';
        setTimeout(() => {
            // If content is wrapped in <p> tags and it's the headline, unwrap it
            if (element === heroHeadline && content.startsWith('<p>') && content.endsWith('</p>')) {
                content = content.slice(3, -4);
            }
            element.innerHTML = content;
            
            // Initialize any syntax-highlighted code blocks
            if (window.hljs) {
                element.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
            
            element.style.opacity = '1';
        }, 300);
    }

    // Main function to load and update hero content
    async function loadHeroContent() {
        // Add loading state
        if (heroHeadline) heroHeadline.classList.add('loading');
        if (heroIntro) heroIntro.classList.add('loading');

        try {
            // Load both markdown files simultaneously
            const [headlineContent, introContent] = await Promise.all([
                fetchMarkdownContent('/assets/md/headline.md'),
                fetchMarkdownContent('/assets/md/intro.md')
            ]);

            // Update headline if element exists
            if (heroHeadline) {
                updateContentWithFade(
                    heroHeadline, 
                    headlineContent || fallbackContent.headline
                );
            }

            // Update intro if element exists
            if (heroIntro) {
                updateContentWithFade(
                    heroIntro, 
                    introContent || fallbackContent.intro
                );
            }

        } catch (error) {
            console.error('Error updating hero content:', error);
            // Revert to fallback content if there's an error
            if (heroHeadline) {
                updateContentWithFade(heroHeadline, fallbackContent.headline);
            }
            if (heroIntro) {
                updateContentWithFade(heroIntro, fallbackContent.intro);
            }
        } finally {
            // Remove loading state
            if (heroHeadline) heroHeadline.classList.remove('loading');
            if (heroIntro) heroIntro.classList.remove('loading');
        }
    }

    // Add required styles
    const styles = `
        #hero-headline,
        #hero-intro {
            transition: opacity 0.3s ease-in-out;
        }
        
        .loading {
            opacity: 0.5;
        }

        .markdown-error {
            color: #ff4444;
            padding: 1em;
            border: 1px solid #ff4444;
            border-radius: 4px;
            background: rgba(255, 68, 68, 0.1);
        }

        .external-link::after {
            content: '↗';
            display: inline-block;
            margin-left: 0.2em;
            font-size: 0.8em;
        }

        .markdown-image {
            margin: 1em 0;
            text-align: center;
        }

        .markdown-image img {
            max-width: 100%;
            height: auto;
            cursor: pointer;
        }

        .markdown-image figcaption {
            font-style: italic;
            margin-top: 0.5em;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Initialize content loading
    loadHeroContent();
});