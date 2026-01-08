#!/bin/bash

# macOS 图标生成脚本
# 使用方式：将您的图标图片放到 assets/icon-source.png，然后运行此脚本

SOURCE="assets/icon-source.png"
OUTPUT="assets/icon.png"
TEMP_SQUARE="/tmp/icon-square.png"

# 检查源文件是否存在
if [ ! -f "$SOURCE" ]; then
    echo "错误：找不到源图标文件 $SOURCE"
    echo "请将您的图标图片（1024x1024 PNG 格式）放到 assets/icon-source.png"
    exit 1
fi

# 使用 sips 添加圆角并调整大小
echo "正在处理图标..."
sips -s format png \
     -z 1024 1024 \
     "$SOURCE" \
     --out "$TEMP_SQUARE" >/dev/null 2>&1

# 如果安装了 ImageMagick，使用它添加圆角
if command -v convert >/dev/null 2>&1; then
    echo "使用 ImageMagick 添加圆角..."
    convert "$TEMP_SQUARE" \
            \( +clone -alpha extract \
               -draw 'fill black polygon 0,0 0,200 200,0 fill white circle 200,200 200,0' \
               -flip -draw 'fill black polygon 0,0 0,200 200,0 fill white circle 200,200 200,0' \
               -flop -draw 'fill black polygon 0,0 0,200 200,0 fill white circle 200,200 200,0' \
               -rotate 180 -draw 'fill black polygon 0,0 0,200 200,0 fill white circle 200,200 200,0' \
            \) \
            -alpha off -compose copy-opacity -composite \
            "$OUTPUT"

    echo "图标已生成：$OUTPUT"
else
    echo "警告：未安装 ImageMagick，使用默认处理方式"
    cp "$TEMP_SQUARE" "$OUTPUT"
    echo "图标已生成（无圆角）：$OUTPUT"
    echo "建议安装 ImageMagick: brew install imagemagick"
fi

# 清理临时文件
rm -f "$TEMP_SQUARE"

echo ""
echo "下一步："
echo "1. 检查生成的图标：open $OUTPUT"
echo "2. 重新打包应用：pnpm dist"
