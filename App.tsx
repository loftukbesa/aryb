import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputScreen } from './components/InputScreen';
import { ResultScreen } from './components/ResultScreen';
import { AppView, JokeContext, Nurse } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.INPUT);
  const [nurses, setNurses] = useState<Nurse[]>([
    { id: 1, name: '' },
    { id: 2, name: '' },
    { id: 3, name: '' },
    { id: 4, name: '' },
  ]);

  const handleNameChange = (id: number, name: string) => {
    setNurses(prev => prev.map(n => n.id === id ? { ...n, name } : n));
  };

  const handlePatientShare = () => {
    setView(AppView.PATIENT_RESULT);
  };

  const handleShiftDetermine = () => {
    setView(AppView.SHIFT_RESULT);
  };

  const handleBack = () => {
    setView(AppView.INPUT);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      <Header />
      
      <main className="pb-12">
        {view === AppView.INPUT && (
          <InputScreen 
            nurses={nurses} 
            onNameChange={handleNameChange}
            onPatientShare={handlePatientShare}
            onShiftDetermine={handleShiftDetermine}
          />
        )}

        {view === AppView.PATIENT_RESULT && (
          <ResultScreen 
            nurses={nurses}
            mode="patient"
            onBack={handleBack}
          />
        )}

        {view === AppView.SHIFT_RESULT && (
          <ResultScreen 
            nurses={nurses}
            mode="shift"
            onBack={handleBack}
          />
        )}
      </main>

      {/* Footer / Credits */}
      <footer className="fixed bottom-0 w-full text-center py-4 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100 text-slate-400 text-xs">
         Kızıltepe Anestezi Yoğun Bakım için Geliştirilmiştir. ✨
      </footer>
    </div>
  );
};

export default App;
