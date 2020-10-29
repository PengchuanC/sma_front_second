@echo off

echo build
yarn build && tar -czf dist.tar.gz ./dist/* && scp dist.tar.gz sma@10.170.129.129:/home/sma/deploy/frontend/