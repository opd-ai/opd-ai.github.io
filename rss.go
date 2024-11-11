package main

import (
    "bufio"
    "fmt"
    "os"
    "path/filepath"
    "strings"
    "time"
    "strconv"
//    "sort"

    "github.com/gorilla/feeds"
    "github.com/yuin/goldmark"
    "github.com/spf13/viper"
)

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

    // Convert Markdown to plain text
    md := goldmark.New()
    var buf strings.Builder
    if err := md.Convert(content, &buf); err != nil {
        return "", fmt.Errorf("converting markdown: %w", err)
    }

    // Split into paragraphs and find first non-empty one
    paragraphs := strings.Split(buf.String(), "\n\n")
    for _, p := range paragraphs {
        if cleaned := strings.TrimSpace(p); cleaned != "" {
            return cleaned, nil
        }
    }

    return "", fmt.Errorf("no valid paragraphs found")
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

    // Look for directories matching the pattern XX_Episode
    for i := 0; i <= 99; i++ { // Assuming max 100 episodes
        episodeDir := filepath.Join(storyDir, fmt.Sprintf("%02d_Episode", i))
        if _, err := os.Stat(episodeDir); err == nil {
            episodePaths = append(episodePaths, episodeDir)
        }
    }

    if len(episodePaths) == 0 {
        return nil, fmt.Errorf("no episode directories found in %s", storyDir)
    }

    return episodePaths, nil
}

func readStoriesFromCSV(filename string, baseDir string) ([]Story, error) {
    file, err := os.Open(filename)
    if err != nil {
        return nil, fmt.Errorf("opening CSV file: %w", err)
    }
    defer file.Close()

    var stories []Story
    scanner := bufio.NewScanner(file)
    
    for scanner.Scan() {
        path := scanner.Text()
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
                Title:       fmt.Sprintf("%s: Chapter %s - %s%s", 
                    story.Campaign, story.Number, story.Episode, partSuffix),
                Link:        &feeds.Link{Href: fmt.Sprintf("%s/%s/%s/index.html", 
                    config.BaseURL, story.Path, episodeDir)},
                Description: summary,
                Created:     publishDate.AddDate(0, 0, i), // Space out multiple parts by 1 day
                Id:          fmt.Sprintf("%s/%s/%s/index.html", 
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

    if err := os.WriteFile(config.FeedPath, []byte(rss), 0644); err != nil {
        fmt.Fprintf(os.Stderr, "Error writing feed: %v\n", err)
        os.Exit(1)
    }

    fmt.Println("Successfully generated RSS feed!")
}