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
