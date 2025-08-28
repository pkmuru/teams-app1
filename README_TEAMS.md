# Teams Tab App Setup

This React app has been configured as a Microsoft Teams tab application with Single Sign-On (SSO).

## Configuration

The app uses the following Azure AD configuration:
- Client ID: `e35a467b-be35-4ec1-8fc6-dc7c23cde972`
- Resource: `https://vstntechnologies.onmicrosoft.com/e35a467b-be35-4ec1-8fc6-dc7c23cde972`

## Project Structure

```
├── src/
│   ├── auth/
│   │   ├── AuthConfig.ts      # Azure AD authentication configuration
│   │   └── AuthProvider.tsx   # Teams authentication hook
│   ├── pages/
│   │   └── AuthStart.tsx      # Authentication redirect page
│   └── App.tsx                 # Main app with Teams integration
├── teams/
│   └── manifest.json           # Teams app manifest
└── .env                        # Environment variables
```

## Features

- Single Sign-On (SSO) with Microsoft Teams
- Microsoft Graph integration
- Fluent UI components
- User profile display
- Calendar integration

## Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate SSL certificates (required for Teams):**
   ```bash
   npx mkcert create-ca
   npx mkcert create-cert
   ```
   Rename the generated files to:
   - `localhost.pem` (certificate)
   - `localhost-key.pem` (private key)

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will run on https://localhost:5173

## Deploying to Teams

1. **Update the manifest:**
   - Replace `{{TEAMS_APP_ID}}` with your actual Teams app ID
   - Replace `{{TAB_ENDPOINT}}` with your production URL
   - Replace `{{TAB_DOMAIN}}` with your production domain
   - Replace `{{CLIENT_ID}}` with your Azure AD app client ID

2. **Package the Teams app:**
   - Create a ZIP file containing the `manifest.json` and icon files from the `teams` folder

3. **Upload to Teams:**
   - Go to Teams > Apps > Upload a custom app
   - Upload the ZIP file
   - Add the app to a team or use as a personal tab

## Authentication Flow

1. App initializes Teams SDK
2. Attempts to get token using TeamsFx
3. If consent needed, prompts user to grant permissions
4. Once authenticated, displays Microsoft Graph data

## Required Azure AD Permissions

The app requests the following Microsoft Graph scopes:
- `User.Read` - Read user profile
- `Calendars.Read` - Read user calendar
- `Mail.Read` - Read user mail

## Troubleshooting

- **Authentication fails:** Ensure the Azure AD app is configured with the correct redirect URIs
- **HTTPS errors:** Make sure you have valid SSL certificates for local development
- **Teams doesn't load the tab:** Check that the manifest is correctly configured with your app details