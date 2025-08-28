# Microsoft Teams Client IDs Documentation

## Official Microsoft Documentation

### Primary Sources:

1. **Microsoft Teams Platform - Authentication Documentation**
   - https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-overview
   - Contains information about Teams SSO and client application IDs

2. **Configure Teams Tab SSO**
   - https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-register-aad
   - Section: "Add authorized client application IDs for Teams"

3. **Microsoft Identity Platform - First-party Microsoft applications**
   - https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-first-party-apps
   - Lists all first-party Microsoft application IDs

## Microsoft Teams Client Application IDs

These are the official Microsoft application IDs that need to be authorized for Teams SSO to work:

### Teams Clients:
```
5e3ce6c0-2b1f-4285-8d4b-75ee78787346  # Microsoft Teams Web Client
1fec8e78-bce4-4aaf-ab1b-5451cc387264  # Microsoft Teams Desktop, Mobile and Teams Rooms
```

### Additional Microsoft 365 Clients (Optional):
```
4765445b-32c6-49b0-83e6-1d93765276ca  # Office web
4345a7b9-9a63-4910-a426-35363201d503  # Office web (alternative)
0ec893e0-5785-4de6-99da-4ed124e5296c  # Office desktop
d3590ed6-52b3-4102-aeff-aad2292ab01c  # Microsoft Office client application
bc59ab01-8403-45c6-8796-ac3ef710b3e3  # Outlook web
27922004-5251-4030-b22d-91ecd9a37ea4  # Outlook desktop
```

## Why These Specific IDs?

These are Microsoft's own application registrations in Azure AD. When a user accesses your Teams tab:

1. The Teams client (web or desktop) acts as the OAuth client
2. Teams requests a token from Azure AD using its own client ID
3. The token is for accessing YOUR app's API (the resource)
4. Azure AD checks if Teams (using these client IDs) is authorized to access your API

## Verification

You can verify these are legitimate Microsoft application IDs by:

1. **Using Microsoft Graph Explorer**
   ```
   GET https://graph.microsoft.com/v1.0/servicePrincipals?$filter=appId eq '5e3ce6c0-2b1f-4285-8d4b-75ee78787346'
   ```
   This will return the Microsoft Teams Web Client service principal

2. **Azure Portal**
   - Go to Azure AD → Enterprise applications
   - Search for these application IDs
   - You'll see they're published by Microsoft

## Implementation in Azure Portal

### Step-by-Step:

1. **Navigate to your app registration**
   - Azure Portal → Azure Active Directory → App registrations
   - Select your app

2. **Go to "Expose an API"**

3. **Add a scope** (if not already present):
   - Click "Add a scope"
   - Name: `access_as_user`
   - Who can consent: `Admins and users`
   - State: `Enabled`

4. **Add authorized client applications**:
   - Click "Add a client application"
   - Enter the client ID (e.g., `5e3ce6c0-2b1f-4285-8d4b-75ee78787346`)
   - Check your scope (`access_as_user`)
   - Click "Add application"
   - Repeat for each Teams client ID

## Sample Azure AD Manifest Section

When properly configured, your app's manifest will include:

```json
"preAuthorizedApplications": [
    {
        "appId": "5e3ce6c0-2b1f-4285-8d4b-75ee78787346",
        "delegatedPermissionIds": ["your-scope-id-here"]
    },
    {
        "appId": "1fec8e78-bce4-4aaf-ab1b-5451cc387264",
        "delegatedPermissionIds": ["your-scope-id-here"]
    }
]
```

## Troubleshooting

### Error: "The user or administrator has not consented..."
- **Cause**: Teams client ID not in authorized applications list
- **Solution**: Add the Teams client IDs as shown above

### Error: "invalid_grant"
- **Cause**: Scope not properly defined or not authorized for Teams clients
- **Solution**: Ensure scope exists and is selected for each Teams client

## Security Considerations

- These are Microsoft's official client IDs - safe to authorize
- Only authorize these specific IDs, not arbitrary applications
- The scope limits what Teams can do on behalf of users
- Users still need to consent to your app accessing their data

## References

1. [Microsoft Teams SSO Documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-overview)
2. [Azure AD First-party Apps](https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-first-party-apps)
3. [Teams Tab App Registration](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/tab-sso-register-aad)
4. [Microsoft Identity Platform Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/)

## Quick Reference Card

| Application | Client ID | Required for |
|-------------|-----------|--------------|
| Teams Web | `5e3ce6c0-2b1f-4285-8d4b-75ee78787346` | Teams in browser |
| Teams Desktop/Mobile | `1fec8e78-bce4-4aaf-ab1b-5451cc387264` | Teams desktop app, mobile apps |
| Office Web | `4765445b-32c6-49b0-83e6-1d93765276ca` | Office.com integration |
| Office Desktop | `0ec893e0-5785-4de6-99da-4ed124e5296c` | Office desktop apps |

## Note

Always refer to the official Microsoft documentation for the most up-to-date information, as these IDs are maintained by Microsoft and could potentially change (though they've been stable for years).