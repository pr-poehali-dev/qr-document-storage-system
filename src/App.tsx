
import { useState } from 'react';
import { Toaster as Sonner } from '@/components/ui/sonner';
import LoginPage from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import ArchivePage from '@/pages/Archive';

export interface User {
  role: 'cashier' | 'admin' | 'creator';
  name: string;
}

export interface Item {
  id: string;
  qrNumber: string;
  itemName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  depositDate: string;
  pickupDate: string;
  depositAmount: number;
  pickupAmount: number;
  category: 'documents' | 'photos' | 'other';
  status: 'active' | 'archived';
  createdAt: string;
  createdBy: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [showArchive, setShowArchive] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setShowArchive(false);
  };

  const handleAddItem = (item: Item) => {
    setItems([...items, item]);
  };

  const handleArchiveItem = (qrNumber: string) => {
    setItems(items.map(item => 
      item.qrNumber === qrNumber 
        ? { ...item, status: 'archived' as const }
        : item
    ));
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (showArchive) {
    return (
      <ArchivePage 
        items={items.filter(item => item.status === 'archived')} 
        onBack={() => setShowArchive(false)}
        userRole={user.role}
      />
    );
  }

  return (
    <>
      <Dashboard 
        user={user}
        items={items.filter(item => item.status === 'active')}
        onLogout={handleLogout}
        onAddItem={handleAddItem}
        onArchiveItem={handleArchiveItem}
        onShowArchive={() => setShowArchive(true)}
      />
      <Sonner />
    </>
  );
}

export default App;