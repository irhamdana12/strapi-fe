import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import AOSInit from "@/components/AOSInit";
import { getGlobal } from "@/lib/strapi";

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal();
  const header = global.data.header;
  const footer = global.data.footer;

  return (
    <>
      <AOSInit />
      <Header 
        logo={header?.logo} 
        navItems={header?.navItems || []} 
        cta={header?.cta}
        loginLink={header?.loginLink}
      />

      <main className="grow pt-16">{children}</main>

      <Footer border={true} text={footer?.text || undefined} navItems={footer?.navItems || []} socialLinks={footer?.socialLinks || []} />
    </>
  );
}
