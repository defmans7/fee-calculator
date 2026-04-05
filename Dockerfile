# Use official Bun image
FROM oven/bun:1.2

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

# Health check for Docker using Bun instead of curl
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3031/health').then(res => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))"

# Start the app
CMD ["bun", "start"]
