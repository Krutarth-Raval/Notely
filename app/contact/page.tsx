"use client";

import FooterSection from "@/components/footer";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        // Add the access key specifically for the API
        const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

        if (!accessKey) {
            console.error("Access key is missing in environment variables");
            toast.error("Changes could not be saved due to configuration error.");
            setLoading(false);
            return;
        }

        formData.append("access_key", accessKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Message sent successfully!");
                (e.target as HTMLFormElement).reset();
            } else {
                toast.error("Something went wrong. Please try again.");
                console.error("Form submission error:", data);
            }
        } catch (error) {
            toast.error("Failed to send message. Please check your connection.");
            console.error("Form submission error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <HeroHeader />
            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-xl text-muted-foreground">
                            Have questions or feedback? We&apos;d love to hear from you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                                <p className="text-muted-foreground mb-8">
                                    Whether you have a feature request, a bug report, or just want to say hi, our team is ready to help.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <Mail className="size-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a href="mailto:ravalkrutarth22@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                                ravalkrutarth22@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <MapPin className="size-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Location</p>
                                            <p className="text-muted-foreground">
                                                Ahmadabad, Gujarat, India
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
                                <div className="flex gap-4">
                                    <Link
                                        href="https://github.com/Krutarth-Raval"
                                        target="_blank"
                                        className="p-3 bg-muted rounded-full hover:text-primary transition-colors"
                                    >
                                        <Github className="size-6" />
                                    </Link>
                                    <Link
                                        href="https://www.instagram.com/raval_krutarth"
                                        target="_blank"
                                        className="p-3 bg-muted rounded-full hover:text-primary transition-colors"
                                    >
                                        <Instagram className="size-6" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-card border rounded-2xl p-8 shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        required
                                        className="w-full min-h-[120px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}
