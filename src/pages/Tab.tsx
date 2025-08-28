import { useState, useEffect } from 'react';
import { FluentProvider, webLightTheme, Button, Card, CardHeader, Text } from '@fluentui/react-components';
import { useTeams } from '../hooks/useTeams';
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { authConfig } from '../auth/AuthConfig';

export const Tab = () => {
  const { inTeams, context, loading } = useTeams();
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [conversationId, setConversationId] = useState<string>("");
  const [participants, setParticipants] = useState<any[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  useEffect(() => {
    if (inTeams && !loading) {
      getSSOToken();
      getConversationContext();
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

  const getConversationContext = () => {
    // Teams context may have chat or channel info
    if ((context as any)?.chat?.id) {
      setConversationId((context as any).chat.id);
    } else if ((context as any)?.channel?.id) {
      setConversationId((context as any).channel.id);
    } else if ((context as any)?.conversation?.id) {
      // Some contexts may have conversation
      setConversationId((context as any).conversation.id);
    }
  };

  const getParticipants = async () => {
    setLoadingParticipants(true);
    try {
      // For getting conversation members, we need to use Microsoft Graph API
      const credential = new TeamsUserCredential(authConfig);
      const token = await credential.getToken(["Chat.Read"]);
      
      if (token?.token) {
        let endpoint = "";
        
        // Determine the correct endpoint based on context
        if ((context as any)?.chat?.id) {
          // For chat conversations - Chat.Read permission allows this
          endpoint = `https://graph.microsoft.com/v1.0/chats/${(context as any).chat.id}/members`;
        } else if ((context as any)?.team?.groupId && (context as any)?.channel?.id) {
          // For channel conversations - this might need additional permissions
          // Try with Chat.Read first, might work for some scenarios
          endpoint = `https://graph.microsoft.com/v1.0/teams/${(context as any).team.groupId}/channels/${(context as any).channel.id}/members`;
        }
        
        if (endpoint) {
          const response = await fetch(endpoint, {
            headers: {
              Authorization: `Bearer ${token.token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setParticipants(data.value || []);
          } else {
            console.error("Failed to fetch participants:", response.statusText);
            if (response.status === 403) {
              setError("Insufficient permissions. Chat.Read permission may not cover team channels.");
            } else {
              setError(`Failed to fetch participants: ${response.statusText}`);
            }
          }
        }
      }
    } catch (err) {
      console.error("Error getting participants:", err);
      setError("Failed to get conversation participants");
    } finally {
      setLoadingParticipants(false);
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
                <Text size={200} block>Conversation ID: {conversationId || 'N/A'}</Text>
              </div>
            )}
            
            {conversationId && (
              <div style={{ marginTop: '20px' }}>
                <Button 
                  appearance="primary" 
                  onClick={getParticipants}
                  disabled={loadingParticipants}
                >
                  {loadingParticipants ? 'Loading...' : 'Get Participants'}
                </Button>
              </div>
            )}
            
            {participants.length > 0 && (
              <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                <Text size={300} block weight="semibold">Conversation Participants ({participants.length}):</Text>
                {participants.map((participant: any, index: number) => (
                  <div key={index} style={{ marginTop: '5px' }}>
                    <Text size={200} block>
                      • {participant.displayName || participant.email} ({participant.roles?.join(', ') || 'member'})
                    </Text>
                  </div>
                ))}
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