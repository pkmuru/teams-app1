import { Card, CardHeader, Text } from '@fluentui/react-components';

export const TermsOfUse = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <CardHeader header={<Text size={600} weight="bold">Terms of Use</Text>} />
        <div style={{ padding: '20px' }}>
          <Text block>
            This is a test application for Microsoft Teams. 
            By using this app, you agree to use it in accordance with your organization's policies 
            and Microsoft Teams terms of service.
          </Text>
        </div>
      </Card>
    </div>
  );
};