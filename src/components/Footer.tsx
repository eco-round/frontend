export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#FF4655] via-[#00E6C3] to-[#FF4655] shadow-[0_0_12px_rgba(255,70,85,0.4)]" />

      {/* Background crosshair pattern */}
      <div className="bg-crosshair bg-[#1A2634] relative">
        {/* Decorative angular elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#FF4655]/30 clip-corner-sm opacity-50" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00E6C3]/30 clip-corner-sm opacity-50" />

        {/* Floating decorative circles */}
        <div className="absolute top-12 right-1/4 w-2 h-2 rounded-full bg-[#FF4655] animate-pulse-glow" />
        <div className="absolute bottom-12 left-1/3 w-2 h-2 rounded-full bg-[#00E6C3] animate-pulse-glow" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left: Branding */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-[#FF4655] to-[#00E6C3] clip-corner-sm" />
                <div>
                  <h3 className="text-2xl font-bold tracking-[0.2em] text-gradient-red-teal">
                    ECOROUND
                  </h3>
                  <p className="text-sm text-[#768079] font-medium tracking-wide">
                    NO-LOSS ESPORTS PREDICTIONS
                  </p>
                </div>
              </div>
              <div className="pl-6 pt-2">
                <p className="text-xs text-[#768079] leading-relaxed">
                  Predict winners. Earn yield. Everyone gets their principal back.
                </p>
              </div>
            </div>

            {/* Center: Hackathon */}
            <div className="text-center space-y-3">
              <div className="inline-block clip-corner px-6 py-3 bg-[#0F1923]/60 border border-[#00E6C3]/20">
                <p className="text-sm text-[#768079] mb-1">
                  BUILT FOR THE
                </p>
                <p className="text-lg font-bold text-[#00E6C3] tracking-wider uppercase">
                  Chainlink Hackathon
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#00E6C3]" />
                <div className="w-8 h-[2px] bg-gradient-to-r from-[#00E6C3] to-transparent" />
              </div>
            </div>

            {/* Right: Tech Stack */}
            <div className="md:text-right space-y-4">
              <div>
                <p className="text-xs text-[#768079] uppercase tracking-wider mb-2">
                  Powered By
                </p>
                <div className="flex md:justify-end gap-3 flex-wrap">
                  <span className="inline-block clip-corner-sm px-3 py-1 bg-[#0F1923]/60 border border-[#00E6C3]/30 text-[#00E6C3] text-sm font-bold tracking-wide">
                    CHAINLINK CRE
                  </span>
                  <span className="inline-block clip-corner-sm px-3 py-1 bg-[#0F1923]/60 border border-[#00E6C3]/30 text-[#00E6C3] text-sm font-bold tracking-wide">
                    MORPHO
                  </span>
                </div>
              </div>
              <div className="flex md:justify-end gap-2">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#FF4655]" />
                <div className="w-12 h-[1px] bg-gradient-to-r from-[#FF4655] to-transparent" />
              </div>
            </div>
          </div>

          {/* Bottom: Yield Info */}
          <div className="mt-8 pt-6 border-t border-[#768079]/20 relative">
            {/* Angular decorative corner */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#00E6C3] clip-corner-sm" />

            <div className="text-center space-y-3">
              <div className="inline-block clip-corner-lg px-8 py-4 glass border border-[#768079]/20">
                <p className="text-xs text-[#768079] leading-relaxed max-w-3xl">
                  Deposits earn yield via <span className="text-[#00E6C3] font-semibold">Morpho ERC4626 vaults</span> on Base Mainnet.
                  Winners split the accumulated yield. Losers get their full principal back. True no-loss predictions.
                </p>
              </div>

              {/* Final decorative line */}
              <div className="flex justify-center items-center gap-3 pt-2">
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#FF4655] to-transparent" />
                <div className="w-2 h-2 rounded-full bg-[#FF4655] animate-pulse-glow" />
                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#00E6C3] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
