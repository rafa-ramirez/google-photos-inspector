FROM node:18-alpine

WORKDIR /app

# Install dependencies including exiftool
RUN apk add --no-cache \
    exiftool \
    python3 \
    make \
    g++ \
    ca-certificates

# Copy package files
COPY package*.json ./

# Install Node dependencies
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Create data and upload directories
RUN mkdir -p /app/data /app/uploads

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["node", "src/index.js"]
