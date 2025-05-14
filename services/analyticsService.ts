/**
 * Mock analytics service for tracking chat events
 * In a real implementation, this would send events to an analytics platform
 */

export type EventPayload = Record<string, any>;

/**
 * Log a chat-related event
 * @param eventName The name of the event (e.g., 'message_sent', 'bot_responded')
 * @param payload Additional data related to the event
 */
export const logChatEvent = (eventName: string, payload: EventPayload = {}) => {
  // Add timestamp to all events
  const eventData = {
    ...payload,
    timestamp: new Date().toISOString(),
    eventName,
  };

  // In development, log to console
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Analytics]', eventName, eventData);
  }

  // In a real implementation, this would send the event to an analytics service
  // Example:
  // return fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(eventData),
  // });
  
  return Promise.resolve({ success: true });
};

/**
 * Initialize analytics tracking
 * In a real implementation, this might set up user identification or session tracking
 */
export const initAnalytics = () => {
  logChatEvent('session_started', {
    referrer: typeof window !== 'undefined' ? document.referrer : '',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
  });
  
  return {
    trackPageView: (page: string) => logChatEvent('page_view', { page }),
    trackEvent: logChatEvent,
  };
};

export default {
  logChatEvent,
  initAnalytics,
};