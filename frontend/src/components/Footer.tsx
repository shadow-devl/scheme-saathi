import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Heart, Shield, Mail, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto relative z-10 pt-20 pb-10">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-4 pr-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 p-1">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Scheme Saathi Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Scheme Saathi
              </span>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              A professional technology platform designed to help entrepreneurs, businesses, and organizations discover financial support, navigate compliance, and scale effectively.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/apply" className="text-slate-400 hover:text-white transition-colors font-medium">Find Schemes</Link></li>
              <li><Link to="/compare" className="text-slate-400 hover:text-white transition-colors font-medium">Compare Schemes</Link></li>
              <li><Link to="/global-schemes" className="text-slate-400 hover:text-white transition-colors font-medium">Global Programs</Link></li>
              <li><Link to="/investors" className="text-slate-400 hover:text-white transition-colors font-medium">Investors Network</Link></li>
              <li><Link to="/docs" className="text-slate-400 hover:text-white transition-colors font-medium">Documentation</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors font-medium">About Us</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Trust & Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/legal" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-2"><Shield className="w-4 h-4"/> Legal Center</Link></li>
              <li><Link to="/legal/terms" className="text-slate-400 hover:text-white transition-colors font-medium">Terms of Service</Link></li>
              <li><Link to="/legal/privacy" className="text-slate-400 hover:text-white transition-colors font-medium">Privacy Policy</Link></li>
              <li><Link to="/legal/security" className="text-slate-400 hover:text-white transition-colors font-medium">Security Policy</Link></li>
              <li><Link to="/legal/cookies" className="text-slate-400 hover:text-white transition-colors font-medium">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 text-lg tracking-tight">Contact & Info</h4>
            <ul className="space-y-4">
              <li><a href="https://schemesaathi.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-3"><Globe className="w-4 h-4 text-slate-500"/> schemesaathi.com</a></li>
              <li><span className="text-slate-400 font-medium flex items-center gap-3"><Shield className="w-4 h-4 text-slate-500"/> Registered in India</span></li>
              <li className="pt-2"><a href="mailto:support@schemesaathi.com" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-3"><Mail className="w-4 h-4 text-slate-500"/> support@schemesaathi.com</a></li>
              <li><a href="mailto:legal@schemesaathi.com" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-3"><Mail className="w-4 h-4 text-slate-500"/> legal@schemesaathi.com</a></li>
              <li><a href="mailto:security@schemesaathi.com" className="text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-3"><Mail className="w-4 h-4 text-slate-500"/> security@schemesaathi.com</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} Scheme Saathi. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for Entrepreneurs globally</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
