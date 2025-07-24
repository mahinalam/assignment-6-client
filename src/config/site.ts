export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'GreenHaven',
  description: 'Connect, grow, and share your passion for gardening.',
  navMenuItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About Us',
      href: '/about',
    },
    {
      label: 'Contact Us',
      href: '/contact',
    },
  ],
  links: {
    github: 'https://github.com/nextui-org/nextui',
    twitter: 'https://twitter.com/getnextui',
    docs: 'https://nextui.org',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
