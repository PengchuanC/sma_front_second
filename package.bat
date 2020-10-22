@echo off

echo build
yarn build && tar -czf second.tar.gz ./second/* && scp second.tar.gz sma@10.170.129.129:/home/sma/deploy/frontend/