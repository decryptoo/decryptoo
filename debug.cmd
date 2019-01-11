@echo off
cd "%~dp0"
set args=--mode development --port 80 --inline --hot
call node "./node_modules/webpack-dev-server/bin/webpack-dev-server.js" %args%
