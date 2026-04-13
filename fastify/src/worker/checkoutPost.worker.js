import { Worker } from "bullmq";
import redisWorker from "../config/redis.worker.js";
import pool from "../config/db.js"; 

const createCheckoutWorker = new Worker(
  "createCheckoutQueue",
  async (job) => {
    try {
      const { name, amount, item } = job.data;

      const result = await pool.query(
        `INSERT INTO checkouts(name, amount, item)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, amount, item]
      );

      return result.rows[0];
    } catch (err) {
      throw err;
    }
  },
  {
    connection: redisWorker,
    concurrency: 20,
  }
);

createCheckoutWorker.on("completed", (job, result) => {
  console.log("Create checkout success:", result);
});

createCheckoutWorker.on("failed", (job, err) => {
  console.error("Create checkout failed:", err.message);
});

export default createCheckoutWorker;