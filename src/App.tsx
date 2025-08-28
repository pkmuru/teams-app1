import { useEffect, useState } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { FluentProvider, webLightTheme, Button, Card, CardHeader, Text, Spinner } from '@fluentui/react-components';
import { Person, Agenda } from '@microsoft/mgt-react';
import { useTeamsAuth } from './auth/AuthProvider';
import './App.css';

function App() {
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
          <Spinner size="large" label="Initializing Teams app..." />
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <CardHeader
            header={<Text size={500} weight="semibold">Teams Tab App with SSO</Text>}
            description={
              <Text size={200}>
                {inTeams ? `Running in Teams (${context?.app?.host?.name || 'Unknown'})` : 'Running outside Teams'}
              </Text>
            }
          />
          
          <div style={{ padding: '20px' }}>
            {!isAuthenticated ? (
              <div style={{ textAlign: 'center' }}>
                <Text block style={{ marginBottom: '20px' }}>
                  Please sign in to access Microsoft Graph data
                </Text>
                <Button appearance="primary" onClick={login}>
                  Sign In
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
              <div>
                <div style={{ marginBottom: '30px' }}>
                  <Text size={400} weight="semibold" block style={{ marginBottom: '10px' }}>
                    Your Profile
                  </Text>
                  <Person personQuery="me" view="threelines" />
                </div>
                
                <div>
                  <Text size={400} weight="semibold" block style={{ marginBottom: '10px' }}>
                    Your Calendar
                  </Text>
                  <Agenda />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
}

export default App;