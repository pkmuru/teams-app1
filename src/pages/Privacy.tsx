import { FluentProvider, webLightTheme, Card, CardHeader, Text, Link } from '@fluentui/react-components';

export const Privacy = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <CardHeader
            header={<Text size={600} weight="bold">Privacy Policy</Text>}
            description={<Text size={300}>Last updated: {new Date().toLocaleDateString()}</Text>}
          />
          
          <div style={{ padding: '20px' }}>
            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                1. Information We Collect
              </Text>
              <Text block style={{ marginBottom: '12px' }}>
                This Teams application collects the following information when you use it:
              </Text>
              <ul style={{ marginLeft: '20px' }}>
                <li>User profile information from Microsoft Graph (name, email, profile picture)</li>
                <li>Calendar information (if calendar permissions are granted)</li>
                <li>Teams context information (team ID, channel ID, tenant ID)</li>
              </ul>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                2. How We Use Your Information
              </Text>
              <Text block>
                The information collected is used solely to:
              </Text>
              <ul style={{ marginLeft: '20px' }}>
                <li>Provide personalized content within the Teams tab</li>
                <li>Display your calendar events and profile information</li>
                <li>Authenticate your identity within Microsoft Teams</li>
              </ul>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                3. Data Storage and Security
              </Text>
              <Text block>
                - All data is processed in real-time and is not stored on our servers<br/>
                - Authentication tokens are managed securely by Microsoft Teams<br/>
                - We follow Microsoft's security best practices for Teams applications
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                4. Data Sharing
              </Text>
              <Text block>
                We do not share, sell, or transfer your personal information to third parties. 
                All data remains within your Microsoft 365 tenant.
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                5. Your Rights
              </Text>
              <Text block>
                You have the right to:
              </Text>
              <ul style={{ marginLeft: '20px' }}>
                <li>Revoke permissions granted to this application</li>
                <li>Request deletion of any cached information</li>
                <li>Access information about what data is being accessed</li>
              </ul>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                6. Contact Information
              </Text>
              <Text block>
                For privacy-related questions or concerns, please contact:<br/>
                Email: privacy@vstntechnologies.onmicrosoft.com<br/>
                <Link href="mailto:privacy@vstntechnologies.onmicrosoft.com">Send us an email</Link>
              </Text>
            </section>

            <section>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                7. Changes to This Policy
              </Text>
              <Text block>
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new privacy policy within the application.
              </Text>
            </section>
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
};