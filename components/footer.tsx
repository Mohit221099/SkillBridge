import Link from "next/link";
import { Code, Briefcase, Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/30 py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-1 font-bold text-xl mb-4">
              <div className="flex items-center">
                <Code className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600">Dev</span>
                <Briefcase className="h-5 w-5 text-purple-600" />
                <span className="text-purple-600">Connect</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Connecting talented contributors with companies looking for innovative minds. Build your future career through projects and challenges.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">For Contributors</h3>
            <ul className="space-y-2">
              <FooterLink href="/projects/showcase">Showcase Projects</FooterLink>
              <FooterLink href="/challenges/browse">Browse Challenges</FooterLink>
              <FooterLink href="/learn">Learning Resources</FooterLink>
              <FooterLink href="/events">Hackathons & Events</FooterLink>
              <FooterLink href="/success-stories">Success Stories</FooterLink>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">For Hirers</h3>
            <ul className="space-y-2">
              <FooterLink href="/contributors/browse">Find Talent</FooterLink>
              <FooterLink href="/challenges/create">Post a Challenge</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/success-stories/company">Company Success Stories</FooterLink>
              <FooterLink href="/enterprise">Enterprise Solutions</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookies</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
          </Link>
    </li>
  );
}