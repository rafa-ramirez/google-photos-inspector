#!/bin/bash

# Quick start script for Google Photos Inspector

echo "🚀 Google Photos Inspector - Quick Start"
echo "========================================"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found"
    echo "Creating from .env.example..."
    cp .env.example .env
    echo "Created basic configuration. You can edit .env if needed."
    exit 1
fi

# Check if Orbstack/Docker is running
echo "Checking Docker..."
if ! docker --version > /dev/null 2>&1; then
    echo "❌ Docker not found. Please install Orbstack from https://orbstack.dev"
    exit 1
fi

if ! docker ps > /dev/null 2>&1; then
    echo "❌ Docker daemon not running. Please start Orbstack"
    exit 1
fi

echo "✅ Docker is running"

# Start services
echo ""
echo "🐳 Starting containers..."
docker-compose down > /dev/null 2>&1
docker-compose up --build -d

# Wait for services
echo "⏳ Waiting for services to start..."
sleep 5

# Check health
echo ""
echo "🏥 Checking service health..."

# Check backend
if curl -s http://localhost:5001/health > /dev/null; then
    echo "✅ Backend: http://localhost:5001"
else
    echo "⚠️  Backend not responding yet, retrying..."
    sleep 3
fi

# Check frontend
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend: http://localhost:3000"
else
    echo "⚠️  Frontend starting up..."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Open http://localhost:3000 in your browser"
echo "2. Click 'Go to Analyzer'"
echo ""
echo "📚 Documentation:"
echo "   - Usage: docs/USAGE.md"
echo "   - Troubleshooting: docs/TROUBLESHOOTING.md"
echo ""
echo "🛑 To stop: docker-compose down"
echo "📋 To view logs: docker-compose logs -f"
