import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { User, Item } from '@/App';
import NewItemDialog from '@/components/NewItemDialog';
import PickupDialog from '@/components/PickupDialog';
import ItemsTable from '@/components/ItemsTable';

interface DashboardProps {
  user: User;
  items: Item[];
  onLogout: () => void;
  onAddItem: (item: Item) => void;
  onArchiveItem: (qrNumber: string) => void;
  onShowArchive: () => void;
}

export default function Dashboard({ user, items, onLogout, onAddItem, onArchiveItem, onShowArchive }: DashboardProps) {
  const [showNewItem, setShowNewItem] = useState(false);
  const [showPickup, setShowPickup] = useState(false);

  const roleColors = {
    cashier: 'bg-green-500',
    admin: 'bg-purple-500',
    creator: 'bg-pink-500'
  };

  const roleNames = {
    cashier: 'Кассир',
    admin: 'Администратор',
    creator: 'Создатель'
  };

  const canAddItems = user.role === 'admin' || user.role === 'creator';

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative">
        <header className="border-b border-slate-200 bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Система Хранения Документов</h1>
                <p className="text-slate-600 text-sm">Управление предметами и документами</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-slate-600">{roleNames[user.role]}</p>
                <p className="text-sm font-medium text-slate-900">{user.name}</p>
              </div>
              <Button variant="outline" onClick={onLogout} className="border-slate-300 text-slate-700 hover:bg-slate-50">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={onShowArchive}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-900 text-base">
                  <Icon name="Archive" size={20} />
                  Архив
                </CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Вечное хранение
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-slate-900">{items.length}</p>
                <p className="text-xs text-slate-500 mt-1">активных предметов</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-900 text-base">
                  <Icon name="FileText" size={20} />
                  Документы
                </CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Отдел 1 (100 мест)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-slate-900">
                  {items.filter(item => item.category === 'documents').length}/100
                </p>
                <p className="text-xs text-slate-500 mt-1">занято</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-900 text-base">
                  <Icon name="Image" size={20} />
                  Фото/Карты
                </CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Отдел 2 (100 мест)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-slate-900">
                  {items.filter(item => item.category === 'photos').length}/100
                </p>
                <p className="text-xs text-slate-500 mt-1">занято</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-slate-900 text-base">
                  <Icon name="Package" size={20} />
                  Другое
                </CardTitle>
                <CardDescription className="text-slate-600 text-sm">
                  Отдел 3 (неограничено)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-slate-900">
                  {items.filter(item => item.category === 'other').length}
                </p>
                <p className="text-xs text-slate-500 mt-1">предметов</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3">
            {canAddItems && (
              <Button 
                onClick={() => setShowNewItem(true)}
                className="bg-slate-800 hover:bg-slate-900 text-white font-medium shadow-sm"
                size="lg"
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Принять предмет
              </Button>
            )}
            
            <Button 
              onClick={() => setShowPickup(true)}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
              size="lg"
            >
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Выдать предмет
            </Button>
          </div>

          <ItemsTable items={items} userRole={user.role} />
        </main>

        {showNewItem && (
          <NewItemDialog
            isOpen={showNewItem}
            onClose={() => setShowNewItem(false)}
            onAddItem={onAddItem}
            userName={user.name}
          />
        )}

        {showPickup && (
          <PickupDialog
            isOpen={showPickup}
            onClose={() => setShowPickup(false)}
            items={items}
            onArchiveItem={onArchiveItem}
          />
        )}
      </div>
    </div>
  );
}