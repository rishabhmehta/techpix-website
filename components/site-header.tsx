import PillNav from './PillNav';

const NavItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export function SiteHeader() {
  return (
    <PillNav
      logo={'/logo.png'}
      logoAlt="Company Logo"
      items={NavItems}
      // Active state based on hash links; default to home
      activeHref="#"
      className="custom-nav"
      ease="power2.easeOut"
      // Theme-aligned colors
      baseColor={'var(--muted)'}
      pillColor={'var(--card)'}
      pillTextColor={'var(--card-foreground)'}
      hoveredPillTextColor={'var(--primary-foreground)'}
      highlightColor={'var(--primary)'}
    />
  );
}
