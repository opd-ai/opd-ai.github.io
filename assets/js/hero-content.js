// hero-content.js

document.addEventListener('DOMContentLoaded', () => {
    // Get elements by ID
    const heroHeadline = document.getElementById('hero-headline');
    const heroIntro = document.getElementById('hero-intro');

    // Store original content as fallback
    const fallbackContent = {
        headline: heroHeadline ? heroHeadline.textContent : 'Dark Tales & Dangerous Dungeons',
        intro: heroIntro ? heroIntro.textContent : 'Embark on perilous adventures through haunted dungeons and cursed lands.'
    };

    // Function to fetch and process markdown content
    async function fetchMarkdownContent(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading markdown:', error);
            return null;
        }
    }

    // Function to update content with fade effect
    function updateContentWithFade(element, content) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.textContent = content;
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
                    headlineContent?.trim() || fallbackContent.headline
                );
            }

            // Update intro if element exists
            if (heroIntro) {
                updateContentWithFade(
                    heroIntro, 
                    introContent?.trim() || fallbackContent.intro
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
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Initialize content loading
    loadHeroContent();
});