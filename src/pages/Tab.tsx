import { useState, useEffect } from 'react';
import { FluentProvider, webLightTheme, Button, Card, CardHeader, Text } from '@fluentui/react-components';
import { useTeams } from '../hooks/useTeams';
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { authConfig } from '../auth/AuthConfig';

export const Tab = () => {
  const { inTeams, context, loading } = useTeams();
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (inTeams && !loading) {
      getSSOToken();
    }
  }, [inTeams, loading]);

  const getSSOToken = async () => {
    try {
      const credential = new TeamsUserCredential(authConfig);
      const userInfo = await credential.getUserInfo();
      setUserName(userInfo.displayName || userInfo.preferredUserName || "User");
      setError("");
    } catch (err: any) {
      console.error("SSO Error:", err);
      setError("Please configure SSO in your Azure AD app");
    }
  };

  const handleLogin = async () => {
    try {
      const credential = new TeamsUserCredential(authConfig);
      await credential.login(["User.Read"]);
      await getSSOToken();
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed");
    }
  };

  if (loading) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div style={{ padding: '20px' }}>
          <Text>Loading Teams context...</Text>
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
            <Text block size={400}>
              {userName ? `Hello, ${userName}! 👋` : 'Welcome to Teams Tab!'}
            </Text>
            
            {context && (
              <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <Text size={300} block weight="semibold">Teams Context:</Text>
                <Text size={200} block>Team: {context.team?.displayName || 'Personal App'}</Text>
                <Text size={200} block>Channel: {context.channel?.displayName || 'N/A'}</Text>
                <Text size={200} block>User: {context.user?.userPrincipalName}</Text>
              </div>
            )}
            
            {error && (
              <div style={{ marginTop: '20px' }}>
                <Text style={{ color: 'red' }}>{error}</Text>
                <div style={{ marginTop: '10px' }}>
                  <Button appearance="primary" onClick={handleLogin}>
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
};