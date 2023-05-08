#!/bin/sh

git pull &&
rm graph-data.json
yarn && yarn build &&
docker compose down &&
docker compose build &&
docker compose up -d

