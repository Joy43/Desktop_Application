// Define a type for your user (example)
export interface User {
  id: string;
  name: string;
  email: string;
}

// Define a type for your app's theme (example)
export type Theme = "light" | "dark";

// Define a type for your app's routes (example)
export type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};

export interface MenuItem {
  label: string;
  href: string;
  template: string;
  submenus:SubmenuItem[];
}

export interface SubmenuItem {
  label: string;
  href: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category?: string;
  subcategory?: string;
  readTime?: string;
  author?: string;
  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
  tag?: string;
  featured?: boolean;
}