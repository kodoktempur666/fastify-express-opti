import { Queue } from "bullmq";
import redis from "../config/redis.js";

export const checkoutQueue = new Queue("checkoutQueue", {
  connection: redis,
  limiter: {
    max: 200, 
    duration: 1000, 
  },
});