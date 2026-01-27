import CallToAction from "@/components/call-to-action";
import Features from "@/components/features";
import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";


import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main>
      <HeroHeader />
      <HeroSection />
      <Features/>
      <CallToAction/>
      <FooterSection/>
    </main>
  );
}
