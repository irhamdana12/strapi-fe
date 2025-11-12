export const metadata = {
  title: "Home - Simple",
  description: "Page description",
};

import BlockRenderer from "@/components/blocks/BlockRenderer";
import { getLandingPage } from "@/lib/strapi";

export default async function Home() {
  const page = await getLandingPage();
  if (!page) throw new Error("Landing page not found")
  const blocks = page.data.blocks || [];
  return <BlockRenderer blocks={blocks as any} />;
}
