import React, { useEffect, useState, useRef } from 'react';
import { Assignment, JokeContext, Nurse } from '../types';
import { generateNurseJoke } from '../services/geminiService';
import { Button } from './Button';
import { ArrowLeft, Sparkles, Loader2, Quote } from 'lucide-react';

interface ResultScreenProps {
  nurses: Nurse[];
  mode: JokeContext;
  onBack: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ nurses, mode, onBack }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [joke, setJoke] = useState<string | null>(null);
  const [luckyNurse, setLuckyNurse] = useState<string>("");
  const [loadingJoke, setLoadingJoke] = useState(false);
  
  // Use a ref to prevent double-firing in StrictMode
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // 1. Perform Shuffle Logic
    const items = mode === 'patient' 
      ? ['1', '2', '3', '4'] 
      : ['1A', '1B', '2A', '2B'];
    
    // Fisher-Yates shuffle
    const shuffledItems = [...items];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }

    const newAssignments: Assignment[] = nurses.map((nurse, index) => ({
      nurseName: nurse.name,
      assignedValue: shuffledItems[index]
    }));

    setAssignments(newAssignments);

    // 2. Select Lucky Nurse for Joke
    const randomNurse = nurses[Math.floor(Math.random() * nurses.length)].name;
    setLuckyNurse(randomNurse);

    // 3. Fetch Joke from Gemini
    setLoadingJoke(true);
    generateNurseJoke(randomNurse, mode)
      .then(text => setJoke(text))
      .catch(err => setJoke("Harika bir gün olsun!"))
      .finally(() => setLoadingJoke(false));

  }, [nurses, mode]);

  const title = mode === 'patient' ? "Hasta Eşleşmeleri" : "Shift Dağılımı";
  const jokeTitle = mode === 'patient' ? "Güne Hazır Ol!" : "Biraz Gülümse";
  const iconColor = mode === 'patient' ? "text-cyan-600" : "text-indigo-600";
  const cardBorder = mode === 'patient' ? "border-l-4 border-l-cyan-500" : "border-l-4 border-l-indigo-500";

  return (
    <div className="w-full max-w-md mx-auto px-4 animate-in zoom-in-95 duration-300">
      
      {/* Results Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-6 border border-slate-100 mb-6">
        <h2 className={`text-xl font-bold text-slate-800 mb-6 text-center ${iconColor}`}>
          {title}
        </h2>
        
        <div className="space-y-3">
          {assignments.map((assignment, idx) => (
            <div 
              key={idx} 
              className={`flex justify-between items-center p-4 rounded-xl bg-slate-50 ${cardBorder} shadow-sm`}
            >
              <span className="font-medium text-slate-700">{assignment.nurseName}</span>
              <span className={`text-xl font-bold ${iconColor} bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100`}>
                {assignment.assignedValue}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Joke Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-100 p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-16 h-16 text-amber-500" />
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-amber-800">{jokeTitle}</h3>
        </div>

        <div className="relative min-h-[80px] flex items-center justify-center">
          {loadingJoke ? (
            <div className="flex flex-col items-center gap-2 text-amber-600/70">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-medium">Az bekle bir şey diyecem...</span>
            </div>
          ) : (
            <div className="text-center w-full">
              <p className="text-amber-900 font-medium italic leading-relaxed">
                "{joke}"
              </p>
              <p className="text-xs text-amber-600/70 mt-2 font-semibold text-right">
                — {luckyNurse} için özel
              </p>
            </div>
          )}
        </div>
      </div>

      <Button onClick={onBack} variant="outline" fullWidth className="flex items-center justify-center gap-2 mb-8">
        <ArrowLeft className="w-4 h-4" />
        Geri Dön
      </Button>

    </div>
  );
};
