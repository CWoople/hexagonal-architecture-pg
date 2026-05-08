export interface SystemInfoPort {
  getAppVersion(): Promise<string>;
  getUptimeSeconds(): number;
  getMemoryUsageMB(): number;
}