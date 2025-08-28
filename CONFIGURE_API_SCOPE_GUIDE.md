# How to Configure API Scope in Azure AD for Teams SSO

## Step-by-Step Guide

### 1. Navigate to Your App Registration
- Go to [Azure Portal](https://portal.azure.com)
- Azure Active Directory → App registrations
- Click on your app: `e5e970b8-16d9-4194-ae15-4c6101ffed4f`

### 2. Go to "Expose an API"
- In the left menu, click on **"Expose an API"**

### 3. Set Application ID URI (if not already set)
- At the top, you should see "Application ID URI"
- It should already be: `api://e5e970b8-16d9-4194-ae15-4c6101ffed4f`
- If not set, click "Set" and use one of these formats:
  - `api://e5e970b8-16d9-4194-ae15-4c6101ffed4f` (recommended for production)
  - `api://localhost:5173/e5e970b8-16d9-4194-ae15-4c6101ffed4f` (for local development only)

### 4. Add a Scope
Click **"+ Add a scope"** and fill in these EXACT values:

#### Scope Configuration Values:

| Field | Value to Enter |
|-------|---------------|
| **Scope name** | `access_as_user` |
| **Who can consent?** | Select: `Admins and users` |
| **Admin consent display name** | `Access Teams Tab App` |
| **Admin consent description** | `Allows Teams to access the app on behalf of the signed-in user.` |
| **User consent display name** | `Access Teams Tab App` |
| **User consent description** | `Allows Teams to access the app on your behalf.` |
| **State** | `Enabled` |

### 5. Save the Scope
- Click **"Add scope"** button at the bottom

### 6. Your Scope ID
After saving, you'll see your scope listed as:
```
api://e5e970b8-16d9-4194-ae15-4c6101ffed4f/access_as_user
```

This is the full scope identifier that Teams will request.

## Visual Guide - What Each Field Means

```
Scope name: access_as_user
├── This is the standard name Teams expects for SSO
└── Don't change this - Teams looks for this specific scope

Who can consent: Admins and users
├── Allows both admins and regular users to grant permission
└── If you select "Admins only", users will need admin approval

Admin consent display name: "Access Teams Tab App"
├── What admins see when reviewing permissions
└── Should clearly identify your app

Admin consent description: 
├── Detailed explanation for administrators
└── Helps them understand what access is being granted

User consent display name: "Access Teams Tab App"
├── What regular users see in the consent dialog
└── Keep it simple and clear

User consent description:
├── Explanation for end users
└── Should be easy to understand

State: Enabled
├── Must be enabled for the scope to work
└── Disabled scopes cannot be used
```

## After Adding the Scope

### Add Authorized Client Applications
Still in "Expose an API", scroll down to **"Authorized client applications"**:

1. Click **"+ Add a client application"**
2. Add Teams Web Client:
   - Application (client) ID: `5e3ce6c0-2b1f-4285-8d4b-75ee78787346`
   - Check the box next to: `api://e5e970b8-16d9-4194-ae15-4c6101ffed4f/access_as_user`
   - Click "Add application"

3. Repeat for Teams Desktop/Mobile:
   - Application (client) ID: `1fec8e78-bce4-4aaf-ab1b-5451cc387264`
   - Check the box next to: `api://e5e970b8-16d9-4194-ae15-4c6101ffed4f/access_as_user`
   - Click "Add application"

## Complete Configuration Example

When done correctly, your "Expose an API" page should show:

```
Application ID URI: api://e5e970b8-16d9-4194-ae15-4c6101ffed4f

Scopes defined by this API:
┌─────────────────────────────────────────────────────────────┐
│ api://e5e970b8-16d9-4194-ae15-4c6101ffed4f/access_as_user │
│ State: Enabled                                              │
│ Who can consent: Admins and users                          │
└─────────────────────────────────────────────────────────────┘

Authorized client applications:
┌─────────────────────────────────────────────────────────────┐
│ 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 (Teams Web)          │
│ ✓ access_as_user                                           │
├─────────────────────────────────────────────────────────────┤
│ 1fec8e78-bce4-4aaf-ab1b-5451cc387264 (Teams Desktop)      │
│ ✓ access_as_user                                           │
└─────────────────────────────────────────────────────────────┘
```

## Important Notes

1. **Scope Name Must Be `access_as_user`**
   - This is the standard scope name Teams expects
   - Using a different name will cause SSO to fail

2. **Who Can Consent**
   - "Admins and users" is recommended for most Teams apps
   - "Admins only" requires IT admin approval for each user

3. **Authorized Clients Are Required**
   - Without adding Teams client IDs, you'll get consent errors
   - These pre-authorize Teams to use your API

## Troubleshooting

### If you see "invalid_grant" or "consent_required":
- Check that the scope is named exactly `access_as_user`
- Verify the scope is Enabled
- Ensure Teams client IDs are in authorized applications
- Make sure the scope checkbox is checked for each client

### If SSO still fails:
1. Clear browser cache
2. Sign out of Teams completely
3. Sign back in and try again
4. Check that your manifest.json has the correct resource URI

## Testing Your Configuration

After configuration, test in Teams:
1. Reload your Teams tab
2. You should NOT see a consent prompt (because Teams is pre-authorized)
3. SSO should work automatically
4. Check browser console for any errors

## Reference
- [Microsoft Docs: Register your tab app in Azure AD](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-register-aad)
- [Configure scope for SSO](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-register-aad#configure-scope-for-access-token)