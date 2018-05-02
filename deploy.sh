#!/usr/bin/env bash
sudo su
git pull
forever restart bin/www
