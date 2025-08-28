# Teams App Deployment Guide

## Current Configuration

The app is configured with your Azure AD application:
- **Client ID**: `e35a467b-be35-4ec1-8fc6-dc7c23cde972`
- **Resource**: `https://vstntechnologies.onmicrosoft.com/e35a467b-be35-4ec1-8fc6-dc7c23cde972`

## Project Structure

```
src/
├── auth/                 # Authentication configuration
│   ├── AuthConfig.ts    # Azure AD config
│   └── AuthProvider.tsx # Teams auth hook
├── components/
│   └── Layout.tsx       # App layout with navigation
├── pages/
│   ├── AuthStart.tsx    # Auth redirect page
│   ├── Config.tsx       # Teams tab configuration
│   ├── Privacy.tsx      # Privacy policy
│   ├── Tab.tsx          # Main Teams tab
│   └── TermsOfUse.tsx   # Terms of use
├── App.tsx              # Home page
└── main.tsx             # Router setup
```

## Routes Available

- `/` - Home page (personal tab)
- `/tab` - Team tab page
- `/config` - Configuration page for Teams
- `/privacy` - Privacy policy
- `/terms-of-use` - Terms of use
- `/auth-start` - Authentication callback

## Local Development

### 1. Generate SSL Certificates (Required for Teams)

Teams requires HTTPS. Generate certificates using mkcert:

```bash
# Install mkcert first if not installed
# Windows: choco install mkcert
# Mac: brew install mkcert

# Generate certificates
npx mkcert create-ca
npx mkcert create-cert

# Rename the generated files
# cert.pem → localhost.pem
# key.pem → localhost-key.pem
```

### 2. Start Development Server

```bash
npm run dev
```

The app will run on `https://localhost:5173`

## Deploying to Teams

### For Development/Testing

1. **Package the manifest:**
   ```bash
   cd teams
   # Create a ZIP file with manifest.json and color.png
   ```

2. **Upload to Teams:**
   - Open Microsoft Teams
   - Go to Apps → Upload a custom app → Upload for me or my teams
   - Select the ZIP file
   - Add the app to your team or use as personal tab

### For Production Deployment

1. **Update manifest for production:**
   
   Edit `teams/manifest.json` and replace localhost URLs with your production domain:
   ```json
   {
     "developer": {
       "websiteUrl": "https://yourdomain.com",
       "privacyUrl": "https://yourdomain.com/privacy",
       "termsOfUseUrl": "https://yourdomain.com/terms-of-use"
     },
     "configurableTabs": [{
       "configurationUrl": "https://yourdomain.com/config"
     }],
     "staticTabs": [{
       "contentUrl": "https://yourdomain.com/",
       "websiteUrl": "https://yourdomain.com/"
     }],
     "validDomains": ["yourdomain.com"]
   }
   ```

2. **Update environment variables:**
   
   Create `.env.production`:
   ```env
   VITE_CLIENT_ID=e35a467b-be35-4ec1-8fc6-dc7c23cde972
   VITE_TEAMS_APP_ID=e35a467b-be35-4ec1-8fc6-dc7c23cde972
   VITE_TAB_ENDPOINT=https://yourdomain.com
   VITE_TAB_DOMAIN=yourdomain.com
   VITE_GRAPH_RESOURCE=https://vstntechnologies.onmicrosoft.com/e35a467b-be35-4ec1-8fc6-dc7c23cde972
   VITE_START_LOGIN_PAGE_URL=https://yourdomain.com/auth-start
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Deploy to your hosting service:**
   - The built files will be in the `dist` folder
   - Deploy to Azure App Service, Azure Static Web Apps, or any static hosting
   - Ensure HTTPS is enabled

## Azure AD Configuration

Ensure your Azure AD app registration has the correct settings:

### Redirect URIs
Add these redirect URIs in Azure Portal:
- `https://localhost:5173/auth-start` (development)
- `https://yourdomain.com/auth-start` (production)

### API Permissions
Required Microsoft Graph permissions:
- `User.Read`
- `Calendars.Read`
- `Mail.Read`

### Expose an API
1. Set Application ID URI: `https://vstntechnologies.onmicrosoft.com/e35a467b-be35-4ec1-8fc6-dc7c23cde972`
2. Add scope: `access_as_user`
3. Add authorized client applications:
   - Teams Desktop: `1fec8e78-bce4-4aaf-ab1b-5451cc387264`
   - Teams Web: `5e3ce6c0-2b1f-4285-8d4b-75ee78787346`

## Testing the App

### In Teams Desktop/Web
1. Install the app package
2. Add to a team as a configurable tab
3. Or use as a personal tab
4. Sign in when prompted
5. Grant permissions if requested

### Features to Test
- ✅ Personal tab loads correctly
- ✅ Team tab configuration works
- ✅ SSO authentication flows properly
- ✅ Microsoft Graph data displays (profile, calendar)
- ✅ Navigation between pages works
- ✅ Privacy and Terms pages accessible

## Troubleshooting

### Common Issues

1. **"This app can't be reached" error**
   - Ensure SSL certificates are generated
   - Check if dev server is running on https://localhost:5173
   - Verify manifest has correct URLs

2. **Authentication fails**
   - Check Azure AD app configuration
   - Verify redirect URIs match
   - Ensure client ID is correct in .env file

3. **Permissions error**
   - User needs to consent to Graph permissions
   - Check API permissions in Azure AD

4. **Tab doesn't load in Teams**
   - Verify all URLs in manifest use HTTPS
   - Check browser console for errors
   - Ensure valid domains includes your domain

## Support

For issues or questions:
- Check Teams app development docs: https://docs.microsoft.com/microsoftteams/platform/
- Microsoft Graph Toolkit: https://aka.ms/mgt
- Azure AD app registration: https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps