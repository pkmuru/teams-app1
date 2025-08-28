import { useState, useEffect } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';

export const useTeams = () => {
  const [inTeams, setInTeams] = useState(false);
  const [context, setContext] = useState<microsoftTeams.app.Context | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we're running in Teams
    if (microsoftTeams.app.isInitialized()) {
      setInTeams(true);
      microsoftTeams.app.getContext().then(setContext);
      setLoading(false);
    } else {
      microsoftTeams.app.initialize().then(() => {
        setInTeams(true);
        microsoftTeams.app.getContext().then((ctx) => {
          setContext(ctx);
          setLoading(false);
        });
      }).catch(() => {
        // Not in Teams
        setInTeams(false);
        setLoading(false);
      });
    }
  }, []);

  return { inTeams, context, loading };
};