require('dotenv').config();
const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) throw new Error('REDIS_URL not set in .env');

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

const jobQueue = new Queue('delayedJobQueue', { connection });

module.exports = { jobQueue, connection };
