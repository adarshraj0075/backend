require('dotenv').config();
const { Worker } = require('bullmq');
const IORedis = require('ioredis');

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  console.error('REDIS_URL not set in .env');
  process.exit(1);
}

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

const worker = new Worker(
  'delayedJobQueue',
  async (job) => {
    console.log('🔔 Worker processing job:', job.id);
    console.log('Job name:', job.name);
    console.log('Job data:', job.data);

  
    await new Promise((res) => setTimeout(res, 500)); 
    console.log(`✔️ Job ${job.id} logic finished`);
  
    return { processedAt: new Date().toISOString() };
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(` Job ${job.id} failed:`, err);
});

worker.on('error', (err) => {
  console.error('Worker error', err);
});
