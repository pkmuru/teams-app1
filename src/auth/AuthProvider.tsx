import { TeamsUserCredential } from "@microsoft/teamsfx";
import { TeamsFxProvider } from "@microsoft/mgt-teamsfx-provider";
import { Providers, ProviderState } from "@microsoft/mgt-element";
import { useEffect, useState } from "react";
import { authConfig, graphScopes } from "./AuthConfig";

export const useTeamsAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credential, setCredential] = useState<TeamsUserCredential | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const teamsCredential = new TeamsUserCredential(authConfig);
        setCredential(teamsCredential);

        const provider = new TeamsFxProvider(teamsCredential, graphScopes);
        Providers.globalProvider = provider;

        Providers.globalProvider.onStateChanged(() => {
          setIsAuthenticated(Providers.globalProvider.state === ProviderState.SignedIn);
        });

        await teamsCredential.getToken(graphScopes);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Authentication error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async () => {
    if (!credential) return;
    
    try {
      setLoading(true);
      await credential.login(graphScopes);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const consent = async () => {
    if (!credential) return;
    
    try {
      setLoading(true);
      await credential.getToken(graphScopes);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      console.error("Consent error:", err);
      setError(err instanceof Error ? err.message : "Consent failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isAuthenticated,
    login,
    consent,
    credential
  };
};