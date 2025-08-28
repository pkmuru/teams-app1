import { useEffect, useState } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { FluentProvider, webLightTheme, Input, Card, CardHeader, Text, Field } from '@fluentui/react-components';

export const Config = () => {
  const [tabName, setTabName] = useState('My Teams Tab');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    microsoftTeams.app.initialize().then(() => {
      microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
        const contentUrl = `${window.location.origin}/tab`;
        const websiteUrl = `${window.location.origin}/tab`;
        
        microsoftTeams.pages.config.setConfig({
          entityId: 'unique-entity-id',
          contentUrl: contentUrl,
          websiteUrl: websiteUrl,
          suggestedDisplayName: tabName,
        });
        
        saveEvent.notifySuccess();
      });

      microsoftTeams.pages.config.setValidityState(true);
    });
  }, [tabName]);

  useEffect(() => {
    if (tabName && tabName.trim().length > 0) {
      setIsValid(true);
      microsoftTeams.pages.config.setValidityState(true);
    } else {
      setIsValid(false);
      microsoftTeams.pages.config.setValidityState(false);
    }
  }, [tabName]);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Card>
          <CardHeader
            header={<Text size={500} weight="semibold">Configure Your Tab</Text>}
            description={<Text size={200}>Set up your Teams tab with a custom name</Text>}
          />
          
          <div style={{ padding: '20px' }}>
            <Field
              label="Tab Name"
              required
              validationMessage={!isValid ? "Tab name is required" : ""}
              validationState={!isValid && tabName === '' ? "error" : "none"}
            >
              <Input
                value={tabName}
                onChange={(_, data) => setTabName(data.value)}
                placeholder="Enter tab name"
              />
            </Field>
            
            <div style={{ marginTop: '20px' }}>
              <Text size={200}>
                This tab will be added to your team channel with the name: <strong>{tabName || '(empty)'}</strong>
              </Text>
            </div>
            
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
              <Text size={200}>
                Note: Click 'Save' in the Teams dialog to add this tab to your channel.
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
};