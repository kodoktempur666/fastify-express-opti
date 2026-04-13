import { Worker } from "bullmq";
import redisWorker from "../config/redis.worker.js";
import client from "../config/grpc.js";

const createCheckoutWorker = new Worker(
  "createCheckoutQueue",
  async (job) => {
    return new Promise((resolve, reject) => {
      client.CreateCheckout(job.data, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },
  {
    connection: redisWorker,
    concurrency: 20,
  }
);

// createCheckoutWorker.on("completed", () => {
//   console.log("Create checkout job completed");
// });

// createCheckoutWorker.on("failed", (job, err) => {
//   console.error("Create checkout failed:", err.message);
// });

export default createCheckoutWorker;

