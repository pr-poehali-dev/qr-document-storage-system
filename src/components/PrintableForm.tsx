import QRCode from 'react-qr-code';

interface PrintableFormProps {
  data?: {
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
    category: string;
    createdBy: string;
  };
  isBlank?: boolean;
}

export default function PrintableForm({ data, isBlank = false }: PrintableFormProps) {
  const categoryNames = {
    documents: 'Документы',
    photos: 'Фото/Карты',
    other: 'Другое'
  };

  return (
    <div className="hidden print:block print:p-8 bg-white text-black">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pb-4 border-b-2 border-slate-800">
          <h1 className="text-3xl font-bold mb-2">АНКЕТА ПРИЁМА ПРЕДМЕТА</h1>
          <p className="text-sm text-slate-600">Система Хранения Документов</p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div className="border-b border-slate-300 pb-3">
              <p className="text-xs text-slate-600 mb-1 font-semibold">QR-КОД ПРЕДМЕТА</p>
              {!isBlank && data ? (
                <p className="text-lg font-mono font-bold">{data.qrNumber}</p>
              ) : (
                <div className="h-8 border-b border-dashed border-slate-400"></div>
              )}
            </div>

            <div className="border-b border-slate-300 pb-3">
              <p className="text-xs text-slate-600 mb-1 font-semibold">НАЗВАНИЕ ПРЕДМЕТА</p>
              {!isBlank && data ? (
                <p className="text-base">{data.itemName}</p>
              ) : (
                <div className="h-8 border-b border-dashed border-slate-400"></div>
              )}
            </div>

            <div className="border-b border-slate-300 pb-3">
              <p className="text-xs text-slate-600 mb-1 font-semibold">КАТЕГОРИЯ</p>
              {!isBlank && data ? (
                <p className="text-base">{categoryNames[data.category as keyof typeof categoryNames]}</p>
              ) : (
                <div className="h-8 border-b border-dashed border-slate-400"></div>
              )}
            </div>

            <div className="border-b border-slate-300 pb-3">
              <p className="text-xs text-slate-600 mb-1 font-semibold">ИМЯ КЛИЕНТА</p>
              {!isBlank && data ? (
                <p className="text-base">{data.firstName}</p>
              ) : (
                <div className="h-8 border-b border-dashed border-slate-400"></div>
              )}
            </div>

            <div className="border-b border-slate-300 pb-3">
              <p className="text-xs text-slate-600 mb-1 font-semibold">ФАМИЛИЯ КЛИЕНТА</p>
              {!isBlank && data ? (
                <p className="text-base">{data.lastName}</p>
              ) : (
                <div className="h-8 border-b border-dashed border-slate-400"></div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {!isBlank && data && data.qrNumber && (
              <div className="flex justify-center mb-4 p-4 bg-white border-2 border-slate-800">
                <QRCode value={data.qrNumber} size={160} />
              </div>
            )}

            <div className="border-b border-slate-300 pb-3">
              <p className="text-xs text-slate-600 mb-1 font-semibold">ТЕЛЕФОН</p>
              {!isBlank && data ? (
                <p className="text-base">{data.phone}</p>
              ) : (
                <div className="h-8 border-b border-dashed border-slate-400"></div>
              )}
            </div>

            <div className="border-b border-slate-300 pb-3">
              <p className="text-xs text-slate-600 mb-1 font-semibold">EMAIL</p>
              {!isBlank && data ? (
                <p className="text-base">{data.email || '—'}</p>
              ) : (
                <div className="h-8 border-b border-dashed border-slate-400"></div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="border-b border-slate-300 pb-3">
            <p className="text-xs text-slate-600 mb-1 font-semibold">ДАТА СДАЧИ</p>
            {!isBlank && data ? (
              <p className="text-base">{new Date(data.depositDate).toLocaleDateString('ru-RU')}</p>
            ) : (
              <div className="h-8 border-b border-dashed border-slate-400"></div>
            )}
          </div>

          <div className="border-b border-slate-300 pb-3">
            <p className="text-xs text-slate-600 mb-1 font-semibold">ДАТА ПОЛУЧЕНИЯ</p>
            {!isBlank && data && data.pickupDate ? (
              <p className="text-base">{new Date(data.pickupDate).toLocaleDateString('ru-RU')}</p>
            ) : (
              <div className="h-8 border-b border-dashed border-slate-400"></div>
            )}
          </div>

          <div className="border-b border-slate-300 pb-3">
            <p className="text-xs text-slate-600 mb-1 font-semibold">ОПЛАТА ПРИ СДАЧЕ</p>
            {!isBlank && data ? (
              <p className="text-base font-bold">{data.depositAmount > 0 ? `${data.depositAmount} ₽` : 'Не требуется'}</p>
            ) : (
              <div className="h-8 border-b border-dashed border-slate-400"></div>
            )}
          </div>

          <div className="border-b border-slate-300 pb-3">
            <p className="text-xs text-slate-600 mb-1 font-semibold">ОПЛАТА ПРИ ПОЛУЧЕНИИ</p>
            {!isBlank && data ? (
              <p className="text-base font-bold">{data.pickupAmount > 0 ? `${data.pickupAmount} ₽` : 'Не требуется'}</p>
            ) : (
              <div className="h-8 border-b border-dashed border-slate-400"></div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-2 border-slate-800">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs text-slate-600 mb-3 font-semibold">ПОДПИСЬ СОТРУДНИКА</p>
              {!isBlank && data ? (
                <div>
                  <p className="text-sm">{data.createdBy}</p>
                  <div className="h-12 border-b border-slate-400 mt-2"></div>
                </div>
              ) : (
                <div className="h-16 border-b border-slate-400"></div>
              )}
            </div>

            <div>
              <p className="text-xs text-slate-600 mb-3 font-semibold">ПОДПИСЬ КЛИЕНТА</p>
              <div className="h-16 border-b border-slate-400"></div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              Дата печати: {new Date().toLocaleDateString('ru-RU')} {new Date().toLocaleTimeString('ru-RU')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
