# Microsoft Teams Tab App - Complete Setup Guide

## Working Configuration

### Azure AD App Registration
- **Tenant ID**: `6eecebc8-a09d-43a7-9d34-8dde9af1c5a4`
- **Client ID**: `e5e970b8-16d9-4194-ae15-4c6101ffed4f`
- **Application ID URI**: `api://localhost:5173/e5e970b8-16d9-4194-ae15-4c6101ffed4f`

### Teams App
- **Teams App ID**: `e35a467b-be35-4ec1-8fc6-dc7c23cde972`
- **Current Version**: `1.0.3`

## Azure AD Setup (Portal Configuration)

### 1. Authentication
- **Platform**: Single-page application
- **Redirect URIs**:
  - `https://localhost:5173/auth-start`
  - `https://localhost:5173/blank-auth-end.html`
  - `https://localhost:5173/`
- **Enable**: Access tokens & ID tokens

### 2. Expose an API
- **Application ID URI**: `api://localhost:5173/e5e970b8-16d9-4194-ae15-4c6101ffed4f`
- **Scope**: 
  - Name: `access_as_user`
  - Who can consent: `Admins and users`
  - State: `Enabled`

### 3. Authorized Client Applications
Add these Microsoft Teams client IDs:
- `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` (Teams Web)
- `1fec8e78-bce4-4aaf-ab1b-5451cc387264` (Teams Desktop/Mobile)

For each client, enable the `access_as_user` scope.

### 4. API Permissions
- Microsoft Graph: `User.Read` (Delegated)

## Local Development

### 1. Run the App
```bash
npm run dev
```
The app runs on `https://localhost:5173` with auto-generated SSL certificates.

### 2. Package for Teams
```bash
cd teams
# Create ZIP with manifest.json, color.png, outline.png
```

### 3. Upload to Teams
- Go to Teams → Apps → "Upload a custom app"
- Select your ZIP file
- Add as personal tab or to a team

## File Structure

```
src/
├── config/
│   └── app.config.ts       # All configuration constants
├── auth/
│   └── AuthConfig.ts       # Authentication configuration
├── hooks/
│   └── useTeams.tsx        # Teams context hook
├── pages/
│   ├── Tab.tsx             # Main tab page
│   ├── Config.tsx          # Tab configuration page
│   ├── Privacy.tsx         # Privacy policy
│   ├── TermsOfUse.tsx      # Terms of use
│   └── AuthStart.tsx       # Auth callback
├── App.tsx                 # Home page with SSO
└── main.tsx               # Router configuration
```

## Important Notes

### For Local Development
- Application ID URI must include `localhost:5173`
- Format: `api://localhost:5173/[client-id]`

### For Production Deployment
- Change Application ID URI to your production domain
- Format: `api://yourdomain.com/[client-id]`
- Update all URLs in manifest.json

### Common Issues & Solutions

1. **"App resource defined in manifest and iframe origin do not match"**
   - Solution: Application ID URI must include the domain where app is running
   - For localhost: `api://localhost:5173/[client-id]`

2. **"The user or administrator has not consented"**
   - Solution: Add Teams client IDs as authorized applications in Azure AD

3. **Cache Issues**
   - Always increment version number in manifest.json
   - Test in incognito mode first
   - Clear Teams cache if needed (see CLEAR_TEAMS_CACHE.md)

## Testing SSO

1. Open Teams tab
2. Check browser console for errors
3. User should be automatically signed in
4. If prompted for consent, grant permissions

## Build for Production

```bash
npm run build
```
Files will be in `dist/` folder.

## Support Resources

- [Teams Tab Authentication](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-overview)
- [Register App in Azure AD](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-register-aad)
- [Microsoft Graph Toolkit](https://aka.ms/mgt)