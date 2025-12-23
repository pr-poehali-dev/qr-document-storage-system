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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="relative">
        <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Icon name="Package" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Система Хранения</h1>
                <p className="text-slate-400 text-sm">Управление предметами и документами</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge className={`${roleColors[user.role]} text-white px-4 py-2`}>
                {roleNames[user.role]}: {user.name}
              </Badge>
              <Button variant="outline" onClick={onLogout} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-sky-500 to-sky-600 border-0 text-white shadow-xl hover-scale cursor-pointer" onClick={onShowArchive}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Archive" size={24} />
                  Архив
                </CardTitle>
                <CardDescription className="text-sky-100">
                  Вечное хранение
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{items.length}</p>
                <p className="text-sm text-sky-100 mt-1">активных предметов</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Документы
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Отдел 1 (100 мест)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {items.filter(item => item.category === 'documents').length}/100
                </p>
                <p className="text-sm text-purple-100 mt-1">занято</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-500 to-pink-600 border-0 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Image" size={24} />
                  Фото/Карты
                </CardTitle>
                <CardDescription className="text-pink-100">
                  Отдел 2 (100 мест)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {items.filter(item => item.category === 'photos').length}/100
                </p>
                <p className="text-sm text-pink-100 mt-1">занято</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={24} />
                  Другое
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Отдел 3 (неограничено)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {items.filter(item => item.category === 'other').length}
                </p>
                <p className="text-sm text-orange-100 mt-1">предметов</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3">
            {canAddItems && (
              <Button 
                onClick={() => setShowNewItem(true)}
                className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white font-semibold shadow-lg"
                size="lg"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Принять предмет
              </Button>
            )}
            
            <Button 
              onClick={() => setShowPickup(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg"
              size="lg"
            >
              <Icon name="CheckCircle" size={20} className="mr-2" />
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
