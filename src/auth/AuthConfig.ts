import type { TeamsUserCredentialAuthConfig } from "@microsoft/teamsfx";

export const authConfig: TeamsUserCredentialAuthConfig = {
  clientId: import.meta.env.VITE_CLIENT_ID,
  initiateLoginEndpoint: import.meta.env.VITE_START_LOGIN_PAGE_URL,
};

export const graphScopes = ["User.Read", "Calendars.Read", "Mail.Read"];

export const loginRequest = {
  scopes: graphScopes,
};