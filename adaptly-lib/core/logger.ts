// Framework-style logging utility
export interface LogConfig {
  enabled?: boolean;
  level?: "debug" | "info" | "warn" | "error";
}

class AdaptlyLogger {
  private config: LogConfig = {
    enabled: true,
    level: "info",
  };

  setConfig(config: LogConfig) {
    this.config = { ...this.config, ...config };
  }

  private shouldLog(level: string): boolean {
    if (!this.config.enabled) return false;

    const levels = ["debug", "info", "warn", "error"];
    const currentLevelIndex = levels.indexOf(this.config.level || "info");
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex >= currentLevelIndex;
  }

  debug(...args: unknown[]) {
    if (this.shouldLog("debug")) {
      console.log("[Adaptly Debug]", ...args);
    }
  }

  info(...args: unknown[]) {
    if (this.shouldLog("info")) {
      console.log("[Adaptly Info]", ...args);
    }
  }

  warn(...args: unknown[]) {
    if (this.shouldLog("warn")) {
      console.warn("[Adaptly Warn]", ...args);
    }
  }

  error(...args: unknown[]) {
    if (this.shouldLog("error")) {
      console.error("[Adaptly Error]", ...args);
    }
  }
}

export const adaptlyLogger = new AdaptlyLogger();
