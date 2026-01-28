import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
    return (
        <div className="flex min-h-screen flex-col">
            <HeroHeader />
            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-12">
                        {/* Hero */}
                        <section className="text-center space-y-6">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                                We&apos;re building the future of <span className="text-primary">note-taking</span>.
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Notely is designed to be the fastest, most delightful way to capture your thoughts and organize your life.
                            </p>
                        </section>

                        {/* Mission */}
                        <section className="bg-muted/30 p-8 rounded-2xl border">
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                We believe that great ideas can come from anywhere, at any time. Our mission is to provide a tool that removes the friction between having a thought and capturing it. We strive to build software that feels invisible, allowing you to focus on what matters most: your content.
                            </p>
                        </section>

                        {/* Values */}
                        <section>
                            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: "Simplicity", desc: "We believe in the power of simple, intuitive design." },
                                    { title: "Speed", desc: "Every millisecond counts. We optimize for performance." },
                                    { title: "Privacy", desc: "Your data is yours. We protect it with industry-standard security." }
                                ].map((value, i) => (
                                    <div key={i} className="p-6 border rounded-xl bg-card hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                        <p className="text-muted-foreground">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="text-center py-12">
                            <h2 className="text-3xl font-bold mb-6">Ready to get organized?</h2>
                            <Button asChild size="lg" className="rounded-full px-8">
                                <Link href="/signup">Start for free</Link>
                            </Button>
                        </section>
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}
