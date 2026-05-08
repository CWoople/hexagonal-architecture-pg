import type { SystemInfoPort } from '../ports/SystemInfoPort.js';
import { SystemDegradedError, VersionInfoMissingError } from './errors/HealthErrors.js';

export class GetHealthStatusUseCase {
  constructor(private readonly systemInfo: SystemInfoPort) {}

  async execute() {
    const version = await this.systemInfo.getAppVersion();
    const memoryUsageMB = this.systemInfo.getMemoryUsageMB();
    
    // Feature-specific business rules
    if (version === 'unknown' || !version) {
      throw new VersionInfoMissingError('Could not verify application version from infrastructure.');
    }

    if (memoryUsageMB > 500) { // Arbitrary threshold for this example
      throw new SystemDegradedError(`Memory usage is critically high: ${memoryUsageMB}MB`);
    }
    
    return {
      status: 'OK',
      version,
      uptimeSeconds: this.systemInfo.getUptimeSeconds(),
      memoryUsageMB,
      timestamp: new Date().toISOString()
    };
  }
}