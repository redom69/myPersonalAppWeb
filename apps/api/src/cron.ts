import { prisma } from '@mypaw/server';
import { IngestionService } from './app/ingestion/ingestion.service';

const ingestionService = new IngestionService();

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function monitorCpuUsage() {
  try {
    if (process.env.NODE_APP_INSTANCE === '0') {
      const pidusage = await import('pidusage');
      const stats = await pidusage.default(process.pid);
      const ingestion = await prisma.ingestion.findFirst({
        where: {
          process: false,
          error_msg: null,
        },
      });

      if (ingestion && Number(stats.cpu.toFixed(2)) < 10) {
        await ingestionService.processCompressedFile(
          ingestion.zip_data,
          ingestion.id
        );
      }
    }
  } catch (error) {
    console.error('Failed to fetch process stats', error);
  }
}

const keepRunning = true;

async function main() {
  while (keepRunning) {
    await monitorCpuUsage();
    await wait(10 * 1000);
  }
}

main()
  .then()
  .catch((error) => console.error(error));
