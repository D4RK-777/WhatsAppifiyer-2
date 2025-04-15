export interface MessageTemplate {
  id: string;
  name: string;
  category: 'utility' | 'authentication' | 'marketing' | 'service';
  content: string;
  description?: string;
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  // Service Messages (Customer Service)
  {
    id: 'customer-inquiry-response',
    name: 'Customer Inquiry Response',
    category: 'service',
    description: 'Respond to a customer question about products or services',
    content: 'Thank you for reaching out to us about {{1}}. We appreciate your interest in our products/services.\n\nRegarding your question, {{2}}\n\nIf you have any further questions, please don\'t hesitate to ask. We\'re here to help!\n\nBest regards,\nCustomer Support Team'
  },
  {
    id: 'issue-resolution-response',
    name: 'Issue Resolution Response',
    category: 'service',
    description: 'Respond to a customer complaint or issue',
    content: 'Thank you for bringing this issue to our attention. We sincerely apologize for the inconvenience you\'ve experienced with {{1}}.\n\nWe\'ve looked into the matter and {{2}}\n\nWe value your business and are committed to ensuring your satisfaction. Please let us know if there\'s anything else we can assist you with.\n\nBest regards,\nCustomer Support Team'
  },
  {
    id: 'product-information',
    name: 'Product Information',
    category: 'service',
    description: 'Provide detailed information about a product',
    content: 'Thank you for your interest in our {{1}}. Here are the details you requested:\n\nProduct: {{1}}\nPrice: {{2}}\nAvailability: {{3}}\nKey Features:\n- {{4}}\n- {{5}}\n- {{6}}\n\nWould you like me to provide any additional information or help you place an order?\n\nBest regards,\nSales Team'
  },

  // Utility Templates
  {
    id: 'order-confirmation-template',
    name: 'Order Confirmation',
    category: 'utility',
    description: 'Confirm order details after purchase',
    content: 'Thank you for your order!\n\nOrder #: {{1}}\nDate: {{2}}\n\nItems:\n{{3}}\n\nTotal: {{4}}\n\nEstimated delivery: {{5}}\n\nYou can track your order status here: {{6}}\n\nIf you have any questions about your order, please reply to this message.\n\nThank you for shopping with us!'
  },
  {
    id: 'shipping-notification-template',
    name: 'Shipping Notification',
    category: 'utility',
    description: 'Notify customer that their order has shipped',
    content: 'Good news! Your order has shipped.\n\nOrder #: {{1}}\nShipped on: {{2}}\n\nTracking #: {{3}}\nCarrier: {{4}}\n\nEstimated delivery: {{5}}\n\nTrack your package: {{6}}\n\nIf you have any questions, please reply to this message.\n\nThank you for your business!'
  },
  {
    id: 'appointment-reminder-template',
    name: 'Appointment Reminder',
    category: 'utility',
    description: 'Remind customer of upcoming appointment',
    content: 'Reminder: You have an upcoming appointment.\n\nService: {{1}}\nDate: {{2}}\nTime: {{3}}\nLocation: {{4}}\n\nPlease arrive 10 minutes early.\n\nNeed to reschedule? Reply to this message or call us at {{5}}.\n\nWe look forward to seeing you!'
  },
  {
    id: 'payment-receipt-template',
    name: 'Payment Receipt',
    category: 'utility',
    description: 'Send receipt after payment is processed',
    content: 'Payment Receipt\n\nTransaction ID: {{1}}\nDate: {{2}}\nAmount: {{3}}\nPayment Method: {{4}}\n\nFor: {{5}}\n\nThank you for your payment!\n\nIf you have any questions about this transaction, please contact our billing department at {{6}}.'
  },

  // Authentication Templates
  {
    id: 'verification-code-template',
    name: 'Verification Code',
    category: 'authentication',
    description: 'Send one-time passcode for account verification',
    content: 'Your verification code is: {{1}}\n\nThis code will expire in 10 minutes.\n\nDo not share this code with anyone.'
  },
  {
    id: 'login-alert-template',
    name: 'Login Alert',
    category: 'authentication',
    description: 'Alert user of new login to their account',
    content: 'We detected a new login to your account.\n\nDevice: {{1}}\nLocation: {{2}}\nTime: {{3}}\n\nIf this was you, no action is needed.\n\nIf you didn\'t login recently, please secure your account immediately by resetting your password.'
  },

  // Marketing Templates
  {
    id: 'product-launch-template',
    name: 'Product Launch',
    category: 'marketing',
    description: 'Announce a new product or service',
    content: '🎉 Introducing {{1}} 🎉\n\nWe\'re excited to announce our newest {{2}}!\n\nKey features:\n✅ {{3}}\n✅ {{4}}\n✅ {{5}}\n\nSpecial launch price: {{6}}\n\nLearn more: {{7}}\n\nLimited time offer! Order now to be among the first to experience it.'
  },
  {
    id: 'special-offer-template',
    name: 'Special Offer',
    category: 'marketing',
    description: 'Promote a special deal or discount',
    content: '🔥 SPECIAL OFFER 🔥\n\n{{1}} OFF {{2}}!\n\nUse code: {{3}}\n\nValid until: {{4}}\n\nShop now: {{5}}\n\nDon\'t miss out on this limited-time offer!'
  },
  {
    id: 'event-invitation-template',
    name: 'Event Invitation',
    category: 'marketing',
    description: 'Invite customers to a business event',
    content: 'You\'re invited to {{1}}!\n\nJoin us for {{2}} where you\'ll learn about {{3}}.\n\nDate: {{4}}\nTime: {{5}}\nLocation: {{6}}\n\nRegister here: {{7}}\n\nSpaces are limited, so reserve your spot today!'
  },
  {
    id: 'back-in-stock-template',
    name: 'Back in Stock',
    category: 'marketing',
    description: 'Notify customers when a product is back in stock',
    content: 'Good news! {{1}} is back in stock.\n\nYou expressed interest in this item, and we\'re happy to let you know it\'s now available.\n\nPrice: {{2}}\n\nShop now before it sells out again: {{3}}\n\nThank you for your patience!'
  }
];

// Function to get templates by category
export const getTemplatesByCategory = (category: string): MessageTemplate[] => {
  return MESSAGE_TEMPLATES.filter(template => template.category === category);
};

// Function to get all template categories
export const getTemplateCategories = (): string[] => {
  const categories = new Set(MESSAGE_TEMPLATES.map(template => template.category));
  return Array.from(categories);
};
