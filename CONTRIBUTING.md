# Contributing to Google Photos Inspector

Thank you for your interest in contributing!

## Code of Conduct

Be respectful and constructive in all interactions.

## How to Contribute

### Reporting Issues
- Check existing issues first
- Provide detailed description
- Include error messages and logs
- Specify OS and Orbstack version

### Feature Requests
- Describe the feature and use case
- Explain why it would be useful
- Provide examples or mockups

### Code Contributions

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test locally: `docker-compose up`
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/google-photos-inspector.git
cd google-photos-inspector

# Follow INSTALLATION.md
```

## Code Standards

- Use consistent formatting
- Add comments for complex logic
- Update documentation for new features
- Test before submitting

## Project Structure

```
backend/
  src/
    index.js          # Entry point
    routes/           # API endpoints
    services/         # Business logic
    utils/            # Helper functions

frontend/
  src/
    pages/            # Page components
    components/       # Reusable components
    App.js            # Main app
    index.js          # Entry point
    api.js            # API calls
    store.js          # State management

docs/                 # Documentation
```

## Need Help?

- Check documentation in `/docs`
- Review existing issues for solutions
- Ask in discussions section

## License

By contributing, you agree your code is licensed under the same license as the project.
