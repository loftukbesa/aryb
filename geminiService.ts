import { GoogleGenAI } from "@google/genai";
import { JokeContext } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNurseJoke = async (nurseName: string, context: JokeContext): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    let promptContext = "";
    if (context === 'patient') {
      promptContext = "Bu hemşireye bugün bakacağı hastalar atandı. Çok komik, hastane ortamındaki absürtlüklerle dalga geçen, enerji verici ama kahkaha attıran bir yorum yap.";
    } else {
      promptContext = "Bu hemşireye nöbet shifti (vardiyası) atandı. Nöbet tutmanın zorluğu, kahve ihtiyacı veya uyku hasreti üzerine çok komik, zekice bir espri yap.";
    }

    const prompt = `
      Sen hastane koridorlarının en komik, en hazırcevap karakterisin.
      Hedef Kişi: Hemşire ${nurseName}.
      Durum: ${promptContext}
      
      Kesin Kurallar:
      1. ASLA sıkıcı "başarabilirsin" tarzı motivasyon sözleri yazma. Bize gerçek mizah lazım.
      2. Hemşirelerin yaşadığı gerçek dertleri (damar yolu bulamama, agresif refakatçiler, bitmeyen orderlar, soğuyan çaylar) kullanarak "tespit gibi tespit" yap.
      3. Samimi, biraz iğneleyici ama sevecen bir dil kullan.
      4. Kısa ve vurucu olsun (maksimum 2 cümle).
      5. Sadece şakayı yaz, tırnak işareti veya açıklama ekleme.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text?.trim() || `${nurseName}, harika bir gün seni bekliyor!`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `${nurseName}, bugün senin günün! (Bağlantı hatası nedeniyle şaka yüklenemedi ama enerjin yerinde!)`;
  }
};