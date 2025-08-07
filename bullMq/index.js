require('dotenv').config();
const express = require('express');
const { jobQueue } = require('./queue');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'BullMQ delayed-job API is running' });
});


app.post('/schedule-task', async (req, res) => {
  try {
    const { taskData } = req.body;
    if (!taskData) return res.status(400).json({ msg: 'taskData required' });

    const job = await jobQueue.add('myDelayedJob', taskData, {
      delay: 10000, 
      attempts: 3,  
      backoff: {
        type: 'exponential',
        delay: 5000
      },
      removeOnComplete: true,
      removeOnFail: false,
    });

    return res.status(201).json({
      msg: 'Task scheduled to run after 10 seconds',
      jobId: job.id,
    });
  } catch (err) {
    console.error('Error scheduling job:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(` API server listening on http://localhost:${PORT}`);
});
