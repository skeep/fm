#!/usr/bin/env bash
git add .
git commit -m "new deploy"
git push
git push heroku master
