import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import type { Item } from '@/App';

interface PickupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  onArchiveItem: (qrNumber: string) => void;
}

export default function PickupDialog({ isOpen, onClose, items, onArchiveItem }: PickupDialogProps) {
  const [qrNumber, setQrNumber] = useState('');
  const [foundItem, setFoundItem] = useState<Item | null>(null);

  const handleSearch = () => {
    const item = items.find(i => i.qrNumber === qrNumber);
    if (item) {
      setFoundItem(item);
      
      const speech = new SpeechSynthesisUtterance(`Номер ${qrNumber}`);
      speech.lang = 'ru-RU';
      speech.rate = 0.8;
      window.speechSynthesis.speak(speech);
      
      toast.success('Предмет найден!');
    } else {
      toast.error('Предмет с таким QR-кодом не найден');
      setFoundItem(null);
    }
  };

  const handlePickup = () => {
    if (foundItem) {
      onArchiveItem(foundItem.qrNumber);
      toast.success(`Предмет "${foundItem.itemName}" выдан и перемещен в архив`);
      handleClose();
    }
  };

  const handleClose = () => {
    setQrNumber('');
    setFoundItem(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Выдача предмета</DialogTitle>
          <DialogDescription className="text-slate-400">
            Отсканируйте или введите QR-код
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label className="text-slate-200">QR-код предмета</Label>
              <Input
                value={qrNumber}
                onChange={(e) => setQrNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Введите QR-номер"
                className="bg-slate-700/50 border-slate-600 text-white text-lg"
              />
            </div>
            <Button onClick={handleSearch} className="mt-6 bg-sky-500 hover:bg-sky-600">
              <Icon name="Search" size={18} className="mr-2" />
              Найти
            </Button>
          </div>

          {foundItem && (
            <Card className="bg-slate-700/50 border-slate-600 animate-scale-in">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{foundItem.itemName}</h3>
                    <p className="text-sky-400 font-mono text-lg mt-1">{foundItem.qrNumber}</p>
                  </div>
                  <div className="px-4 py-2 bg-gradient-to-r from-sky-500 to-purple-500 rounded-lg">
                    <Icon name="Package" size={32} className="text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-600">
                  <div>
                    <p className="text-slate-400 text-sm">Клиент</p>
                    <p className="text-white font-semibold">{foundItem.firstName} {foundItem.lastName}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Телефон</p>
                    <p className="text-white font-semibold">{foundItem.phone}</p>
                  </div>
                </div>

                {foundItem.email && (
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white font-semibold">{foundItem.email}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Дата сдачи</p>
                    <p className="text-white font-semibold">{new Date(foundItem.depositDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                  {foundItem.pickupDate && (
                    <div>
                      <p className="text-slate-400 text-sm">Дата получения</p>
                      <p className="text-white font-semibold">{new Date(foundItem.pickupDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                  )}
                </div>

                {(foundItem.depositAmount > 0 || foundItem.pickupAmount > 0) && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-600">
                    {foundItem.depositAmount > 0 && (
                      <div>
                        <p className="text-slate-400 text-sm">Оплачено при сдаче</p>
                        <p className="text-green-400 font-bold text-lg">{foundItem.depositAmount} ₽</p>
                      </div>
                    )}
                    {foundItem.pickupAmount > 0 && (
                      <div>
                        <p className="text-slate-400 text-sm">К оплате при получении</p>
                        <p className="text-orange-400 font-bold text-lg">{foundItem.pickupAmount} ₽</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4">
                  <p className="text-slate-400 text-sm">Категория</p>
                  <p className="text-white font-semibold capitalize">
                    {foundItem.category === 'documents' && '📄 Документы'}
                    {foundItem.category === 'photos' && '📸 Фото/Карты'}
                    {foundItem.category === 'other' && '📦 Другое'}
                  </p>
                </div>

                <Button 
                  onClick={handlePickup}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-6 text-lg mt-4"
                >
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  Выдать предмет
                </Button>
              </CardContent>
            </Card>
          )}

          {!foundItem && qrNumber && (
            <div className="text-center py-8 text-slate-400">
              <Icon name="Search" size={48} className="mx-auto mb-3 opacity-50" />
              <p>Введите QR-код и нажмите "Найти"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
