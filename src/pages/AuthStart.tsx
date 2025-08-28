import { useEffect } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

export const AuthStart = () => {
  useEffect(() => {
    // Initialize Teams SDK
    microsoftTeams.app.initialize().then(() => {
      // Notify Teams that authentication succeeded
      microsoftTeams.authentication.notifySuccess();
    }).catch((error) => {
      // Notify Teams that authentication failed
      microsoftTeams.authentication.notifyFailure(error.message);
    });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Authenticating...</h2>
      <p>Please wait while we complete the authentication.</p>
    </div>
  );
};