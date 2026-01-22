#!/bin/bash

# Build and run stacksmith in Docker
# Usage: ./docker-run.sh

IMAGE_NAME="stacksmith"

# Build the image if it doesn't exist or if --build flag is passed
if [[ "$1" == "--build" ]] || ! docker image inspect "$IMAGE_NAME" &> /dev/null; then
    echo "Building Docker image..."
    docker build -t "$IMAGE_NAME" .
fi

# Run with interactive TTY
# Mount .env file if it exists (for KB Assistant feature)
if [[ -f .env ]]; then
    docker run -it --rm -v "$(pwd)/.env:/app/.env:ro" "$IMAGE_NAME"
else
    docker run -it --rm "$IMAGE_NAME"
fi
