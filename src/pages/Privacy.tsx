import { Card, CardHeader, Text } from '@fluentui/react-components';

export const Privacy = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <CardHeader header={<Text size={600} weight="bold">Privacy Policy</Text>} />
        <div style={{ padding: '20px' }}>
          <Text block>
            This is a test application for Microsoft Teams. 
            We only access the data you explicitly grant permissions for through Microsoft Teams and Azure AD.
            No data is stored outside of your Microsoft 365 tenant.
          </Text>
        </div>
      </Card>
    </div>
  );
};