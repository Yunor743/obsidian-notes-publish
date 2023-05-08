#!/bin/sh

git pull &&
rm graph-data.json
find posts/ -type f -exec sed -i 's/```sh/```bash/g' {} +
yarn && yarn build &&
docker compose down &&
docker compose build &&
docker compose up -d

