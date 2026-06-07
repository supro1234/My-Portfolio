import React from 'react';

/**
 * HackerBackground — Pure CSS/SVG animated background
 * NO WebGL. Guaranteed visible on every device.
 * Three layers:
 *   1. Base gradient (dark with green/cyan depth)
 *   2. Animated dot-grid (CSS)
 *   3. Floating glow orbs (CSS keyframes)
 */
const HackerBackground = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

    {/* Layer 1: Base gradient */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(0,255,133,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 80% 80%, rgba(0,229,255,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 10% 60%, rgba(0,255,133,0.05) 0%, transparent 50%),
          linear-gradient(180deg, #050808 0%, #030303 40%, #03050a 100%)
        `,
      }}
    />

    {/* Layer 2: Grid lines */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,133,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,133,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />

    {/* Helper: perspective grid origin glow */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(0,255,133,0.04) 0%, transparent 70%)',
      }}
    />

    {/* Layer 3: Floating glow orbs — pure CSS animation */}
    <div
      style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,133,0.08) 0%, transparent 70%)',
        animation: 'orbFloat1 18s ease-in-out infinite',
        filter: 'blur(40px)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '55%',
        right: '5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)',
        animation: 'orbFloat2 22s ease-in-out infinite',
        filter: 'blur(50px)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '10%',
        left: '30%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,133,0.05) 0%, transparent 70%)',
        animation: 'orbFloat3 26s ease-in-out infinite',
        filter: 'blur(60px)',
      }}
    />

    {/* Layer 4: Scanline shimmer */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,133,0.012) 3px, rgba(0,255,133,0.012) 4px)',
        pointerEvents: 'none',
      }}
    />
  </div>
);

export default HackerBackground;
