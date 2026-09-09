import { Shield } from 'lucide-react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0B0E14]">
      {/* Subtle Blue Gradients for Professional Depth */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] rounded-full bg-blue-800/10 blur-[150px]"></div>

      {/* Modern Government Tech Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Subtle Floating Logo Watermark */}
      <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.04] pointer-events-none select-none mix-blend-screen">
         <img src="./logo.jpg" className="w-[800px] h-[800px] grayscale" alt="Watermark Logo" />
      </div>
    </div>
  );
}
