#!/bin/sh
yarn build:webpack && pm2 reload all
