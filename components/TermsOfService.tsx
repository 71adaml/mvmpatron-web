
import React from 'react';

interface TermsOfServiceProps {
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Regulamin Serwisu Internetowego</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}</p>
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
        
        {/* Content */}
        <div className="p-8 overflow-y-auto text-slate-600 leading-relaxed space-y-8 text-sm sm:text-base">
          
          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Postanowienia ogólne
            </h3>
            <p className="mb-3">
              Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem mvm-patron.pl (dalej: „Serwis”).
            </p>
            <p>
              Właścicielem Serwisu oraz Administratorem danych jest: <br/>
              <strong className="text-slate-900">MVM Patron</strong><br/>
              z siedzibą pod adresem: <strong className="text-slate-900">ul. Wrocławska 32a, 55-330 Pisarzowice</strong><br/>
              Kontakt: <strong className="text-slate-900">+48 721 456 905</strong>
            </p>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              Definicje
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Użytkownik</strong> – każda osoba fizyczna korzystająca z Serwisu.</li>
              <li><strong>Asystent AI</strong> – interaktywny system oparty na algorytmach sztucznej inteligencji, służący do udzielania informacji o ofercie.</li>
              <li><strong>Usługi Elektroniczne</strong> – usługi świadczone drogą elektroniczną (na odległość), poprzez przekaz danych na indywidualne żądanie Użytkownika.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">3</span>
              Rodzaj i zakres Usług Elektronicznych
            </h3>
            <p className="mb-3">Administrator świadczy za pośrednictwem Serwisu następujące usługi:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Udostępnianie treści o charakterze informacyjnym dotyczących serwisu opon, wulkanizacji oraz sprzedaży akcesoriów.</li>
              <li>Umożliwienie interakcji z Asystentem AI w celu uzyskania wstępnych informacji technicznych.</li>
              <li>Udostępnianie interaktywnej mapy lokalizacyjnej.</li>
              <li>Udostępnianie mechanizmu bezpośredniego nawiązywania połączeń telefonicznych („Click to Call”).</li>
            </ul>
          </section>

          <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">4</span>
              Zasady korzystania z Asystenta AI
            </h3>
            <p className="mb-3">
              Asystent AI (MVM Patron AI) generuje odpowiedzi w oparciu o modele przetwarzania języka naturalnego. Użytkownik przyjmuje do wiadomości, że:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-medium">
              <li>Odpowiedzi Asystenta AI mają charakter wyłącznie informacyjny i nie stanowią opinii technicznej ani wiążącej oferty handlowej.</li>
              <li>W sprawach dotyczących bezpieczeństwa jazdy, doboru opon lub wycen indywidualnych, informacje uzyskane od AI muszą zostać każdorazowo zweryfikowane telefonicznie z pracownikiem warsztatu pod numerem: +48 721 456 905.</li>
              <li>Administrator nie ponosi odpowiedzialności za decyzje podjęte wyłącznie na podstawie konwersacji z AI bez uprzedniej konsultacji z ekspertem.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">5</span>
              Zapytania i rezerwacje
            </h3>
            <p>
              Wszelkie informacje o dostępnych terminach, prezentowane w Serwisie lub przez Asystenta AI, mają charakter poglądowy. Wiążąca rezerwacja terminu następuje wyłącznie po jej potwierdzeniu przez pracownika MVM Patron drogą telefoniczną lub osobiście.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">6</span>
              Prawa i obowiązki Użytkownika
            </h3>
            <p className="mb-3">Użytkownik zobowiązany jest do:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Korzystania z Serwisu w sposób zgodny z prawem oraz dobrymi obyczajami.</li>
              <li>Niedostarczania treści o charakterze bezprawnym, w tym spamu lub złośliwego oprogramowania.</li>
              <li>Niewykorzystywania mechanizmów automatycznych do pobierania treści Serwisu bez pisemnej zgody Administratora.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">7</span>
              Reklamacje i pomoc techniczna
            </h3>
            <p className="mb-3">
              Reklamacje dotyczące działania Serwisu można zgłaszać pod numerem telefonu: +48 721 456 905 lub listownie na adres siedziby.
            </p>
            <p>
              Administrator rozpatruje reklamacje w terminie 14 dni od ich otrzymania. Odpowiedź zostanie przesłana na wskazany przez Użytkownika kanał kontaktu.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">8</span>
              Ochrona Danych Osobowych (RODO)
            </h3>
            <p>
              Zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies zostały szczegółowo opisane w <strong>Polityce Prywatności</strong> dostępnej w stopce Serwisu. Administrator zapewnia realizację praw Użytkownika wynikających z Ogólnego Rozporządzenia o Ochronie Danych (RODO).
            </p>
          </section>

          <section>
            <h3 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">9</span>
              Postanowienia końcowe
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Administrator zastrzega sobie prawo do zmiany niniejszego Regulaminu. Zmiany wchodzą w życie z dniem ich opublikowania w Serwisie.</li>
              <li>W sprawach nieuregulowanych zastosowanie mają przepisy Kodeksu Cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.</li>
              <li>Wszelkie spory będą rozstrzygane przez właściwe polskie sądy powszechne.</li>
            </ul>
          </section>

        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">Korzystając z serwisu, akceptujesz powyższe zasady.</p>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto bg-orange-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 active:scale-95"
          >
            Akceptuję Regulamin
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
