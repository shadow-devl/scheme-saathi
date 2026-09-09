import { Shield } from 'lucide-react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0B0E14]">
      {/* Deep colorful background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/20 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-900/20 blur-[150px]"></div>
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-purple-900/20 blur-[100px]"></div>

      {/* Floating Logos / Geometric Shapes */}
      <div className="absolute top-[15%] left-[10%] opacity-20 animate-float-slow mix-blend-screen">
        <img src="/logo.jpg" className="w-32 h-32 rounded-3xl blur-[1px] brightness-125" alt="Background Logo" />
      </div>
      <div className="absolute top-[60%] right-[15%] opacity-15 animate-float-medium mix-blend-screen">
         <img src="/logo.jpg" className="w-48 h-48 rounded-[2.5rem] blur-[2px] brightness-125" alt="Background Logo" />
      </div>
      <div className="absolute bottom-[20%] left-[25%] opacity-20 animate-float-fast mix-blend-screen">
         <img src="/logo.jpg" className="w-24 h-24 rounded-2xl brightness-150" alt="Background Logo" />
      </div>
      <div className="absolute top-[30%] right-[30%] opacity-10 animate-float-slow mix-blend-screen">
         <img src="/logo.jpg" className="w-64 h-64 rounded-full blur-[4px] brightness-110" alt="Background Logo" />
      </div>
      
      {/* Abstract blurred orbs */}
      <div className="absolute top-[50%] left-[5%] w-32 h-32 rounded-full bg-emerald-600/10 blur-[40px] animate-float-medium"></div>
      <div className="absolute top-[20%] right-[10%] w-48 h-48 rounded-full bg-emerald-600/10 blur-[50px] animate-float-slow"></div>
    </div>
  );
}
