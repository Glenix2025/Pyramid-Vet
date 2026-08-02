import { FAQItem, ClinicInfo } from '../types';

export const PYRAMID_CLINIC_INFO: ClinicInfo = {
  name: "Pyramid Veterinary Surgery",
  taglines: [
    "Personalised service and quality care for your pets",
    "Modern, professional and affordable health care for your pets"
  ],
  phone: "07 4056-5989",
  address: "181–183 Dempsey Street",
  suburb: "Gordonvale",
  state: "QLD",
  postcode: "4865",
  bookingUrl: "https://www.pyramidvet.com.au/BookAppointmentOnline.aspx",
  facebookUrl: "https://facebook.com/pyramidvet",
  hours: {
    weekdays: "Mon–Fri: 7:30am – 1:30pm",
    saturday: "Sat: 8:00am – 11:30am",
    sunday: "Closed Sunday"
  }
};

export const FAQ_KNOWLEDGE_BASE: FAQItem[] = [
  {
    id: 1,
    question: "What services does Pyramid Veterinary Surgery offer?",
    answer: "Pyramid Veterinary Surgery offers health checks, cat and dog vaccinations, microchipping, clinical pathology, specialist referrals, medication renewal, and pet insurance guidance.",
    category: "Services",
    keywords: ["services", "general", "offer", "health checks", "vaccinations", "vaccine", "vax", "microchip", "pathology", "referrals"]
  },
  {
    id: 2,
    question: "What surgical services do you provide?",
    answer: "We provide desexing, dentistry, soft tissue surgery, ophthalmic surgery, dental services, and emergency procedures.",
    category: "Surgical",
    keywords: ["surgery", "surgical", "desexing", "spay", "neuter", "dentistry", "dental", "soft tissue", "eyes", "ophthalmic", "operations"]
  },
  {
    id: 3,
    question: "What wellbeing services do you offer?",
    answer: "We offer behavioural advice, nutritional advice, boarding advice, dog and cat care guidance, and nail clipping.",
    category: "Wellbeing",
    keywords: ["wellbeing", "behavior", "behaviour", "nutrition", "food", "diet", "boarding", "cat care", "dog care", "nails", "clipping", "grooming"]
  },
  {
    id: 4,
    question: "Do you offer preventive care?",
    answer: "Yes — we offer heartworm, intestinal worm, flea and tick, and mite prevention and treatment.",
    category: "Preventive",
    keywords: ["preventive", "prevention", "flea", "tick", "worm", "heartworm", "parasite", "mite"]
  },
  {
    id: 5,
    question: "Do you offer any alternative or integrative treatments?",
    answer: "Yes — we offer acupuncture, electroacupuncture, and low level laser therapy.",
    category: "Integrative",
    keywords: ["alternative", "integrative", "acupuncture", "electroacupuncture", "laser", "laser therapy"]
  },
  {
    id: 6,
    question: "What are your opening hours?",
    answer: "Our opening hours are Monday to Friday 7:30am–1:30pm, Saturday 8:00am–11:30am, and closed Sunday.",
    category: "Clinic Info",
    keywords: ["hours", "open", "opening", "times", "schedule", "saturday", "weekend", "closing", "time"]
  },
  {
    id: 7,
    question: "Where are you located?",
    answer: "We are located at 181–183 Dempsey Street, Gordonvale, QLD 4865.",
    category: "Clinic Info",
    keywords: ["location", "address", "where", "find", "map", "directions", "gordonvale", "street", "dempsey"]
  },
  {
    id: 8,
    question: "How do I book an appointment?",
    answer: "You can book online via our Book Appointment Online page, or call us directly on 07 4056-5989.",
    category: "Appointments",
    keywords: ["book", "booking", "appointment", "consultation", "schedule", "reserve", "make an appointment"]
  },
  {
    id: 9,
    question: "Do you have an after-hours service?",
    answer: "Yes, our same phone number (07 4056-5989) is listed for after-hours contact.",
    category: "Clinic Info",
    keywords: ["after hours", "emergency", "urgent", "night", "weekend emergency", "closed", "afterhours"]
  },
  {
    id: 10,
    question: "Do you accept pet insurance?",
    answer: "The clinic doesn't process insurance claims directly, but we actively recommend pet insurance and can help clients choose a policy that suits their pet.",
    category: "Clinic Info",
    keywords: ["insurance", "pet insurance", "claims", "cover", "policy"]
  },
  {
    id: 11,
    question: "What payment methods do you accept?",
    answer: "Payment methods are not specified on our website. Please call us directly on 07 4056-5989 to confirm our accepted payment options.",
    category: "Clinic Info",
    keywords: ["payment", "pay", "card", "cash", "zip", "afterpay", "cost", "price", "methods"]
  },
  {
    id: 12,
    question: "Can I get medications renewed?",
    answer: "Yes, medication renewal is offered as a regular service at Pyramid Veterinary Surgery.",
    category: "Services",
    keywords: ["medication", "medicine", "script", "prescription", "renew", "renewal", "refill", "pills"]
  },
  {
    id: 13,
    question: "Do you handle specialist referrals?",
    answer: "Yes, specialist referrals are available when specialized care is needed for your pet.",
    category: "Services",
    keywords: ["specialist", "referral", "refer", "second opinion", "specialized"]
  },
  {
    id: 14,
    question: "How can I contact the clinic directly?",
    answer: "You can call us directly on 07 4056-5989, or use the contact form on our official website.",
    category: "Clinic Info",
    keywords: ["contact", "phone", "call", "email", "number", "speak", "reach", "inquire"]
  }
];

/**
 * Deterministic local matcher for client fallback / zero-latency matching.
 */
export function matchFAQLocal(userQuery: string): {
  found: boolean;
  item?: FAQItem;
  text: string;
  isOutsideFAQ: boolean;
} {
  const queryLower = userQuery.toLowerCase().trim();

  if (!queryLower) {
    return {
      found: false,
      text: "Please feel free to ask a question about our services, location, hours, or appointment bookings!",
      isOutsideFAQ: false
    };
  }

  // Check emergency keywords explicitly
  const emergencyKeywords = ["poison", "hit by car", "bleeding", "collapsed", "unconscious", "choking", "dying", "seizure", "urgent emergency"];
  const isEmergency = emergencyKeywords.some(k => queryLower.includes(k));

  if (isEmergency) {
    return {
      found: false,
      text: "For urgent medical concerns or emergencies, please contact our team immediately: Please call us on 07 4056-5989.",
      isOutsideFAQ: true
    };
  }

  // Exact or keyword matching across knowledge base
  let bestMatch: FAQItem | null = null;
  let maxScore = 0;

  for (const item of FAQ_KNOWLEDGE_BASE) {
    let score = 0;
    const qLower = item.question.toLowerCase();

    // Check exact question phrase
    if (qLower.includes(queryLower) || queryLower.includes(qLower)) {
      score += 10;
    }

    // Check keywords
    for (const kw of item.keywords) {
      if (queryLower.includes(kw)) {
        score += 3;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore >= 3) {
    return {
      found: true,
      item: bestMatch,
      text: bestMatch.answer,
      isOutsideFAQ: false
    };
  }

  // Outside FAQ fallback
  return {
    found: false,
    text: "I want to make sure you get the accurate information for your pet. For specific medical concerns, pricing details, or unlisted questions, please call us on 07 4056-5989.",
    isOutsideFAQ: true
  };
}
