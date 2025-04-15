/**
 * ErrorLog.ts
 * 
 * A utility for logging and tracking errors that occur in the application.
 * This helps with debugging and identifying issues.
 */

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum ErrorCategory {
  API = 'API',
  UI = 'UI',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  DATA = 'DATA',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorLogEntry {
  timestamp: string;
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  componentName?: string;
  userId?: string;
  metadata?: Record<string, any>;
  handled: boolean;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private logs: ErrorLogEntry[] = [];
  private isEnabled: boolean = true;
  private maxLogSize: number = 200;

  private constructor() {
    // Initialize with any stored logs from localStorage
    try {
      const storedLogs = localStorage.getItem('whatsappifiyer_error_logs');
      if (storedLogs) {
        this.logs = JSON.parse(storedLogs);
      }
    } catch (error) {
      console.error('Failed to load stored error logs:', error);
    }

    // Set up global error handler
    this.setupGlobalErrorHandler();
  }

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  private setupGlobalErrorHandler(): void {
    window.addEventListener('error', (event) => {
      this.logError(
        event.error || new Error(event.message),
        ErrorSeverity.HIGH,
        ErrorCategory.UNKNOWN,
        undefined,
        undefined,
        { 
          lineNo: event.lineno, 
          colNo: event.colno, 
          filename: event.filename 
        },
        false
      );
    });

    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason));
      
      this.logError(
        error,
        ErrorSeverity.HIGH,
        ErrorCategory.UNKNOWN,
        undefined,
        undefined,
        { unhandledPromise: true },
        false
      );
    });
  }

  public logError(
    error: Error | string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    category: ErrorCategory = ErrorCategory.UNKNOWN,
    componentName?: string,
    userId?: string,
    metadata?: Record<string, any>,
    handled: boolean = true
  ): void {
    if (!this.isEnabled) return;

    const message = typeof error === 'string' ? error : error.message;
    const stack = typeof error === 'string' ? undefined : error.stack;

    const logEntry: ErrorLogEntry = {
      timestamp: new Date().toISOString(),
      message,
      stack,
      severity,
      category,
      componentName,
      userId,
      metadata,
      handled,
    };

    this.logs.push(logEntry);
    
    // Trim logs if they exceed the maximum size
    if (this.logs.length > this.maxLogSize) {
      this.logs = this.logs.slice(this.logs.length - this.maxLogSize);
    }

    // Store in localStorage
    try {
      localStorage.setItem('whatsappifiyer_error_logs', JSON.stringify(this.logs));
    } catch (storageError) {
      console.error('Failed to store error logs:', storageError);
    }

    // Log to console for immediate visibility
    if (severity === ErrorSeverity.HIGH || severity === ErrorSeverity.CRITICAL) {
      console.error('Critical Error:', logEntry);
    }

    // Optional: Send to error tracking service
    this.sendToErrorTrackingService(logEntry);
  }

  public getLogs(severity?: ErrorSeverity, category?: ErrorCategory, limit: number = 100): ErrorLogEntry[] {
    let filteredLogs = this.logs;
    
    if (severity) {
      filteredLogs = filteredLogs.filter(log => log.severity === severity);
    }
    
    if (category) {
      filteredLogs = filteredLogs.filter(log => log.category === category);
    }
    
    return filteredLogs.slice(-limit);
  }

  public clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('whatsappifiyer_error_logs');
  }

  public enableLogging(enable: boolean): void {
    this.isEnabled = enable;
  }

  private sendToErrorTrackingService(logEntry: ErrorLogEntry): void {
    // Implementation for sending logs to an error tracking service
    // This is a placeholder for future implementation
  }
}

export const errorLogger = ErrorLogger.getInstance();

// Helper functions for common error categories
export const logApiError = (
  error: Error | string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  componentName?: string,
  metadata?: Record<string, any>,
  userId?: string
) => {
  errorLogger.logError(error, severity, ErrorCategory.API, componentName, userId, metadata);
};

export const logNetworkError = (
  error: Error | string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  componentName?: string,
  metadata?: Record<string, any>,
  userId?: string
) => {
  errorLogger.logError(error, severity, ErrorCategory.NETWORK, componentName, userId, metadata);
};

export const logValidationError = (
  error: Error | string,
  severity: ErrorSeverity = ErrorSeverity.LOW,
  componentName?: string,
  metadata?: Record<string, any>,
  userId?: string
) => {
  errorLogger.logError(error, severity, ErrorCategory.VALIDATION, componentName, userId, metadata);
};

export const logUiError = (
  error: Error | string,
  severity: ErrorSeverity = ErrorSeverity.MEDIUM,
  componentName?: string,
  metadata?: Record<string, any>,
  userId?: string
) => {
  errorLogger.logError(error, severity, ErrorCategory.UI, componentName, userId, metadata);
};
