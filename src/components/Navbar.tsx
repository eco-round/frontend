"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/matches", label: "Matches" },
    { href: "/my-predictions", label: "My Predictions" },
    { href: "/faucet", label: "Faucet" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 accent-line">
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Brand */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 group">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="EcoRound Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 transition-transform duration-300 group-hover:rotate-12"
                />
                <div className="absolute inset-0 bg-[#FF4655] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <span className="text-xl font-bold tracking-[0.25em] text-gradient-red-teal">
                ECOROUND
              </span>
            </Link>

            {/* Center: Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 font-semibold transition-all duration-200 uppercase tracking-wider text-sm nav-indicator ${
                    isActive(link.href)
                      ? "text-[#FF4655] active"
                      : "text-[#ECE8E1] hover:text-[#FF4655]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF4655] to-[#00E6C3]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Separator + Connect Button */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#768079] to-transparent" />
              <div className="relative">
                <ConnectButton />
              </div>
            </div>

            {/* Mobile: Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded hover:bg-[#1A2634] transition-all duration-200 relative group"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
              <div className="absolute inset-0 bg-[#FF4655] blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu with overlay */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in md:hidden"
                onClick={() => setMobileMenuOpen(false)}
                style={{ top: '64px' }}
              />

              {/* Menu panel */}
              <div className="md:hidden absolute left-0 right-0 top-full bg-[#0F1923]/98 backdrop-blur-xl border-t border-[#768079]/20 animate-slide-in-down shadow-2xl">
                <div className="bg-crosshair">
                  <div className="flex flex-col gap-2 p-4 relative z-10">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-semibold transition-all duration-200 px-4 py-3 rounded uppercase tracking-wider text-sm clip-corner-sm animate-slide-in-down stagger-${index + 1} ${
                          isActive(link.href)
                            ? "text-[#FF4655] bg-[#1A2634] border border-[#FF4655]/30"
                            : "text-[#ECE8E1] hover:text-[#FF4655] hover:bg-[#1A2634]/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-4 mt-2 border-t border-[#768079]/20">
                      <ConnectButton />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
