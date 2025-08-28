/**
 * Application Configuration
 * These are static values for the Teams app and Azure AD integration
 */

export const APP_CONFIG = {
  // Azure AD Tenant Configuration
  TENANT_ID: "6eecebc8-a09d-43a7-9d34-8dde9af1c5a4",
  
  // Azure AD App (Service Principal) Configuration
  CLIENT_ID: "e5e970b8-16d9-4194-ae15-4c6101ffed4f",
  
  // Teams App ID from manifest
  TEAMS_APP_ID: "e35a467b-be35-4ec1-8fc6-dc7c23cde972",
  
  // Application ID URI from Azure AD
  RESOURCE_URI: "api://localhost:5173/e5e970b8-16d9-4194-ae15-4c6101ffed4f",
  
  // App URLs
  APP_URL: "https://localhost:5173",
  AUTH_START_URL: "https://localhost:5173/auth-start",
  
  // Graph Scopes
  GRAPH_SCOPES: ["User.Read"],
} as const;