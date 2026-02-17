"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #FF4655 1px, transparent 1px),
            linear-gradient(to bottom, #FF4655 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00E6C3 1px, transparent 1px),
            linear-gradient(to bottom, #00E6C3 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'gridPulse 4s ease-in-out infinite',
        }}></div>
      </div>

      {/* Crosshair Accent */}
      <div className="absolute top-20 right-1/4 w-32 h-32 opacity-30">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-red-500 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
        {/* Diagonal Accent Slash */}
        <div className="absolute left-0 top-1/4 w-[600px] h-[400px] opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-red-500 to-transparent rotate-12 blur-3xl"></div>
        </div>
        <div className="absolute right-0 bottom-1/4 w-[500px] h-[300px] opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-tl from-teal-400 to-transparent -rotate-12 blur-3xl"></div>
        </div>

        {/* Floating Angular Shapes */}
        <div className="absolute top-32 left-12 w-24 h-24 border border-red-500/30 clip-corner-lg pointer-events-none" style={{
          animation: 'float 6s ease-in-out infinite',
        }}></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 border border-teal-400/30 clip-corner-tr pointer-events-none" style={{
          animation: 'float 8s ease-in-out infinite reverse',
        }}></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Overline */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-card/50 backdrop-blur-sm border border-red-500/30 clip-corner-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-red-400 tracking-wider uppercase">No-Loss Esports Predictions</span>
          </div>

          {/* Main Headline with Staggered Animation */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="inline-block" style={{
              background: 'linear-gradient(135deg, #ECE8E1 0%, #FF4655 50%, #00E6C3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease infinite',
            }}>
              PREDICT
            </span>
            <br />
            <span className="inline-block text-primary" style={{
              animation: 'slideInDelay 0.8s ease-out',
            }}>
              EARN
            </span>
            <span className="inline-block mx-4 text-red-500" style={{
              animation: 'slideInDelay 1s ease-out',
            }}>
              •
            </span>
            <span className="inline-block text-teal-400" style={{
              animation: 'slideInDelay 1.2s ease-out',
            }}>
              NEVER LOSE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            Put your esports knowledge to the test. Deposit USDC, predict match winners, and earn yield.
            <span className="block mt-2 text-teal-400 font-semibold">Win or lose, your principal is always safe.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/matches" className="group relative px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-bold text-lg clip-corner transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                VIEW MATCHES
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="group px-10 py-5 bg-transparent border-2 border-teal-400 hover:bg-teal-400/10 text-teal-400 font-bold text-lg clip-corner-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,230,195,0.3)]"
            >
              <span className="flex items-center gap-2">
                LEARN MORE
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
          </div>

          {/* Accent Line Below CTAs */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-red-500"></div>
            <div className="text-xs text-secondary uppercase tracking-widest">Powered by Chainlink & Morpho</div>
            <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-teal-400"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative px-6 py-32 bg-gradient-to-b from-background to-card/20">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-transparent"></div>
            <h2 className="text-5xl font-black text-primary">HOW IT WORKS</h2>
          </div>
          <p className="text-xl text-secondary ml-20">Three simple steps to start earning</p>
        </div>

        {/* Steps Container with Connecting Lines */}
        <div className="max-w-6xl mx-auto relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-[2px]" style={{
            background: 'linear-gradient(to right, #FF4655 0%, #00E6C3 50%, #FF4655 100%)',
            opacity: 0.3,
          }}></div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="group relative">
              <div className="relative bg-card/80 backdrop-blur-sm border-l-4 border-red-500 p-8 clip-corner hover:bg-card transition-all duration-300 hover:translate-y-[-8px]">
                {/* Step Number Badge */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-red-500 clip-corner flex items-center justify-center">
                  <span className="text-3xl font-black text-white">1</span>
                </div>

                {/* Icon */}
                <div className="mb-6 mt-8">
                  <svg className="w-16 h-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="1" fill="currentColor"/>
                    <line x1="12" y1="2" x2="12" y2="6" strokeWidth="1.5"/>
                    <line x1="12" y1="18" x2="12" y2="22" strokeWidth="1.5"/>
                    <line x1="2" y1="12" x2="6" y2="12" strokeWidth="1.5"/>
                    <line x1="18" y1="12" x2="22" y2="12" strokeWidth="1.5"/>
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-primary mb-3">PREDICT</h3>
                <p className="text-secondary leading-relaxed">
                  Browse upcoming esports matches and deposit USDC to back your prediction. Your funds are deployed to Morpho vault immediately.
                </p>

                {/* Decorative Corner */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-500/30"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="relative bg-card/80 backdrop-blur-sm border-l-4 border-teal-400 p-8 clip-corner hover:bg-card transition-all duration-300 hover:translate-y-[-8px]">
                {/* Step Number Badge */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-teal-400 clip-corner flex items-center justify-center">
                  <span className="text-3xl font-black text-background">2</span>
                </div>

                {/* Icon */}
                <div className="mb-6 mt-8">
                  <svg className="w-16 h-16 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-primary mb-3">EARN YIELD</h3>
                <p className="text-secondary leading-relaxed">
                  While the match plays out, your USDC earns passive yield through battle-tested DeFi protocols. No risk, pure earning.
                </p>

                {/* Decorative Corner */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-teal-400/30"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative">
              <div className="relative bg-card/80 backdrop-blur-sm border-l-4 border-red-500 p-8 clip-corner hover:bg-card transition-all duration-300 hover:translate-y-[-8px]">
                {/* Step Number Badge */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-red-500 to-teal-400 clip-corner flex items-center justify-center">
                  <span className="text-3xl font-black text-white">3</span>
                </div>

                {/* Icon */}
                <div className="mb-6 mt-8">
                  <svg className="w-16 h-16 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-primary mb-3">CLAIM REWARDS</h3>
                <p className="text-secondary leading-relaxed">
                  Predicted correctly? Take all the yield. Wrong prediction? Get your full principal back. It's a win-win.
                </p>

                {/* Decorative Corner */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-yellow-400/30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #FF4655 0, #FF4655 1px, transparent 0, transparent 50%)`,
            backgroundSize: '10px 10px',
          }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Stat 1 */}
            <div className="text-center group">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-red-500/20 blur-2xl group-hover:bg-red-500/30 transition-all"></div>
                <div className="relative text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-600">
                  100%
                </div>
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-3"></div>
              <h3 className="text-xl font-bold text-primary mb-2">PRINCIPAL PROTECTED</h3>
              <p className="text-secondary">Your deposit is always safe, no matter the outcome</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-teal-400/20 blur-2xl group-hover:bg-teal-400/30 transition-all"></div>
                <div className="relative text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600">
                  0%
                </div>
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mb-3"></div>
              <h3 className="text-xl font-bold text-primary mb-2">LOSS RISK</h3>
              <p className="text-secondary">True no-loss prediction platform powered by DeFi yield</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center group">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-yellow-500/20 blur-2xl group-hover:bg-yellow-500/30 transition-all"></div>
                <div className="relative flex items-center justify-center">
                  <span className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-600">24</span>
                  <span className="text-3xl font-bold text-yellow-500 ml-2">/7</span>
                </div>
              </div>
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-3"></div>
              <h3 className="text-xl font-bold text-primary mb-2">LIVE MATCHES</h3>
              <p className="text-secondary">Global esports coverage with instant oracle results</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slideInDelay {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
