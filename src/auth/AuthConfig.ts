import type { TeamsUserCredentialAuthConfig } from "@microsoft/teamsfx";
import { APP_CONFIG } from "../config/app.config";

export const authConfig: TeamsUserCredentialAuthConfig = {
  clientId: APP_CONFIG.CLIENT_ID,
  initiateLoginEndpoint: APP_CONFIG.AUTH_START_URL,
};

// Export tenant ID separately for use where needed
export const tenantId = APP_CONFIG.TENANT_ID;

export const graphScopes = APP_CONFIG.GRAPH_SCOPES;

export const loginRequest = {
  scopes: graphScopes,
};