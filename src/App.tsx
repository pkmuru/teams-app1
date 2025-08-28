import { useState, useEffect } from 'react';
import { FluentProvider, webLightTheme, Button, Card, CardHeader, Text } from '@fluentui/react-components';
import { useTeams } from './hooks/useTeams';
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { authConfig } from './auth/AuthConfig';

function App() {
  const { inTeams, context, loading } = useTeams();
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [needConsent, setNeedConsent] = useState(false);

  useEffect(() => {
    if (inTeams && !loading) {
      getSSOToken();
    }
  }, [inTeams, loading]);

  const getSSOToken = async () => {
    try {
      const credential = new TeamsUserCredential(authConfig);
      const token = await credential.getToken(["User.Read"]);
      
      if (token && token.token) {
        // Get user info from token
        const userInfo = await credential.getUserInfo();
        setUserName(userInfo.displayName || userInfo.preferredUserName || "User");
        setError("");
      }
    } catch (err: any) {
      console.error("SSO Error:", err);
      if (err.message?.includes("consent")) {
        setNeedConsent(true);
        setError("Please grant permissions to continue");
      } else {
        setError("Authentication failed. Please try again.");
      }
    }
  };

  const handleConsent = async () => {
    try {
      const credential = new TeamsUserCredential(authConfig);
      await credential.login(["User.Read"]);
      await getSSOToken();
      setNeedConsent(false);
    } catch (err) {
      console.error("Consent error:", err);
      setError("Failed to complete consent flow");
    }
  };

  if (loading) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div style={{ padding: '20px' }}>
          <Text>Loading...</Text>
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px' }}>
        <Card>
          <CardHeader
            header={<Text size={500} weight="semibold">STAAT Assist</Text>}
          />
          <div style={{ padding: '20px' }}>
            {inTeams ? (
              <>
                <Text block style={{ marginBottom: '10px' }}>
                  ✅ Running in Microsoft Teams
                </Text>
                {userName ? (
                  <Text block size={400}>
                    Hello, <strong>{userName}</strong>! 👋
                  </Text>
                ) : (
                  <Text block>Authenticating...</Text>
                )}
                {context && (
                  <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <Text size={200} block>Team: {context.team?.displayName || 'Personal'}</Text>
                    <Text size={200} block>Channel: {context.channel?.displayName || 'N/A'}</Text>
                  </div>
                )}
              </>
            ) : (
              <Text block>
                ⚠️ This app needs to run inside Microsoft Teams
              </Text>
            )}
            
            {error && (
              <div style={{ marginTop: '20px' }}>
                <Text style={{ color: 'red' }}>{error}</Text>
                {needConsent && (
                  <div style={{ marginTop: '10px' }}>
                    <Button appearance="primary" onClick={handleConsent}>
                      Grant Permissions
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
}

export default App;