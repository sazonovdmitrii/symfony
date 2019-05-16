#!/bin/sh
yarn build:lib && pm2 reload all
