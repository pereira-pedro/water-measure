#!/bin/sh
docker compose --project-name water-counter build
docker compose --project-name water-counter up -d