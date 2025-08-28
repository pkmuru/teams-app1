import { Outlet, Link, useLocation } from 'react-router-dom';
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';
import { Home20Regular, Shield20Regular, Document20Regular } from '@fluentui/react-icons';

export const Layout = () => {
  const location = useLocation();
  const showNavigation = !['/config', '/auth-start'].includes(location.pathname);

  return (
    <FluentProvider theme={webLightTheme}>
      {showNavigation && (
        <nav style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '10px 20px', 
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button 
              icon={<Home20Regular />} 
              appearance={location.pathname === '/' ? 'primary' : 'subtle'}
            >
              Home
            </Button>
          </Link>
          <Link to="/tab" style={{ textDecoration: 'none' }}>
            <Button 
              appearance={location.pathname === '/tab' ? 'primary' : 'subtle'}
            >
              Tab
            </Button>
          </Link>
          <Link to="/privacy" style={{ textDecoration: 'none' }}>
            <Button 
              icon={<Shield20Regular />}
              appearance={location.pathname === '/privacy' ? 'primary' : 'subtle'}
            >
              Privacy
            </Button>
          </Link>
          <Link to="/terms-of-use" style={{ textDecoration: 'none' }}>
            <Button 
              icon={<Document20Regular />}
              appearance={location.pathname === '/terms-of-use' ? 'primary' : 'subtle'}
            >
              Terms
            </Button>
          </Link>
        </nav>
      )}
      <main>
        <Outlet />
      </main>
    </FluentProvider>
  );
};