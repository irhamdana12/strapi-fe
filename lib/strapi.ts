export type StrapiImage = {
  id: number;
  documentId?: string;
  alternativeText?: string | null;
  url: string;
};

export type NavItem = {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: "LINK" | "PRIMARY" | "SECONDARY";
  };

export type GlobalResponse = {
  data: {
    id: number;
    title: string;
    description?: string;
    banner?: unknown;
    header?: {
      id: number;
      logo: {
        id: number;
        href: string;
        isExternal?: boolean;
        label: string;
        image: StrapiImage | null;
      } | null;
      navItems: NavItem[];
      cta: NavItem[];
      loginLink?: NavItem | null;
    } | null;
    footer?: {
      id: number;
      text?: string;
      logo?: unknown;
      navItems?: NavItem[];
      socialLinks?: Array<{
        id: number;
        href: string;
        isExternal?: boolean;
        label: string;
        image: StrapiImage | null;
      }>; 
    } | null;
  };
  meta: unknown;
};

export type LandingPageBlockHero = {
  __component: "blocks.hero";
  id: number;
  heading?: string;
  text?: string;
  image?: StrapiImage | null;
  links?: NavItem[];
};

export type LandingPageBlockFaq = {
  __component: "blocks.hero";
  id: number;
  heading: string;
  text: string;
};

export type LandingPageBlockSectionHeading = {
  __component: "blocks.section-heading";
  id: number;
  subHeading?: string | null;
  heading?: string;
  anchorLink?: string | null;
};

export type LandingPageBlockCardGrid = {
  __component: "blocks.card-grid";
  id: number;
  cards: Array<{
    id: number;
    heading: string;
    text?: string;
    icon?: StrapiImage | null;
    link?: NavItem | null;
  }>;
};

export type LandingPageBlockSolutions = {
  __component: "blocks.solution-tabs";
  id: number;
  title: string;
  tabs: Array<{
    id: number;
    label: string;
    heading: string;
    text: string;
    image: StrapiImage;
    bullets: Array<{
      id: number;
      text: string;
    }>;
    results: Array<{
      id: number;
      text: string;
    }>;
    result_title: string;
    key: string;

  }>;

}

export type LandingPageResponse = {
  data: {
    id: number;
    documentId: string;
    title: string;
    description?: string;
    blocks: Array<
      | LandingPageBlockHero
      | LandingPageBlockSectionHeading
      | LandingPageBlockCardGrid
      | LandingPageBlockSolutions
    >;
  };
  meta: unknown;
};

export function getStrapiURL() {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return baseUrl.replace(/\/$/, "");
}

async function fetchStrapi<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${getStrapiURL()}${path}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(process.env.STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
      : {}),
    ...(init?.headers || {}),
  };

  const res = await fetch(url, { ...init, headers, next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi request failed ${res.status}: ${text}`);
  }
  return (await res.json()) as T;
}

export async function getGlobal() {
  return await fetchStrapi<GlobalResponse>("/api/global");
}

export async function getLandingPage() {
  return await fetchStrapi<LandingPageResponse>("/api/landing-page");
}



