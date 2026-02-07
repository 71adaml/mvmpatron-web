
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// Added ChatMessage interface to fix the error in components/AIAssistant.tsx
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
