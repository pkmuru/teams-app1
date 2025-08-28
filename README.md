# Microsoft Teams Tab App with SSO

A simple "Hello World" Teams tab application with Single Sign-On (SSO) using Azure AD authentication.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   App runs on https://localhost:5173

3. **Package for Teams**
   ```bash
   cd teams
   # Create ZIP with manifest.json, color.png, outline.png
   ```

4. **Upload to Teams**
   - Teams → Apps → Upload a custom app
   - Select ZIP file
   - Add to team or personal use

## Configuration

See `TEAMS_APP_SETUP_GUIDE.md` for complete setup instructions including:
- Azure AD configuration
- Teams manifest setup
- SSO implementation
- Troubleshooting

## Key Files

- `src/config/app.config.ts` - All configuration constants
- `teams/manifest.json` - Teams app manifest
- `src/App.tsx` - Main app with SSO

## Documentation

- `TEAMS_APP_SETUP_GUIDE.md` - Complete setup and configuration guide
- `CLEAR_TEAMS_CACHE.md` - How to clear Teams cache
- `CONFIGURE_API_SCOPE_GUIDE.md` - Azure AD scope configuration
- `TEAMS_CLIENT_IDS_DOCUMENTATION.md` - Microsoft Teams client IDs reference

## Build

```bash
npm run build
```

## Technology Stack

- React 18 + TypeScript
- Vite
- Microsoft Teams SDK
- Microsoft Graph Toolkit
- Fluent UI React Components
- Azure AD Authentication