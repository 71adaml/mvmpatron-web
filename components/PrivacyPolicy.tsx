
import React from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Ochrona Danych Osobowych</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Zgodność z RODO (Art. 13)</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-500 hover:text-slate-900"
            aria-label="Zamknij"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto text-slate-600 leading-relaxed space-y-8 text-sm sm:text-base">
          <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-lg font-bold text-slate-900 mb-3">1. Kto jest administratorem danych?</h3>
            <p>
              Administratorem Twoich danych osobowych jest <strong>MVM Patron</strong> z siedzibą w Pisarzowicach, ul. Wrocławska 32a. Możesz się z nami skontaktować pod numerem telefonu: <strong>+48 721 456 905</strong>.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">2. Cele i podstawy przetwarzania</h3>
            <p className="mb-2">Dane przetwarzamy w następujących celach:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Realizacja usług serwisowych:</strong> naprawy opon, wulkanizacji, obsługi kół (Art. 6 ust. 1 lit. b RODO).</li>
              <li><strong>Komunikacja z asystentem AI:</strong> udzielanie odpowiedzi na Twoje zapytania techniczne (Art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes).</li>
              <li><strong>Statystyka i analityka:</strong> poprawa jakości strony internetowej (Art. 6 ust. 1 lit. a RODO – Twoja zgoda).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">3. Polityka Plików Cookie</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="p-4 font-bold text-slate-900 border-b border-slate-200">Rodzaj</th>
                    <th className="p-4 font-bold text-slate-900 border-b border-slate-200">Cel</th>
                    <th className="p-4 font-bold text-slate-900 border-b border-slate-200">Okres przechowywania</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Niezbędne (Techniczne)</td>
                    <td className="p-4">Zapewnienie działania strony, zapamiętanie zgód na cookies.</td>
                    <td className="p-4">Sesja / 6 miesięcy</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Analityczne</td>
                    <td className="p-4">Analiza ruchu w serwisie (np. Google Analytics), optymalizacja treści.</td>
                    <td className="p-4">Do 2 lat</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Marketingowe</td>
                    <td className="p-4">Wyświetlanie dopasowanych treści na platformach społecznościowych.</td>
                    <td className="p-4">Do 1 roku</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">4. Twoje prawa</h3>
            <p className="mb-2">W związku z przetwarzaniem danych przysługuje Ci szereg uprawnień:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900 text-sm mb-1">Prawo dostępu i sprostowania</p>
                <p className="text-xs">Masz wgląd w swoje dane i możesz prosić o ich poprawienie.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900 text-sm mb-1">Prawo do usunięcia</p>
                <p className="text-xs">"Prawo do bycia zapomnianym" – usuniemy dane na Twoje żądanie.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900 text-sm mb-1">Prawo do sprzeciwu</p>
                <p className="text-xs">Możesz sprzeciwić się przetwarzaniu danych w celach analitycznych.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900 text-sm mb-1">Skarga do organu</p>
                <p className="text-xs">Masz prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">5. Okres przechowywania</h3>
            <p>
              Dane przechowywane są przez okres niezbędny do realizacji celu (np. zakończenie usługi serwisowej) lub do momentu wycofania zgody przez Użytkownika, jednak nie dłużej niż wymagają tego przepisy podatkowe i księgowe.
            </p>
          </section>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 text-right">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto bg-orange-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95"
          >
            Zrozumiałem
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
