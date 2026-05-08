import type { Request, Response } from 'express';
import { GetHealthStatusUseCase } from '../../application/GetHealthStatus.js';
import { SystemDegradedError, VersionInfoMissingError } from '../../application/errors/HealthErrors.js';
import { HttpStatus } from './http/HttpStatus.js';

export class HealthController {
  constructor(private readonly healthUseCase: GetHealthStatusUseCase) {}

  async get(req: Request, res: Response): Promise<void> {
    try {
      const health = await this.healthUseCase.execute();
      
      res.status(HttpStatus.OK).json({
        message: "Health check passed. System is operational.",
        data: health
      });

    } catch (error: any) {
      if (error instanceof VersionInfoMissingError) {
        res.status(HttpStatus.NOT_FOUND).json({ 
          feature: 'HealthCheck',
          status: 'WARNING',
          message: error.message 
        });
        return;
      }

      if (error instanceof SystemDegradedError) {
        res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
          feature: 'Health',
          status: 'DEGRADED', 
          message: error.message 
        });
        return;
      }

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
        feature: 'Health',
        status: 'CRITICAL_FAILURE',
        message: 'The health check process encountered an unexpected infrastructure error.' 
      });
    }
  }
}