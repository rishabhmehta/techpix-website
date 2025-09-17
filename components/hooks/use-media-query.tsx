import React from 'react';

// Media query hook to switch drawer direction responsively
export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    // Guard for SSR
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia === 'undefined'
    ) {
      return;
    }
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    // Fallback typed handler for deprecated APIs (older Safari)
    function onChangeLegacy(this: MediaQueryList, ev: MediaQueryListEvent) {
      setMatches(ev.matches);
    }
    // Set initial
    setMatches(mql.matches);
    // Add listener with fallback for older Safari
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChangeLegacy);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChangeLegacy);
      }
    };
  }, [query]);
  return matches;
}
