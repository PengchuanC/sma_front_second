echo "打包程序"

yarn build

rm -f dist.zip

zip -r dist.zip ./dist

scp dist.zip root@10.170.129.129:/home/sma/deploy/frontend/