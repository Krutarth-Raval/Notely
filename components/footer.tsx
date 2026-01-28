import { Logo } from '@/components/logo'
import Link from 'next/link'
import { Github, Instagram, Mail } from 'lucide-react'

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-24 border-t bg-muted/20">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <Link href="/" aria-label="go home">
                            <Logo />
                        </Link>
                        <p className="text-muted-foreground text-sm text-center md:text-left max-w-xs">
                            Contain all your notes in one place. Simple, fast, and secure.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col items-center md:items-start space-y-3">
                        <h3 className="font-semibold text-foreground">Company</h3>
                        <div className="flex flex-col space-y-2 items-center md:items-start text-sm text-muted-foreground">
                            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col items-center md:items-start space-y-3">
                        <h3 className="font-semibold text-foreground">Connect</h3>
                        <div className="flex space-x-4">
                            <Link
                                href="https://github.com/Krutarth-Raval"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Github"
                                className="p-2 rounded-full hover:bg-muted hover:text-primary transition-all duration-300">
                                <Github className="size-5" />
                            </Link>
                            <Link
                                href="https://www.instagram.com/raval_krutarth"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="p-2 rounded-full hover:bg-muted hover:text-primary transition-all duration-300">
                                <Instagram className="size-5" />
                            </Link>
                            <Link
                                href="mailto:ravalkrutarth22@gmail.com"
                                aria-label="Email"
                                className="p-2 rounded-full hover:bg-muted hover:text-primary transition-all duration-300">
                                <Mail className="size-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Notely. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

