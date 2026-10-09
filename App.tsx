
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingInfo from './components/BookingInfo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookieBanner from './components/CookieBanner';

// The AI chat is switched off until the Gemini project has billing again.
// Set to true to bring the chat button back; the server side (/api/chat) is unchanged.
const CHAT_ENABLED = false;

const App: React.FC = () => {
  // Manage the visibility state of modals
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 text-slate-900">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <BookingInfo />
        <Contact />
      </main>

      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
        onOpenTerms={() => setIsTermsOpen(true)}
      />

      <CookieBanner onOpenPrivacy={() => setIsPrivacyOpen(true)} />

      {/* Floating Chat Button to open the AI Assistant */}
      {CHAT_ENABLED && <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 transition-all z-50 group border-2 border-white/20"
        aria-label="Otwórz asystenta AI"
      >
        <svg className="w-7 h-7 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>}

      {/* Modals and Overlays */}
      {CHAT_ENABLED && isChatOpen && <AIAssistant onClose={() => setIsChatOpen(false)} />}
      {isPrivacyOpen && <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />}
      {isTermsOpen && <TermsOfService onClose={() => setIsTermsOpen(false)} />}
    </div>
  );
};

export default App;
