#!/usr/bin/env sh

set -x

pwd

npm run build

pwd

npm start &
sleep 1

pwd

echo $! > .pidfile
set +x