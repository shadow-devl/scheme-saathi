import { Shield } from 'lucide-react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 dark-mode-bg">
      {/* Subtle Blue Gradients for Professional Depth */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] rounded-full bg-blue-200/40 blur-[150px] animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-200/30 blur-[120px] animate-float-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-teal-100/30 blur-[100px] animate-float-medium"></div>

      {/* Modern Government Tech Grid Mesh */}
      <div 
        className="absolute inset-0 opacity-[0.03] grid-mesh"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000000 1px, transparent 1px),
            linear-gradient(to bottom, #000000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Centered Static Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none select-none">
         <img src={`${import.meta.env.BASE_URL}logo.jpg`} className="w-[600px] h-[600px] object-contain grayscale watermark-logo" alt="Watermark Logo" />
      </div>
    </div>
  );
}
