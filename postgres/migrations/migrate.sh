#!/bin/sh
#load cities db

psql $1 $2 < 0001_tables.sql
psql $1 $2 < 0002_countries.sql
psql $1 $2 < 0003_regions.sql
psql $1 $2 < 0004_cities.sql
