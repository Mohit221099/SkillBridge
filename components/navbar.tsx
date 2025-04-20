"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code, Briefcase, Search, Bell, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
            <div className="flex items-center">
              <Code className="h-6 w-6 text-blue-600" />
              <span className="text-blue-600">Dev</span>
              <Briefcase className="h-6 w-6 text-purple-600" />
              <span className="text-purple-600">Connect</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex max-w-md flex-1 mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects, challenges, or contributors..."
                className="w-full pl-10 bg-muted/50"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Explore</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/projects">Projects</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/challenges">Challenges</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contributors">Contributors</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/companies">Companies</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Resources</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/learn">Learning Center</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events">Events</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help">Help Center</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Desktop Auth Buttons & Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
                </Button>
                
                <Button variant="ghost" size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <img
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                        alt="Profile"
                        className="rounded-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t animate-in slide-in-from-top duration-300">
          {/* Mobile Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10"
              />
            </div>
          </div>

          <div className="divide-y divide-border">
            <div className="py-2">
              <MobileNavLink href="/projects">Projects</MobileNavLink>
              <MobileNavLink href="/challenges">Challenges</MobileNavLink>
              <MobileNavLink href="/contributors">Contributors</MobileNavLink>
              <MobileNavLink href="/companies">Companies</MobileNavLink>
            </div>
            
            <div className="py-2">
              <MobileNavLink href="/learn">Learning Center</MobileNavLink>
              <MobileNavLink href="/blog">Blog</MobileNavLink>
              <MobileNavLink href="/events">Events</MobileNavLink>
              <MobileNavLink href="/pricing">Pricing</MobileNavLink>
            </div>

            {isLoggedIn ? (
              <div className="py-2">
                <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
                <MobileNavLink href="/profile">Profile</MobileNavLink>
                <MobileNavLink href="/settings">Settings</MobileNavLink>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="block w-full px-4 py-2 text-left text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-2">
                <Button variant="outline" asChild className="w-full justify-center">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="w-full justify-center">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function MobileNavLink({ href, children }) {
  return (
    <Link 
      href={href} 
      className="block px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-colors"
    >
      {children}
    </Link>
  );
}