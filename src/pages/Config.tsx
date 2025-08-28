import { useEffect } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { FluentProvider, webLightTheme, Card, CardHeader, Text } from '@fluentui/react-components';
import { Checkmark20Filled } from '@fluentui/react-icons';

export const Config = () => {
  useEffect(() => {
    // Initialize Teams SDK
    microsoftTeams.app.initialize().then(() => {
      // Register save handler
      microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
        // Configure the tab with fixed name
        microsoftTeams.pages.config.setConfig({
          entityId: 'staat-assist-tab',
          contentUrl: `${window.location.origin}/#/tab`,
          websiteUrl: `${window.location.origin}/#/tab`,
          suggestedDisplayName: 'STAAT Assist',
        });
        saveEvent.notifySuccess();
      });

      // Enable Save button immediately
      microsoftTeams.pages.config.setValidityState(true);
    });
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px' }}>
        <Card>
          <CardHeader
            header={<Text size={500} weight="semibold">Add STAAT Assist to Your Channel</Text>}
          />
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <Checkmark20Filled style={{ color: '#107c10', fontSize: '48px', marginBottom: '16px' }} />
            <Text size={400} block style={{ marginBottom: '16px' }}>
              <strong>STAAT Assist</strong> is ready to be added to your channel!
            </Text>
            <Text size={300} block style={{ color: '#605e5c' }}>
              Click "Save" below to add STAAT Assist to this channel.
            </Text>
            <Text size={300} block style={{ marginTop: '16px', color: '#605e5c' }}>
              Your team members will be able to access STAAT Assist directly from this tab.
            </Text>
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
};