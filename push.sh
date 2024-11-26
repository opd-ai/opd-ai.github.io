#! /usr/bin/env sh
go build -o rss .
./rss
git add .
DATE=$(date)
git commit -am "$DATE"
git push --all
