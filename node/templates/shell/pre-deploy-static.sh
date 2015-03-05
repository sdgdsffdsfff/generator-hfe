#!/bin/bash
set -e

WORKSPACE=`pwd`

STATIC_PATH=/opt/meituan/static/hotel/
TEST_STATIC_PATH=/opt/meituan/static/test/hotel
DEPLOY_PATH=$WORKSPACE/build/public/

npm install

# grunt build
gulp

echo '拷贝静态资源到静态服务器'
rsync -avi $DEPLOY_PATH sankuai@mobile-static01:$STATIC_PATH
rsync -avi $DEPLOY_PATH sankuai@mobile-static02:$STATIC_PATH

# 清空发布后的静态文件
# rm -rf $DEPLOY_PATH
