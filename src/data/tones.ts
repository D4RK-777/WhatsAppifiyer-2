import { ToneOfVoice } from '../types/models';

export const tones: ToneOfVoice[] = [
  {
    id: 'friendly',
    name: 'Friendly & Approachable',
    description: 'Warm, conversational tone that builds rapport with customers',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clear, concise, and business-appropriate communication',
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Relaxed and informal, like talking to a friend',
  },
  {
    id: 'enthusiastic',
    name: 'Enthusiastic',
    description: 'Upbeat and excited, great for promotions and positive news',
  },
  {
    id: 'empathetic',
    name: 'Empathetic',
    description: 'Understanding and compassionate, ideal for support scenarios',
  },
  {
    id: 'direct',
    name: 'Direct & Concise',
    description: 'Straight to the point, no fluff, perfect for busy customers',
  },
];

export default tones;
