@echo off
if not exist ".\node_modules" echo run 'npm install' first && exit /b
call node_modules\.bin\webpack.cmd %*
