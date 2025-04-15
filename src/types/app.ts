import { Model, UseCase } from './models';

export interface GenerateMessageParams {
  content: string;
  useCase: UseCase;
  model: Model;
}

export interface GenerateMessageResult {
  message: string;
  error?: string;
}

export interface SavedMessage {
  id: string;
  message: string;
  useCase: string;
  timestamp: number;
}
