import { describe, it, expect } from 'vitest';
import { GetHealthStatusUseCase } from './GetHealthStatus.js';
import { SystemDegradedError, VersionInfoMissingError } from './errors/HealthErrors.js';
import type { SystemInfoPort } from '../ports/SystemInfoPort.js';

describe('GetHealthStatusUseCase', () => {
  it('returns OK when version present and memory low', async () => {
    const mockSystem: SystemInfoPort = {
      getAppVersion: async () => '1.0.0',
      getUptimeSeconds: () => 42,
      getMemoryUsageMB: () => 100
    };

    const useCase = new GetHealthStatusUseCase(mockSystem);
    const result = await useCase.execute();

    expect(result.status).toBe('OK');
    expect(result.version).toBe('1.0.0');
  });

  it('throws VersionInfoMissingError when version unknown', async () => {
    const mockSystem: SystemInfoPort = {
      getAppVersion: async () => 'unknown',
      getUptimeSeconds: () => 1,
      getMemoryUsageMB: () => 10
    };

    const useCase = new GetHealthStatusUseCase(mockSystem);
    await expect(useCase.execute()).rejects.toBeInstanceOf(VersionInfoMissingError);
  });

  it('throws SystemDegradedError when memory high', async () => {
    const mockSystem: SystemInfoPort = {
      getAppVersion: async () => '1.0.0',
      getUptimeSeconds: () => 1,
      getMemoryUsageMB: () => 600
    };

    const useCase = new GetHealthStatusUseCase(mockSystem);
    await expect(useCase.execute()).rejects.toBeInstanceOf(SystemDegradedError);
  });
});
