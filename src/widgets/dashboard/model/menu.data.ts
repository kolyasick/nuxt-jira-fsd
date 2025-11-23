import type { NavigationMenuItem } from "@nuxt/ui";

export const sideBarItems: NavigationMenuItem[] = [
  {
    label: "Backlog",
    icon: "i-lucide-list-todo",
    href: "/backlog",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Board",
    icon: "i-lucide-layout-dashboard",
    href: "/dashboard",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Reports",
    icon: "i-lucide-bar-chart-3",
    href: "/reports",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Releases",
    icon: "i-lucide-rocket",
    href: "/releases",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Components",
    icon: "i-lucide-package",
    href: "/components",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Issues",
    icon: "i-lucide-bug",
    href: "/issues",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Repository",
    icon: "i-lucide-git-branch",
    href: "/repository",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Add item",
    icon: "i-lucide-plus-circle",
    href: "/add-item",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
  {
    label: "Settings",
    icon: "i-lucide-settings",
    href: "/settings",
    ui: {
      linkLeadingIcon: "size-6",
      link: "gap-4",
    },
  },
];
