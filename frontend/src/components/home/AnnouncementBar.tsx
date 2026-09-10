import { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AnnouncementBar() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('schemeSaathiAnnouncementDismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('schemeSaathiAnnouncementDismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between text-sm relative z-50">
      <div className="flex-1 flex justify-center items-center gap-2 text-center">
        <Info className="w-4 h-4 shrink-0 hidden sm:block" />
        <span className="font-medium">
          {t('home.announcement', 'One platform to discover, understand and navigate entrepreneurship support opportunities.')}
        </span>
      </div>
      <button 
        onClick={handleDismiss} 
        className="text-blue-100 hover:text-white transition-colors p-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white/50 shrink-0 ml-4"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
