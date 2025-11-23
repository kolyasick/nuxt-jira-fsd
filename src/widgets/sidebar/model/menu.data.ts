import type { NavigationMenuItem } from "@nuxt/ui";
import { ROUTES } from "~/app/routes/app.routes";
import { logout } from "~/features/auth";

const style = {
  linkLeadingIcon: "size-6",
  link: "gap-4",
};

export const sideBarItems: NavigationMenuItem[] = [
  {
    label: "Backlog",
    icon: "i-lucide-list-todo",
    href: "/backlog",
    ui: style,
  },
  {
    label: "Board",
    icon: "i-lucide-layout-dashboard",
    href: ROUTES.HOME,
    ui: style,
  },
  {
    label: "Reports",
    icon: "i-lucide-bar-chart-3",
    href: "/reports",
    ui: style,
  },
  {
    label: "Releases",
    icon: "i-lucide-rocket",
    href: "/releases",
    ui: style,
  },
  {
    label: "Components",
    icon: "i-lucide-package",
    href: "/components",
    ui: style,
  },
  {
    label: "Issues",
    icon: "i-lucide-bug",
    href: "/issues",
    ui: style,
  },
  {
    label: "Repository",
    icon: "i-lucide-git-branch",
    href: "/repository",
    ui: style,
  },
  {
    label: "Add item",
    icon: "i-lucide-plus-circle",
    href: "/add-item",
    ui: style,
  },
  {
    label: "Settings",
    icon: "i-lucide-settings",
    href: "/settings",
    ui: style,
  },
  {
    label: "Logout",
    icon: "si:sign-out-fill",
    ui: style,
    onSelect: logout,
  },
];
