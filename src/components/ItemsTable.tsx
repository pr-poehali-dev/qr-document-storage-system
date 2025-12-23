import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { Item } from '@/App';

interface ItemsTableProps {
  items: Item[];
  userRole: 'cashier' | 'admin' | 'creator';
}

export default function ItemsTable({ items }: ItemsTableProps) {
  if (items.length === 0) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-12 pb-12 text-center">
          <Icon name="Package" size={64} className="mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400 text-lg">Нет активных предметов</p>
          <p className="text-slate-500 text-sm mt-2">Примите первый предмет, чтобы начать работу</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="List" size={24} />
          Активные предметы ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-700/50">
                <TableHead className="text-slate-300">QR-код</TableHead>
                <TableHead className="text-slate-300">Предмет</TableHead>
                <TableHead className="text-slate-300">Клиент</TableHead>
                <TableHead className="text-slate-300">Телефон</TableHead>
                <TableHead className="text-slate-300">Категория</TableHead>
                <TableHead className="text-slate-300">Дата сдачи</TableHead>
                <TableHead className="text-slate-300">К оплате</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
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
                    {new Date(item.depositDate).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>
                    {item.pickupAmount > 0 ? (
                      <span className="text-orange-400 font-bold">{item.pickupAmount} ₽</span>
                    ) : (
                      <span className="text-green-400">Оплачено</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
