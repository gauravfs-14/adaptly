"use client";

import { UIAdaptation } from "./types";
import { adaptlyLogger } from "./logger";

export interface StorageConfig {
  enabled: boolean;
  key: string;
  version: string;
}

export class StorageService {
  private config: StorageConfig;
  private isClient: boolean;

  constructor(config: StorageConfig) {
    this.config = config;
    this.isClient = typeof window !== "undefined";
  }

  /**
   * Save the current UI adaptation to localStorage
   */
  saveAdaptation(adaptation: UIAdaptation): boolean {
    if (!this.config.enabled || !this.isClient) {
      return false;
    }

    try {
      const storageKey = `${this.config.key}_${this.config.version}`;
      const dataToStore = {
        adaptation,
        timestamp: Date.now(),
        version: this.config.version,
      };

      localStorage.setItem(storageKey, JSON.stringify(dataToStore));
      adaptlyLogger.debug("UI adaptation saved to localStorage:", storageKey);
      return true;
    } catch (error) {
      adaptlyLogger.error("Failed to save adaptation to localStorage:", error);
      return false;
    }
  }

  /**
   * Load the saved UI adaptation from localStorage
   */
  loadAdaptation(): UIAdaptation | null {
    if (!this.config.enabled || !this.isClient) {
      return null;
    }

    try {
      const storageKey = `${this.config.key}_${this.config.version}`;
      const storedData = localStorage.getItem(storageKey);

      if (!storedData) {
        adaptlyLogger.debug("No stored adaptation found in localStorage");
        return null;
      }

      const parsedData = JSON.parse(storedData);

      // Check if the stored data is compatible with current version
      if (parsedData.version !== this.config.version) {
        adaptlyLogger.warn(
          `Stored adaptation version (${parsedData.version}) doesn't match current version (${this.config.version}). Clearing storage.`
        );
        this.clearStorage();
        return null;
      }

      adaptlyLogger.debug(
        "UI adaptation loaded from localStorage:",
        parsedData.adaptation
      );
      return parsedData.adaptation as UIAdaptation;
    } catch (error) {
      adaptlyLogger.error(
        "Failed to load adaptation from localStorage:",
        error
      );
      return null;
    }
  }

  /**
   * Clear the stored adaptation from localStorage
   */
  clearStorage(): boolean {
    if (!this.config.enabled || !this.isClient) {
      return false;
    }

    try {
      const storageKey = `${this.config.key}_${this.config.version}`;
      localStorage.removeItem(storageKey);
      adaptlyLogger.debug("UI adaptation cleared from localStorage");
      return true;
    } catch (error) {
      adaptlyLogger.error(
        "Failed to clear adaptation from localStorage:",
        error
      );
      return false;
    }
  }

  /**
   * Check if there's a stored adaptation available
   */
  hasStoredAdaptation(): boolean {
    if (!this.config.enabled || !this.isClient) {
      return false;
    }

    try {
      const storageKey = `${this.config.key}_${this.config.version}`;
      return localStorage.getItem(storageKey) !== null;
    } catch (error) {
      adaptlyLogger.error("Failed to check for stored adaptation:", error);
      return false;
    }
  }

  /**
   * Get storage information (timestamp, version, etc.)
   */
  getStorageInfo(): { timestamp?: number; version?: string } | null {
    if (!this.config.enabled || !this.isClient) {
      return null;
    }

    try {
      const storageKey = `${this.config.key}_${this.config.version}`;
      const storedData = localStorage.getItem(storageKey);

      if (!storedData) {
        return null;
      }

      const parsedData = JSON.parse(storedData);
      return {
        timestamp: parsedData.timestamp,
        version: parsedData.version,
      };
    } catch (error) {
      adaptlyLogger.error("Failed to get storage info:", error);
      return null;
    }
  }
}
