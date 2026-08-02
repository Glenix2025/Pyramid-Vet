export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'Services' | 'Surgical' | 'Wellbeing' | 'Preventive' | 'Integrative' | 'Clinic Info' | 'Appointments';
  keywords: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  isOutsideFAQ?: boolean;
  suggestedActions?: {
    type: 'phone' | 'booking' | 'location' | 'facebook';
    label: string;
    urlOrNumber: string;
  }[];
  faqSourceId?: number;
}

export interface ClinicInfo {
  name: string;
  taglines: string[];
  phone: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  bookingUrl: string;
  facebookUrl: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}
