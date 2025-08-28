import { Outlet } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

export const Layout = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Outlet />
    </FluentProvider>
  );
};