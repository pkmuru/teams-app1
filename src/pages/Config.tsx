import { useEffect, useState } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { FluentProvider, webLightTheme, Input, Card, CardHeader, Text, Field } from '@fluentui/react-components';

export const Config = () => {
  const [tabName, setTabName] = useState('Hello World Tab');

  useEffect(() => {
    // Initialize Teams SDK
    microsoftTeams.app.initialize().then(() => {
      // Register save handler
      microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
        // Configure the tab
        microsoftTeams.pages.config.setConfig({
          entityId: 'hello-world-tab',
          contentUrl: `${window.location.origin}/tab`,
          websiteUrl: `${window.location.origin}/tab`,
          suggestedDisplayName: tabName,
        });
        saveEvent.notifySuccess();
      });

      // Enable Save button
      microsoftTeams.pages.config.setValidityState(true);
    });
  }, []);

  useEffect(() => {
    // Update validity when tab name changes
    if (microsoftTeams.app.isInitialized()) {
      microsoftTeams.pages.config.setValidityState(tabName.length > 0);
    }
  }, [tabName]);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px' }}>
        <Card>
          <CardHeader
            header={<Text size={500} weight="semibold">Configure Tab</Text>}
          />
          <div style={{ padding: '20px' }}>
            <Field label="Tab Name" required>
              <Input
                value={tabName}
                onChange={(_, data) => setTabName(data.value)}
                placeholder="Enter tab name"
              />
            </Field>
            <Text size={200} block style={{ marginTop: '10px' }}>
              This will be the name of your tab in the channel.
            </Text>
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
};