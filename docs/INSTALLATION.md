# Installation Guide

## Prerequisites

### Required
- **Orbstack** - Download from [orbstack.dev](https://orbstack.dev)
  - Orbstack is a lightweight Docker container platform for Mac
  - It replaces Docker Desktop and includes full Docker support
  - No Docker Desktop license needed

### Recommended
- macOS 11 (Big Sur) or later
- 4GB+ RAM
- 2GB+ disk space for containers
- Stable internet connection

## Installation Steps

### Step 1: Install Orbstack

1. Download from [orbstack.dev](https://orbstack.dev)
2. Open the .dmg file
3. Drag OrbStack to Applications folder
4. Launch OrbStack from Applications
5. Grant necessary permissions when prompted
6. Wait for OrbStack to start (usually 30-60 seconds)

### Step 2: Verify Docker Installation

Open terminal and run:
```bash
docker --version
# Should show: Docker version X.X.X

docker-compose --version
# Should show: Docker Compose version X.X.X
```

### Step 3: Clone the Repository

```bash
# Navigate to where you want to store the project
cd ~/projects

# Clone (if using git)
git clone https://github.com/yourusername/google-photos-inspector.git
cd google-photos-inspector
```

Or if you have the files:
```bash
cd /Users/rafa/projects/google-photos-inspector
```

### Step 4: Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Open .env in your editor
nano .env
# or
code .env
```

Add your Google API credentials (see [GOOGLE_API_SETUP.md](GOOGLE_API_SETUP.md)):
```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/callback
SESSION_SECRET=your_random_secret
```

### Step 5: Build and Start Containers

```bash
# Build images (first time only)
docker-compose build

# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

You should see:
```
NAME                          STATUS
google-photos-inspector-backend-1    Up
google-photos-inspector-frontend-1   Up
google-photos-inspector-db-1         Up
```

### Step 6: Verify Services

```bash
# Check backend is running
curl http://localhost:5000/health
# Should return: {"status":"ok","timestamp":"..."}

# Check frontend is running
open http://localhost:3000
# Should open the app in your browser
```

## Troubleshooting Installation

### "docker: command not found"
- Restart your terminal or computer after installing Orbstack
- Verify Orbstack is running (check status bar)
- Try: `which docker`

### Port already in use
```bash
# Change ports in docker-compose.yml
# Then rebuild:
docker-compose down
docker-compose up --build
```

### Container fails to start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

### Out of disk space
```bash
# Remove unused Docker resources
docker system prune -a

# Or check Orbstack settings
orbstack settings # In the app menu
```

## Daily Usage

### Start the application
```bash
cd /Users/rafa/projects/google-photos-inspector
docker-compose up -d
```

### Stop the application
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Restart a service
```bash
docker-compose restart backend
```

### Update code
```bash
# Edit code in your editor
# Changes are reflected immediately due to volume mounts

# Restart if needed
docker-compose restart
```

## Advanced: Manual Setup (Without Docker)

If you prefer not to use Orbstack:

### Backend Setup
```bash
cd backend
npm install
export GOOGLE_CLIENT_ID=your_id
export GOOGLE_CLIENT_SECRET=your_secret
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
REACT_APP_API_BASE_URL=http://localhost:5000/api npm start
```

**Note**: You'll need to install dependencies on your Mac:
- Node.js 18+
- exiftool: `brew install exiftool`
- SQLite3

## Cleanup

### Stop and remove containers
```bash
docker-compose down
```

### Remove all data (including database)
```bash
docker-compose down -v
```

### Remove images
```bash
docker-compose down --rmi all
```

## Next Steps

1. Complete [Google API Setup](GOOGLE_API_SETUP.md)
2. Start the application: `docker-compose up`
3. Open http://localhost:3000
4. Sign in with Google
5. See [Usage Guide](USAGE.md) for detailed instructions

## Support

- **Orbstack issues**: [Orbstack Support](https://orbstack.dev/docs)
- **Docker issues**: [Docker Documentation](https://docs.docker.com)
- **Application issues**: See TROUBLESHOOTING.md in this folder
