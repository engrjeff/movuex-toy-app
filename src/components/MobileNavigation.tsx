import { createContext, useContext, useMemo, useState } from 'react';

import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';

interface MobileNavigationContextState {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const MobileNavigationContext = createContext<MobileNavigationContextState | null>(null);

MobileNavigationContext.displayName = 'MobileNavigation';

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      toggle: () => setOpen((s) => !s),
      close: () => setOpen(false),
    }),
    [open]
  );

  return (
    <MobileNavigationContext.Provider value={value}>
      <MobileMenuButton />
      <MobileMenu />
    </MobileNavigationContext.Provider>
  );
};

export const useMobileNavigation = () => {
  const context = useContext(MobileNavigationContext);

  if (!context) throw new Error(`useMobileNavigation can only be used inside <MobileNavigation />`);

  return context;
};

export default MobileNavigation;
