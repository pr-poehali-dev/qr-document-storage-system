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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <Card className="w-full max-w-md shadow-2xl border-slate-700 bg-slate-800/80 backdrop-blur-sm animate-scale-in">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-sky-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="QrCode" size={40} className="text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
            Система Хранения
          </CardTitle>
          <CardDescription className="text-slate-400 text-base">
            Вход для кассира и администратора
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-200">Имя</Label>
            <Input
              id="name"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-sky-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-sky-400"
            />
          </div>

          <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-3 space-y-1 text-xs">
            <p className="text-slate-300">
              <span className="font-semibold text-sky-400">Кассир:</span> пароль 25
            </p>
            <p className="text-slate-300">
              <span className="font-semibold text-purple-400">Администратор:</span> пароль 2025
            </p>
            <p className="text-slate-300">
              <span className="font-semibold text-pink-400">Создатель:</span> пароль 202505
            </p>
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Войти
            <Icon name="LogIn" size={20} className="ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
