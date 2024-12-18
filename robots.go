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
