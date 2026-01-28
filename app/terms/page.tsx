import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";

export default function TermsOfService() {
    return (
        <div className="flex min-h-screen flex-col">
            <HeroHeader />
            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="prose dark:prose-invert max-w-none space-y-6">
                        <p>Last updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Notely, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                            <p>
                                Notely provides users with tools to organize notes, tasks, and ideas. You are responsible for obtaining access to the Service and that access may involve third party fees (such as Internet service provider or airtime charges).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
                            <p>
                                You agree to not use the Service to:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li>Upload, post, email, transmit or otherwise make available any content that is unlawful, harmful, threatening, abusive, harassing, tortuous, defamatory, vulgar, obscene, libelous, invasive of another&apos;s privacy, hateful, or racially, ethnically or otherwise objectionable.</li>
                                <li>Harm minors in any way.</li>
                                <li>Impersonate any person or entity.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                            <p>
                                The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Notely and its licensors.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
                            <p>
                                We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}
