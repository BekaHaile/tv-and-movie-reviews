export type SiteConfig = typeof siteConfig;

export const routes = {
  home: "/",
  about: "/about",
};

export const siteConfig = {
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
};
