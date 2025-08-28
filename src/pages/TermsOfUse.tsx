import { FluentProvider, webLightTheme, Card, CardHeader, Text, Link } from '@fluentui/react-components';

export const TermsOfUse = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Card>
          <CardHeader
            header={<Text size={600} weight="bold">Terms of Use</Text>}
            description={<Text size={300}>Effective Date: {new Date().toLocaleDateString()}</Text>}
          />
          
          <div style={{ padding: '20px' }}>
            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                1. Acceptance of Terms
              </Text>
              <Text block>
                By accessing and using this Microsoft Teams application ("the App"), you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to these terms, 
                please do not use this application.
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                2. Use License
              </Text>
              <Text block style={{ marginBottom: '12px' }}>
                Permission is granted to use this application for personal and commercial use within your 
                Microsoft Teams environment, subject to the following restrictions:
              </Text>
              <ul style={{ marginLeft: '20px' }}>
                <li>You may not modify, reverse engineer, or attempt to extract the source code</li>
                <li>You may not use this application for any unlawful purpose</li>
                <li>You may not transmit any malicious code or content through the application</li>
                <li>You must comply with all applicable Microsoft Teams policies and guidelines</li>
              </ul>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                3. Microsoft Graph Permissions
              </Text>
              <Text block>
                This application requests the following Microsoft Graph permissions:
              </Text>
              <ul style={{ marginLeft: '20px' }}>
                <li><strong>User.Read</strong> - Read your profile information</li>
                <li><strong>Calendars.Read</strong> - Read your calendar events</li>
                <li><strong>Mail.Read</strong> - Read your email messages</li>
              </ul>
              <Text block style={{ marginTop: '12px' }}>
                You may revoke these permissions at any time through your Microsoft 365 admin center.
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                4. Data Usage
              </Text>
              <Text block>
                - All data accessed through Microsoft Graph remains within your tenant<br/>
                - We do not store personal information on external servers<br/>
                - Authentication is handled entirely by Microsoft's identity platform<br/>
                - For detailed information, please refer to our <Link href="/privacy">Privacy Policy</Link>
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                5. Disclaimer
              </Text>
              <Text block>
                THE APPLICATION IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
                PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
                FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY.
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                6. Limitations
              </Text>
              <Text block>
                In no event shall our company or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising out 
                of the use or inability to use this application.
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                7. Governing Law
              </Text>
              <Text block>
                These terms shall be governed and construed in accordance with the laws of your jurisdiction, 
                without regard to its conflict of law provisions. Our failure to enforce any right or provision 
                of these terms will not be considered a waiver of those rights.
              </Text>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                8. Changes to Terms
              </Text>
              <Text block>
                We reserve the right to modify or replace these terms at any time. If a revision is material, 
                we will provide notice within the application prior to any new terms taking effect.
              </Text>
            </section>

            <section>
              <Text size={400} weight="semibold" block style={{ marginBottom: '12px' }}>
                9. Contact Information
              </Text>
              <Text block>
                If you have any questions about these Terms of Use, please contact us at:<br/>
                Email: legal@vstntechnologies.onmicrosoft.com<br/>
                <Link href="mailto:legal@vstntechnologies.onmicrosoft.com">Send us an email</Link>
              </Text>
            </section>
          </div>
        </Card>
      </div>
    </FluentProvider>
  );
};