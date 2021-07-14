import React, { useState } from 'react';

// Create a context for the current locale
const LocaleContext = React.createContext();

export function LocaleProvider({ children, pageContext }) {
  // Get initial locale from pageContext
  const [locale, setLocale] = useState(
    pageContext ? pageContext.linkPrefix : ''
  );

  return (
    <LocaleContext.Provider value={[locale, setLocale]}>
      {children}
    </LocaleContext.Provider>
  );
}

export default LocaleContext;
