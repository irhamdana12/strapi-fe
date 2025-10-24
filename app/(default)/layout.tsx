import { Suspense } from "react";

import Header from "@/components/ui/header";
import HeaderLoading from "@/components/ui/header-loading";
import Footer from "@/components/ui/footer";
import ClientInitializer from "@/components/client-initializer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientInitializer />
      
      <Suspense fallback={<HeaderLoading />}>
        <Header />
      </Suspense>

      <main className="grow">{children}</main>

      <Footer border={true} />
    </>
  );
}
