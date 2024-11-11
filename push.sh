#! /usr/bin/env sh
./rss
git add .
DATE=$(date)
git commit -am "$DATE"
git push --all
