import { useEffect, useState } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { FluentProvider, webLightTheme, Button, Card, CardHeader, Text, Spinner } from '@fluentui/react-components';
import { Person, Agenda } from '@microsoft/mgt-react';
import { useTeamsAuth } from '../auth/AuthProvider';

export const Tab = () => {
  const [inTeams, setInTeams] = useState(false);
  const [context, setContext] = useState<microsoftTeams.app.Context | null>(null);
  const { loading, error, isAuthenticated, login, consent } = useTeamsAuth();

  useEffect(() => {
    microsoftTeams.app.initialize().then(() => {
      setInTeams(true);
      microsoftTeams.app.getContext().then((context) => {
        setContext(context);
      });
    }).catch(() => {
      setInTeams(false);
    });
  }, []);

  if (loading) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner size="large" label="Initializing Teams tab..." />
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Card>
          <CardHeader
            header={<Text size={500} weight="semibold">Teams Tab - {context?.channel?.displayName || 'Channel'}</Text>}
            description={
              <Text size={200}>
                {inTeams ? `Team: ${context?.team?.displayName || 'Unknown'} | Tenant: ${context?.user?.tenant?.id || 'Unknown'}` : 'Running outside Teams'}
              </Text>
            }
          />
          
          <div style={{ padding: '20px' }}>
            {!isAuthenticated ? (
              <div style={{ textAlign: 'center' }}>
                <Text block style={{ marginBottom: '20px' }}>
                  Please sign in to access your Microsoft 365 data
                </Text>
                <Button appearance="primary" onClick={login}>
                  Sign In with Microsoft
                </Button>
                {error && (
                  <div style={{ marginTop: '20px' }}>
                    <Text style={{ color: 'red' }}>{error}</Text>
                    {error.includes('consent') && (
                      <div style={{ marginTop: '10px' }}>
                        <Button appearance="secondary" onClick={consent}>
                          Grant Permissions
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                <div>
                  <Card>
                    <CardHeader header={<Text size={400} weight="semibold">Your Profile</Text>} />
                    <div style={{ padding: '16px' }}>
                      <Person personQuery="me" view="twolines" showPresence={true} />
                    </div>
                  </Card>
                  
                  {context && (
                    <Card style={{ marginTop: '20px' }}>
                      <CardHeader header={<Text size={400} weight="semibold">Team Context</Text>} />
                      <div style={{ padding: '16px' }}>
                        <Text size={200} block>
                          <strong>Team:</strong> {context.team?.displayName || 'Personal'}
                        </Text>
                        <Text size={200} block>
                          <strong>Channel:</strong> {context.channel?.displayName || 'N/A'}
                        </Text>
                        <Text size={200} block>
                          <strong>User:</strong> {context.user?.userPrincipalName || 'Unknown'}
                        </Text>
                      </div>
                    </Card>
                  )}
                </div>
                
                <div>
                  <Card>
                    <CardHeader 
                      header={<Text size={400} weight="semibold">Your Calendar Events</Text>}
                      description={<Text size={200}>Upcoming events from Microsoft 365</Text>}
                    />
                    <div style={{ padding: '16px' }}>
                      <Agenda />
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
};