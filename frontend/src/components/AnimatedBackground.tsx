import { Shield } from 'lucide-react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50">
      {/* Subtle Blue Gradients for Professional Depth */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] rounded-full bg-blue-200/40 blur-[150px]"></div>

      {/* Modern Government Tech Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Subtle Floating Logo Watermark */}
      <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.04] pointer-events-none select-none mix-blend-multiply">
         <img src={`${import.meta.env.BASE_URL}logo.jpg`} className="w-[800px] h-[800px] grayscale" alt="Watermark Logo" />
      </div>
    </div>
  );
}
