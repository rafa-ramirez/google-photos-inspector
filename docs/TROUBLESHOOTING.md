# Troubleshooting Guide

## Common Issues and Solutions

### Authentication Issues

#### "Sign in with Google" button doesn't work
**Symptoms**: Click button, nothing happens or blank page

**Solutions**:
1. Check backend is running: `curl http://localhost:5000/health`
2. Check browser console for errors (F12 → Console)
3. Check `.env` file has correct `GOOGLE_CLIENT_ID`
4. Verify Google API credentials are correct

```bash
# Check backend logs
docker-compose logs backend | grep -i error
```

#### "Redirect URI mismatch" error
**Symptoms**: Error page after Google login

**Solutions**:
1. Check `.env` file: `GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/callback`
2. Log in to Google Cloud Console
3. Go to Credentials → OAuth client ID
4. Edit and verify authorized redirect URIs includes:
   - `http://localhost:5000/api/auth/callback`
5. Restart backend: `docker-compose restart backend`

#### Session not persisting
**Symptoms**: Get logged out frequently

**Solutions**:
1. Check `SESSION_SECRET` is set in `.env`
2. Ensure cookies are enabled in browser
3. Check browser privacy settings aren't blocking cookies
4. Try different browser (Chrome, Firefox, Safari)

### Google Photos API Issues

#### "Failed to validate photos" error
**Symptoms**: Validation starts but fails with error

**Solutions**:
1. Verify Google Photos Library API is enabled:
   - Go to Google Cloud Console
   - APIs & Services → Enabled APIs & services
   - Look for "Google Photos Library API"
   - If missing, go to Library and enable it

2. Check quota limits:
   ```
   Google Cloud Console → APIs & Services → Quotas
   Look for Google Photos Library API
   Check if you've hit rate limits
   ```

3. Restart the application:
   ```bash
   docker-compose down
   docker-compose up
   ```

#### No photos found in library
**Symptoms**: Validation completes but says 0 photos found

**Solutions**:
1. Verify you have photos in Google Photos
2. Check date range isn't too narrow
3. Try without date filter (leave blank)
4. Verify account has permission to access photos
5. Log out and log in again

#### API rate limit exceeded
**Symptoms**: Error after scanning many photos

**Solutions**:
- Google Photos API has rate limits
- Wait a few minutes before scanning again
- Use narrower date ranges
- Contact Google Cloud support for higher limits

### File Upload Issues (Local Analyzer)

#### "No files uploaded" error
**Symptoms**: Click analyze but get error

**Solutions**:
1. Make sure you selected .json files (not images)
2. Verify files are from Google Takeout
3. Check file names end with `.json`
4. Ensure files are readable (not corrupted)

#### Exiftool errors
**Symptoms**: "Error reading EXIF" messages

**Solutions**:
1. Some file types don't have EXIF data:
   - Screenshots usually have no GPS
   - Edited images may have stripped metadata
   - Very old files may not support EXIF

2. Verify file format is supported:
   - JPEG, PNG, MP4, MOV supported
   - Some RAW formats not supported

3. Check file isn't corrupted:
   ```bash
   file filename.jpg
   # Should show image type, not "data"
   ```

#### "Location data not found"
**Symptoms**: Analysis runs but all items marked as missing location

**Solutions**:
1. This may be accurate - photos actually don't have location
2. Check in Google Photos if location is shown there
3. Verify exiftool is working:
   ```bash
   docker-compose exec backend exiftool /app/uploads/filename.jpg
   # Should show metadata
   ```

4. Some cameras don't save GPS by default - check camera settings

### Performance Issues

#### Application is slow
**Symptoms**: Pages load slowly, analysis takes a long time

**Solutions**:
1. Check available memory:
   ```bash
   # See Orbstack resource usage
   orbstack settings → Resources
   ```

2. Close unnecessary applications
3. Increase Orbstack resources in settings
4. Process files in smaller batches

#### High memory usage
**Symptoms**: Application crashes or becomes very slow

**Solutions**:
1. Limit number of files processed at once
2. Increase Orbstack memory allocation
3. Restart containers: `docker-compose restart`
4. Clear browser cache and cookies

### Docker/Orbstack Issues

#### Container won't start
**Symptoms**: `docker-compose up` fails with errors

**Solutions**:
1. Check Orbstack is running (check menu bar icon)
2. If not, launch Orbstack from Applications
3. Verify Docker daemon is running:
   ```bash
   docker ps
   ```

4. Check for port conflicts:
   ```bash
   # See what's using port 3000
   lsof -i :3000
   lsof -i :5000
   ```

5. Remove old containers:
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

#### "Cannot connect to Docker daemon"
**Symptoms**: Docker commands fail

**Solutions**:
1. Start Orbstack (from Applications)
2. Wait 30 seconds for it to fully load
3. Try again: `docker ps`
4. Restart computer if still failing

#### Disk space full
**Symptoms**: Build fails, containers won't start

**Solutions**:
1. Check space: `df -h`
2. Clean up Docker:
   ```bash
   docker system prune -a --volumes
   ```
3. Remove old images:
   ```bash
   docker rmi $(docker images -q)
   ```

### Network Issues

#### "Connection refused" error
**Symptoms**: Frontend can't reach backend

**Solutions**:
1. Check both containers are running:
   ```bash
   docker-compose ps
   # All should show "Up"
   ```

2. Verify services:
   ```bash
   curl http://localhost:5000/health
   curl http://localhost:3000
   ```

3. Check network:
   ```bash
   docker-compose logs backend
   # Look for listening port messages
   ```

4. Restart everything:
   ```bash
   docker-compose down
   docker-compose up
   ```

#### CORS errors in browser
**Symptoms**: Network errors in browser console

**Solutions**:
1. Check `.env` file has correct URLs
2. Verify `CORS_ORIGIN` in backend matches frontend URL
3. Clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)
4. Try incognito/private mode

### Database Issues

#### Database is locked
**Symptoms**: "Database locked" errors

**Solutions**:
1. Restart database: `docker-compose restart db`
2. Check for running transactions:
   ```bash
   docker-compose down
   docker-compose up
   ```

#### Lost data after restart
**Symptoms**: Results disappeared

**Solutions**:
1. Check volume is persisting:
   ```bash
   docker-compose ps
   # Should show volumes for 'backend_data'
   ```

2. Data only persists if using named volume
3. Check `.env` has `DATABASE_PATH=/app/data/photos-inspector.db`

### Browser Issues

#### JavaScript errors in console
**Symptoms**: Console shows red errors

**Solutions**:
1. Hard refresh browser: Ctrl+Shift+R / Cmd+Shift+R
2. Clear browser cache and cookies
3. Try different browser
4. Check backend is running: `curl http://localhost:5000/health`

#### Page won't load at all
**Symptoms**: Blank page, nothing displays

**Solutions**:
1. Check frontend container is running:
   ```bash
   docker-compose logs frontend
   ```

2. Check browser console for errors (F12)
3. Verify port 3000 is correct
4. Try direct URL: `http://localhost:3000`

## Debugging Tips

### Enable verbose logging
```bash
# Backend
docker-compose logs -f backend

# Frontend
docker-compose logs -f frontend

# All services
docker-compose logs -f
```

### Check environment variables
```bash
# See what env vars are set
docker-compose config

# Check in running container
docker-compose exec backend printenv | grep GOOGLE
```

### Access container terminal
```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh

# Run commands
docker-compose exec backend npm test
```

### Network debugging
```bash
# Test backend connectivity
docker-compose exec frontend curl http://backend:5000/health

# Test database connectivity
docker-compose exec backend sqlite3 /app/data/photos-inspector.db ".tables"
```

## Getting Help

1. **Check logs first**
   ```bash
   docker-compose logs > logs.txt
   # Review logs.txt for errors
   ```

2. **Try a clean restart**
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

3. **Check documentation**
   - [INSTALLATION.md](INSTALLATION.md)
   - [USAGE.md](USAGE.md)
   - [GOOGLE_API_SETUP.md](GOOGLE_API_SETUP.md)

4. **Review GitHub issues** (if applicable)

5. **Contact support** with:
   - Steps to reproduce issue
   - Full error message
   - Output of `docker-compose logs`
   - Output of `docker --version` and `docker-compose --version`

## Emergency Cleanup

If everything is broken:

```bash
# Stop everything
docker-compose down -v

# Remove all containers (careful!)
docker container prune -f

# Remove all images for this project
docker rmi $(docker images | grep inspector | awk '{print $3}')

# Start fresh
docker-compose up --build
```

## Performance Tuning

### Increase resource limits
Edit `.env`:
```env
# Increase available memory (in MB)
BACKEND_MEMORY=2048
FRONTEND_MEMORY=1024
```

### Optimize date ranges
- Scanning all-time photos takes longer
- Use month/year filters for faster results
- Process files in batches

### Database optimization
```bash
# Optimize SQLite database
docker-compose exec backend sqlite3 /app/data/photos-inspector.db "VACUUM;"
```
