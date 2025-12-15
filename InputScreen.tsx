import React from 'react';
import { Nurse } from '../types';
import { Button } from './Button';
import { Users, CalendarClock, Activity } from 'lucide-react';

interface InputScreenProps {
  nurses: Nurse[];
  onNameChange: (id: number, name: string) => void;
  onPatientShare: () => void;
  onShiftDetermine: () => void;
}

export const InputScreen: React.FC<InputScreenProps> = ({
  nurses,
  onNameChange,
  onPatientShare,
  onShiftDetermine,
}) => {
  const allNamesFilled = nurses.every(n => n.name.trim().length > 0);

  return (
    <div className="w-full max-w-md mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-cyan-600" />
          <h2 className="text-lg font-semibold text-slate-800">İsimleri Girin</h2>
        </div>

        <div className="space-y-4 mb-8">
          {nurses.map((nurse) => (
            <div key={nurse.id} className="relative group">
              <label 
                htmlFor={`nurse-${nurse.id}`}
                className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-slate-400 group-focus-within:text-cyan-600 transition-colors"
              >
                Hemşire {nurse.id} Adı
              </label>
              <input
                id={`nurse-${nurse.id}`}
                type="text"
                value={nurse.name}
                onChange={(e) => onNameChange(nurse.id, e.target.value)}
                placeholder=""
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none transition-all"
              />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <Button 
            onClick={onPatientShare} 
            disabled={!allNamesFilled} 
            fullWidth 
            variant="primary"
            className="flex items-center justify-center gap-2"
          >
            <Activity className="w-4 h-4" />
            Hasta Paylaş
          </Button>
          
          <Button 
            onClick={onShiftDetermine} 
            disabled={!allNamesFilled} 
            fullWidth 
            variant="secondary"
            className="flex items-center justify-center gap-2"
          >
            <CalendarClock className="w-4 h-4" />
            Shift Belirle
          </Button>
        </div>

        {!allNamesFilled && (
          <p className="text-center text-xs text-amber-500 mt-4 font-medium">
            Lütfen devam etmek için tüm isimleri doldurun.
          </p>
        )}
      </div>
    </div>
  );
};