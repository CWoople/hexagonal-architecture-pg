const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
const DEFAULT_LEVEL = process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug');
const currentLevel = LEVELS[DEFAULT_LEVEL as keyof typeof LEVELS] ?? LEVELS.debug;

export const logger = {
  debug: (...args: unknown[]) => {
    if (currentLevel <= LEVELS.debug) console.debug('[debug]', ...args);
  },
  info: (...args: unknown[]) => {
    if (currentLevel <= LEVELS.info) console.info('[info]', ...args);
  },
  warn: (...args: unknown[]) => {
    if (currentLevel <= LEVELS.warn) console.warn('[warn]', ...args);
  },
  error: (...args: unknown[]) => {
    if (currentLevel <= LEVELS.error) console.error('[error]', ...args);
  }
};

export default logger;
