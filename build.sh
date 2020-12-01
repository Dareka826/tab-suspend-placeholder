#!/usr/bin/env bash

mkdir -p build
zip -r -FS build/tab-suspend-placeholder.xpi * --exclude '*.git'

