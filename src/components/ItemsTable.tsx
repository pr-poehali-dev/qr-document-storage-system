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
      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="pt-12 pb-12 text-center">
          <Icon name="Package" size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-600 text-lg">Нет активных предметов</p>
          <p className="text-slate-500 text-sm mt-2">Примите первый предмет, чтобы начать работу</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-900 flex items-center gap-2 text-base font-semibold">
          <Icon name="List" size={20} />
          Активные предметы ({items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200 hover:bg-slate-50">
                <TableHead className="text-slate-700 font-medium">QR-код</TableHead>
                <TableHead className="text-slate-700 font-medium">Предмет</TableHead>
                <TableHead className="text-slate-700 font-medium">Клиент</TableHead>
                <TableHead className="text-slate-700 font-medium">Телефон</TableHead>
                <TableHead className="text-slate-700 font-medium">Категория</TableHead>
                <TableHead className="text-slate-700 font-medium">Дата сдачи</TableHead>
                <TableHead className="text-slate-700 font-medium">К оплате</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="border-slate-200 hover:bg-slate-50">
                  <TableCell className="font-mono text-slate-700 text-sm">
                    {item.qrNumber}
                  </TableCell>
                  <TableCell className="text-slate-900 font-medium">
                    {item.itemName}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {item.firstName} {item.lastName}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {item.phone}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-300 text-slate-700 text-xs">
                      {item.category === 'documents' && 'Документы'}
                      {item.category === 'photos' && 'Фото/Карты'}
                      {item.category === 'other' && 'Другое'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {new Date(item.depositDate).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>
                    {item.pickupAmount > 0 ? (
                      <span className="text-slate-900 font-medium">{item.pickupAmount} ₽</span>
                    ) : (
                      <span className="text-slate-600">Оплачено</span>
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