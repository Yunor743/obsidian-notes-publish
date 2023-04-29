#!/bin/sh

git pull &&
yarn && yarn build &&
docker compose down &&
docker compose build &&
docker compose up -d

