import express from 'express';
import { NodeSystemInfoAdapter } from './adapters/outbound/NodeSystemInfoAdapter.js';
import { GetHealthStatusUseCase } from './application/GetHealthStatus.js';
import { HealthController } from './adapters/inbound/HealthController.js';

const PORT = 3000;
const app = express();
app.use(express.json());

const systemInfoAdapter = new NodeSystemInfoAdapter();
const healthUseCase = new GetHealthStatusUseCase(systemInfoAdapter);
const healthController = new HealthController(healthUseCase);

app.get('/api/v1/health', (req, res) => healthController.get(req, res));

app.listen(PORT, () => {
  console.log(`Hexagonal API server running on http://localhost:${PORT}`);
});