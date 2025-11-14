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
      
      {/* HEADER - Gunakan data dari header, bukan footer */}
      <Header 
        logo={header.logo}  // ✅ PERBAIKI: header.logo bukan footer.logo
        navItems={header.navItems}
        loginLink={header.loginLink}
      />

      <main className="grow pt-0">{children}</main>

      {/* FOOTER - Gunakan data dari footer */}
      <Footer
        border={true} 
        text={footer.text}
        logo={footer.logo}  // ✅ BENAR: footer.logo
        navItems={footer.navItems} 
        socialLinks={footer.socialLinks} 
      />
    </>
  );
}