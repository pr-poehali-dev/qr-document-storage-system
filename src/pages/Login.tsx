import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import type { User } from '@/App';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!name) {
      toast.error('Введите имя');
      return;
    }

    if (!password) {
      toast.error('Введите пароль');
      return;
    }

    if (password === '2025') {
      onLogin({ role: 'admin', name });
      toast.success(`Добро пожаловать, Администратор ${name}!`);
    } else if (password === '25') {
      onLogin({ role: 'cashier', name });
      toast.success(`Добро пожаловать, Кассир ${name}!`);
    } else if (password === '202505') {
      onLogin({ role: 'creator', name });
      toast.success(`Добро пожаловать, Создатель ${name}!`);
    } else {
      toast.error('Неверный пароль');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <Card className="w-full max-w-md shadow-xl border-slate-200 bg-white animate-scale-in">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
            <Icon name="Building2" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl font-semibold text-slate-900">
            Система Хранения Документов
          </CardTitle>
          <CardDescription className="text-slate-600">
            Авторизация сотрудников
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-medium">Имя сотрудника</Label>
            <Input
              id="name"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-medium">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
            />
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-6 text-base shadow-sm transition-all"
          >
            Войти в систему
            <Icon name="LogIn" size={18} className="ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}