/**
 * ChangeLog.ts
 * 
 * A utility for tracking changes to data and content within the application.
 * This helps with auditing and tracking the history of changes.
 */

export enum ChangeType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  GENERATE = 'GENERATE',
  SAVE = 'SAVE',
}

export interface ChangeLogEntry {
  timestamp: string;
  type: ChangeType;
  entity: string;
  entityId?: string;
  changes?: {
    field: string;
    oldValue?: any;
    newValue?: any;
  }[];
  userId?: string;
  metadata?: Record<string, any>;
}

class ChangeLogger {
  private static instance: ChangeLogger;
  private logs: ChangeLogEntry[] = [];
  private isEnabled: boolean = true;
  private maxLogSize: number = 500;

  private constructor() {
    // Initialize with any stored logs from localStorage
    try {
      const storedLogs = localStorage.getItem('whatsappifiyer_change_logs');
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs);
      }
    } catch (error) {
      console.error('Failed to load stored change logs:', error);
    }
  }

  public static getInstance(): ChangeLogger {
    if (!ChangeLogger.instance) {
      ChangeLogger.instance = new ChangeLogger();
    }
    return ChangeLogger.instance;
  }

  public log(
    type: ChangeType,
    entity: string,
    entityId?: string,
    changes?: { field: string; oldValue?: any; newValue?: any }[],
    userId?: string,
    metadata?: Record<string, any>
  ): void {
    if (!this.isEnabled) return;

    const logEntry: ChangeLogEntry = {
      timestamp: new Date().toISOString(),
      type,
      entity,
      entityId,
      changes,
      userId,
      metadata,
    };

    this.logs.push(logEntry);
    
    // Trim logs if they exceed the maximum size
    if (this.logs.length > this.maxLogSize) {
      this.logs = this.logs.slice(this.logs.length - this.maxLogSize);
    }

    // Store in localStorage
    try {
      localStorage.setItem('whatsappifiyer_change_logs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to store change logs:', error);
    }
  }

  public getLogs(entity?: string, limit: number = 100): ChangeLogEntry[] {
    if (entity) {
      return this.logs
        .filter(log => log.entity === entity)
        .slice(-limit);
    }
    return this.logs.slice(-limit);
  }

  public getLogsByEntityId(entityId: string, limit: number = 100): ChangeLogEntry[] {
    return this.logs
      .filter(log => log.entityId === entityId)
      .slice(-limit);
  }

  public clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('whatsappifiyer_change_logs');
  }

  public enableLogging(enable: boolean): void {
    this.isEnabled = enable;
  }
}

export const changeLogger = ChangeLogger.getInstance();

// Helper functions for common changes
export const logCreate = (
  entity: string,
  entityId?: string,
  metadata?: Record<string, any>,
  userId?: string
) => {
  changeLogger.log(ChangeType.CREATE, entity, entityId, undefined, userId, metadata);
};

export const logUpdate = (
  entity: string,
  entityId: string,
  changes: { field: string; oldValue?: any; newValue: any }[],
  userId?: string,
  metadata?: Record<string, any>
) => {
  changeLogger.log(ChangeType.UPDATE, entity, entityId, changes, userId, metadata);
};

export const logDelete = (
  entity: string,
  entityId: string,
  userId?: string,
  metadata?: Record<string, any>
) => {
  changeLogger.log(ChangeType.DELETE, entity, entityId, undefined, userId, metadata);
};

export const logGenerate = (
  entity: string,
  entityId?: string,
  metadata?: Record<string, any>,
  userId?: string
) => {
  changeLogger.log(ChangeType.GENERATE, entity, entityId, undefined, userId, metadata);
};

export const logSave = (
  entity: string,
  entityId: string,
  metadata?: Record<string, any>,
  userId?: string
) => {
  changeLogger.log(ChangeType.SAVE, entity, entityId, undefined, userId, metadata);
};
