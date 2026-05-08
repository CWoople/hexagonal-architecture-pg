import fs from 'fs/promises';
import path from 'path';
import type { SystemInfoPort } from '../../ports/SystemInfoPort.js';

export class NodeSystemInfoAdapter implements SystemInfoPort {
  async getAppVersion(): Promise<string> {
    try {
      const versionPath = path.join(process.cwd(), 'VERSION.txt');
      const version = await fs.readFile(versionPath, 'utf-8');
      return version.trim();
    } catch (error) {
      console.error('Failed to read VERSION.txt', error);
      return 'unknown';
    }
  }

  getUptimeSeconds(): number {
    return Math.floor(process.uptime());
  }

  getMemoryUsageMB(): number {
    const memoryBytes = process.memoryUsage().rss;
    const memoryInMegabytes = memoryBytes / (1024 * 1024);
    return Math.round(memoryInMegabytes * 100) / 100;
  }
}