/**
 * Logging system index file
 * 
 * This file exports all logging utilities for easy import throughout the application.
 */

// Event Logging
export {
  eventLogger,
  logUserAction,
  logSystemEvent,
  logApiCall,
  logNavigation,
  logGeneration,
  EventType,
  type EventLogEntry,
} from './EventLog';

// Change Logging
export {
  changeLogger,
  logCreate,
  logUpdate,
  logDelete,
  logGenerate,
  logSave,
  ChangeType,
  type ChangeLogEntry,
} from './ChangeLog';

// Error Logging
export {
  errorLogger,
  logApiError,
  logNetworkError,
  logValidationError,
  logUiError,
  ErrorSeverity,
  ErrorCategory,
  type ErrorLogEntry,
} from './ErrorLog';

// Convenience function to clear all logs
export const clearAllLogs = () => {
  const { eventLogger } = require('./EventLog');
  const { changeLogger } = require('./ChangeLog');
  const { errorLogger } = require('./ErrorLog');
  
  eventLogger.clearLogs();
  changeLogger.clearLogs();
  errorLogger.clearLogs();
};

// Convenience function to enable/disable all logging
export const setLoggingEnabled = (enabled: boolean) => {
  const { eventLogger } = require('./EventLog');
  const { changeLogger } = require('./ChangeLog');
  const { errorLogger } = require('./ErrorLog');
  
  eventLogger.enableLogging(enabled);
  changeLogger.enableLogging(enabled);
  errorLogger.enableLogging(enabled);
};
