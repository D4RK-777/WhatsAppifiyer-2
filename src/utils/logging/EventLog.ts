/**
 * EventLog.ts
 * 
 * A utility for logging application events for tracking user interactions and system events.
 */

export enum EventType {
  USER_ACTION = 'USER_ACTION',
  SYSTEM_EVENT = 'SYSTEM_EVENT',
  API_CALL = 'API_CALL',
  NAVIGATION = 'NAVIGATION',
  GENERATION = 'GENERATION',
}

export interface EventLogEntry {
  timestamp: string;
  type: EventType;
  action: string;
  details?: any;
  userId?: string;
}

class EventLogger {
  private static instance: EventLogger;
  private logs: EventLogEntry[] = [];
  private isEnabled: boolean = true;
  private maxLogSize: number = 1000;

  private constructor() {
    // Initialize with any stored logs from localStorage
    try {
      const storedLogs = localStorage.getItem('whatsappifiyer_event_logs');
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs);
      }
    } catch (error) {
      console.error('Failed to load stored event logs:', error);
    }
  }

  public static getInstance(): EventLogger {
    if (!EventLogger.instance) {
      EventLogger.instance = new EventLogger();
    }
    return EventLogger.instance;
  }

  public log(type: EventType, action: string, details?: any, userId?: string): void {
    if (!this.isEnabled) return;

    const logEntry: EventLogEntry = {
      timestamp: new Date().toISOString(),
      type,
      action,
      details,
      userId,
    };

    this.logs.push(logEntry);
    
    // Trim logs if they exceed the maximum size
    if (this.logs.length > this.maxLogSize) {
      this.logs = this.logs.slice(this.logs.length - this.maxLogSize);
    }

    // Store in localStorage
    try {
      localStorage.setItem('whatsappifiyer_event_logs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to store event logs:', error);
    }

    // Optional: Send to analytics service
    this.sendToAnalytics(logEntry);
  }

  public getLogs(type?: EventType, limit: number = 100): EventLogEntry[] {
    if (type) {
      return this.logs
        .filter(log => log.type === type)
        .slice(-limit);
    }
    return this.logs.slice(-limit);
  }

  public clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('whatsappifiyer_event_logs');
  }

  public enableLogging(enable: boolean): void {
    this.isEnabled = enable;
  }

  private sendToAnalytics(logEntry: EventLogEntry): void {
    // Implementation for sending logs to an analytics service
    // This is a placeholder for future implementation
  }
}

export const eventLogger = EventLogger.getInstance();

// Helper functions for common events
export const logUserAction = (action: string, details?: any, userId?: string) => {
  eventLogger.log(EventType.USER_ACTION, action, details, userId);
};

export const logSystemEvent = (action: string, details?: any) => {
  eventLogger.log(EventType.SYSTEM_EVENT, action, details);
};

export const logApiCall = (action: string, details?: any) => {
  eventLogger.log(EventType.API_CALL, action, details);
};

export const logNavigation = (action: string, details?: any, userId?: string) => {
  eventLogger.log(EventType.NAVIGATION, action, details, userId);
};

export const logGeneration = (action: string, details?: any, userId?: string) => {
  eventLogger.log(EventType.GENERATION, action, details, userId);
};
