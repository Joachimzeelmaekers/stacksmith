# Multi-stage build for smaller final image
FROM node:22-alpine AS base

# Install Go binary directly (much smaller than apk add go which pulls in gcc)
ENV GO_VERSION=1.23.5
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "x86_64" ]; then GOARCH="amd64"; \
    elif [ "$ARCH" = "aarch64" ]; then GOARCH="arm64"; \
    else GOARCH="amd64"; fi && \
    wget -q https://go.dev/dl/go${GO_VERSION}.linux-${GOARCH}.tar.gz \
    && tar -C /usr/local -xzf go${GO_VERSION}.linux-${GOARCH}.tar.gz \
    && rm go${GO_VERSION}.linux-${GOARCH}.tar.gz
ENV PATH="/usr/local/go/bin:${PATH}"

# Set up working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Set environment variables
ENV NODE_ENV=production

# The CLI needs interactive TTY - run with: docker run -it
# Use shell form to conditionally load .env file if present
ENTRYPOINT ["/bin/sh", "-c", "if [ -f .env ]; then exec node --env-file=.env --import tsx run.ts; else exec npx tsx run.ts; fi"]
