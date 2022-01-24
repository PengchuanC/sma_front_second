echo "打包程序"

yarn build

rm -f dist.tar.gz

tar -cvf dist.tar.gz ./dist/*

scp dist.tar.gz root@10.170.129.129:/home/sma/deploy/frontend/