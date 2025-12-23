import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import type { Item } from '@/App';

interface ArchivePageProps {
  items: Item[];
  onBack: () => void;
  userRole: 'cashier' | 'admin' | 'creator';
}

export default function ArchivePage({ items, onBack, userRole }: ArchivePageProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [filter, setFilter] = useState<'all' | 'documents' | 'photos' | 'other'>('all');

  const handleUnlock = () => {
    if (password === '202505') {
      setIsUnlocked(true);
      toast.success('Архив разблокирован');
    } else {
      toast.error('Неверный пароль');
    }
  };

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <Card className="w-full max-w-md shadow-2xl border-slate-700 bg-slate-800/80 backdrop-blur-sm animate-scale-in relative z-10">
          <CardHeader className="text-center space-y-3">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Lock" size={40} className="text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">
              Архив
            </CardTitle>
            <p className="text-slate-400">Введите пароль для доступа к вечному архиву</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="archive-password" className="text-slate-200">Пароль архива</Label>
              <Input
                id="archive-password"
                type="password"
                placeholder="Введите пароль 202505"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400"
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={onBack}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад
              </Button>
              <Button 
                onClick={handleUnlock}
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold"
              >
                <Icon name="Unlock" size={18} className="mr-2" />
                Открыть
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      <div className="relative">
        <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Icon name="Archive" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Вечный Архив</h1>
                <p className="text-slate-400 text-sm">История всех выданных предметов</p>
              </div>
            </div>
            
            <Button onClick={onBack} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card 
              className={`cursor-pointer transition-all hover-scale ${filter === 'all' ? 'ring-2 ring-sky-400' : ''} bg-gradient-to-br from-sky-500 to-sky-600 border-0 text-white shadow-xl`}
              onClick={() => setFilter('all')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Archive" size={24} />
                  Все
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{items.length}</p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover-scale ${filter === 'documents' ? 'ring-2 ring-purple-400' : ''} bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white shadow-xl`}
              onClick={() => setFilter('documents')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Документы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {items.filter(i => i.category === 'documents').length}
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover-scale ${filter === 'photos' ? 'ring-2 ring-pink-400' : ''} bg-gradient-to-br from-pink-500 to-pink-600 border-0 text-white shadow-xl`}
              onClick={() => setFilter('photos')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Image" size={24} />
                  Фото/Карты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {items.filter(i => i.category === 'photos').length}
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all hover-scale ${filter === 'other' ? 'ring-2 ring-orange-400' : ''} bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white shadow-xl`}
              onClick={() => setFilter('other')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" size={24} />
                  Другое
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {items.filter(i => i.category === 'other').length}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Icon name="History" size={24} />
                Архивные записи ({filteredItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Inbox" size={64} className="mx-auto text-slate-600 mb-4" />
                  <p className="text-slate-400 text-lg">Архив пуст</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-700 hover:bg-slate-700/50">
                        <TableHead className="text-slate-300">QR-код</TableHead>
                        <TableHead className="text-slate-300">Предмет</TableHead>
                        <TableHead className="text-slate-300">Клиент</TableHead>
                        <TableHead className="text-slate-300">Телефон</TableHead>
                        <TableHead className="text-slate-300">Категория</TableHead>
                        <TableHead className="text-slate-300">Выдан</TableHead>
                        <TableHead className="text-slate-300">Создал</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id} className="border-slate-700 hover:bg-slate-700/30">
                          <TableCell className="font-mono text-sky-400 font-semibold">
                            {item.qrNumber}
                          </TableCell>
                          <TableCell className="text-white font-medium">
                            {item.itemName}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {item.firstName} {item.lastName}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {item.phone}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {item.category === 'documents' && '📄 Документы'}
                              {item.category === 'photos' && '📸 Фото/Карты'}
                              {item.category === 'other' && '📦 Другое'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {item.createdBy}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
