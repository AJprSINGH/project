// Mock API service for chatbot interactions

const MOCK_RESPONSES = [
  "Hi! How can I assist you today?",
  "Sure, I can help with that.",
  "Let me look into that for you.",
  "That's a great question. Here's what you need to know...",
  "I understand what you're asking. The answer is...",
  "Thanks for reaching out! I'd be happy to assist with your question.",
  "I'm here to help! What specific information are you looking for?",
  "Let me check that for you. One moment please.",
  "Based on what you've told me, I would recommend...",
  "Is there anything else you'd like to know about this topic?"
];

const PERSONA_SPECIFIC_RESPONSES: Record<string, string[]> = {
  support: [
    "I see you're having an issue. Let me help troubleshoot that.",
    "Have you tried restarting the application? That often resolves this issue.",
    "I can walk you through the steps to fix this problem.",
    "Let me check if there are any known issues with that feature.",
    "Would you like me to connect you with our support team for further assistance?"
  ],
  sales: [
    "Our premium plan offers additional features that might meet your needs.",
    "We currently have a special promotion that you might be interested in.",
    "Would you like to schedule a demo with our sales team?",
    "Our pricing is competitive and offers great value for the features provided.",
    "Many of our customers find that the business plan provides the best return on investment."
  ],
  trainer: [
    "Let me show you how to use this feature efficiently.",
    "Here's a step-by-step guide to get you started.",
    "Did you know there's a shortcut for that? Let me show you.",
    "That's a common question. Here's the best way to approach it.",
    "I recommend checking out our tutorial on this topic. Would you like me to share the link?"
  ]
};

// Simulate API delay
const getRandomDelay = () => Math.floor(Math.random() * 2000) + 1000; // 1-3 seconds

// Get random response based on persona
const getRandomResponse = (personaId?: string) => {
  if (personaId && PERSONA_SPECIFIC_RESPONSES[personaId]) {
    const responses = PERSONA_SPECIFIC_RESPONSES[personaId];
    const generalResponses = MOCK_RESPONSES;
    
    // 70% chance to use persona-specific response, 30% chance to use general response
    const usePersonaResponse = Math.random() < 0.7;
    
    if (usePersonaResponse) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
};

export type MessageResponse = {
  text: string;
  timestamp: Date;
};

/**
 * Simulate sending a message to the API and getting a response
 */
export const sendMessage = async (
  message: string,
  personaId?: string
): Promise<MessageResponse> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const response = getRandomResponse(personaId);
      resolve({
        text: response,
        timestamp: new Date(),
      });
    }, getRandomDelay());
  });
};