# Use official Bun image
FROM oven/bun:1.2

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package and lock files first for better caching
COPY package.json bun.lock bunfig.toml ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the default port (change if your app uses a different port)
EXPOSE 3031

# Health check: ensure the app responds on the root path
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3031/ || exit 1

# Start the app
CMD ["bun", "start"]
