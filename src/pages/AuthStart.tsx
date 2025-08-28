import { useEffect } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

export const AuthStart = () => {
  useEffect(() => {
    microsoftTeams.app.initialize().then(() => {
      microsoftTeams.authentication.getAuthToken()
        .then((result) => {
          microsoftTeams.authentication.notifySuccess(result);
        })
        .catch((error) => {
          microsoftTeams.authentication.notifyFailure(error);
        });
    });
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Authenticating...</h2>
      <p>Please wait while we sign you in.</p>
    </div>
  );
};