import React from 'react';
import { Stethoscope } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-8">
      <div className="bg-cyan-100 p-3 rounded-full mb-3">
        <Stethoscope className="w-8 h-8 text-cyan-600" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Hemşire Kura</h1>
      <p className="text-slate-500 text-sm mt-1">Adil Dağıtım & Motivasyon</p>
    </header>
  );
};
