export type SiteConfig = typeof siteConfig;

export const routes = {
  home: "/",
  about: "/about",
  category: "/category/:categorySlug",
  notFound: "/404",
};

export const siteConfig = {
  navItems: [
    {
      label: "Home",
      href: routes.home,
    },
    {
      label: "Genres",
      href: "/category/genres",
    },
    {
      label: "About",
      href: routes.about,
    },
  ],
};
