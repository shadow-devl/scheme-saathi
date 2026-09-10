import { useAuth } from '../context/AuthContext';
import { AlertTriangle } from 'lucide-react';

export default function DemoBanner() {
  const { user } = useAuth();

  if (!user || !user.isDemo) return null;

  return (
    <div className="bg-amber-100 border-b border-amber-200 px-4 py-2 flex items-center justify-center text-amber-800 text-sm font-medium z-50 relative">
      <AlertTriangle className="w-4 h-4 mr-2" />
      You are currently logged in to a temporary Demo Session as a {user.role}. Data will not be saved.
    </div>
  );
}
