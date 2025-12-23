import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import QRCode from 'react-qr-code';
import type { Item } from '@/App';

interface NewItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Item) => void;
  userName: string;
}

export default function NewItemDialog({ isOpen, onClose, onAddItem, userName }: NewItemDialogProps) {
  const [formData, setFormData] = useState({
    qrNumber: '',
    itemName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    depositDate: new Date().toISOString().split('T')[0],
    pickupDate: '',
    depositAmount: '',
    pickupAmount: '',
    category: 'other' as 'documents' | 'photos' | 'other'
  });
  
  const [showQR, setShowQR] = useState(false);

  const generateQR = () => {
    const qr = `QR-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setFormData({ ...formData, qrNumber: qr });
  };

  const handleSubmit = () => {
    if (!formData.qrNumber || !formData.itemName || !formData.firstName || !formData.lastName || !formData.phone) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    const newItem: Item = {
      id: Date.now().toString(),
      qrNumber: formData.qrNumber,
      itemName: formData.itemName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      depositDate: formData.depositDate,
      pickupDate: formData.pickupDate,
      depositAmount: Number(formData.depositAmount) || 0,
      pickupAmount: Number(formData.pickupAmount) || 0,
      category: formData.category,
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: userName
    };

    onAddItem(newItem);
    toast.success(`Предмет принят! QR: ${formData.qrNumber}`);
    setShowQR(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    setFormData({
      qrNumber: '',
      itemName: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      depositDate: new Date().toISOString().split('T')[0],
      pickupDate: '',
      depositAmount: '',
      pickupAmount: '',
      category: 'other'
    });
    setShowQR(false);
    onClose();
  };

  if (showQR) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">QR-код создан!</DialogTitle>
            <DialogDescription className="text-slate-400">
              Сохраните или распечатайте QR-код
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center">
              <QRCode value={formData.qrNumber} size={200} />
              <p className="mt-4 font-bold text-lg text-slate-900">{formData.qrNumber}</p>
              <p className="text-slate-600 text-sm mt-1">{formData.itemName}</p>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg space-y-2 text-sm">
              <p className="text-slate-300"><span className="font-semibold text-white">Клиент:</span> {formData.firstName} {formData.lastName}</p>
              <p className="text-slate-300"><span className="font-semibold text-white">Телефон:</span> {formData.phone}</p>
              <p className="text-slate-300"><span className="font-semibold text-white">Принял:</span> {userName}</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handlePrint} className="flex-1 bg-purple-500 hover:bg-purple-600">
                <Icon name="Printer" size={18} className="mr-2" />
                Печать
              </Button>
              <Button onClick={handleClose} className="flex-1 bg-sky-500 hover:bg-sky-600">
                <Icon name="Check" size={18} className="mr-2" />
                Готово
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Прием предмета</DialogTitle>
          <DialogDescription className="text-slate-400">
            Заполните анкету для нового предмета
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Label className="text-slate-200">QR-номер *</Label>
              <Input
                value={formData.qrNumber}
                onChange={(e) => setFormData({ ...formData, qrNumber: e.target.value })}
                placeholder="Введите или создайте"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <Button onClick={generateQR} className="mt-6 bg-purple-500 hover:bg-purple-600">
              <Icon name="RefreshCw" size={18} className="mr-2" />
              Создать QR
            </Button>
          </div>

          <div>
            <Label className="text-slate-200">Название предмета *</Label>
            <Input
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              placeholder="Паспорт, документы, фотографии..."
              className="bg-slate-700/50 border-slate-600 text-white"
            />
          </div>

          <div>
            <Label className="text-slate-200">Категория *</Label>
            <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="documents">Документы (100 мест)</SelectItem>
                <SelectItem value="photos">Фото/Карты (100 мест)</SelectItem>
                <SelectItem value="other">Другое (неограничено)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-200">Имя *</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-200">Фамилия *</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-200">Телефон *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-200">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.ru"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-200">Дата сдачи</Label>
              <Input
                type="date"
                value={formData.depositDate}
                onChange={(e) => setFormData({ ...formData, depositDate: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-200">Дата получения</Label>
              <Input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-200">Оплата при сдаче (₽)</Label>
              <Input
                type="number"
                value={formData.depositAmount}
                onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
                placeholder="0"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-slate-200">Оплата при получении (₽)</Label>
              <Input
                type="number"
                value={formData.pickupAmount}
                onChange={(e) => setFormData({ ...formData, pickupAmount: e.target.value })}
                placeholder="0"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleClose} variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
              Отмена
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить и создать QR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
