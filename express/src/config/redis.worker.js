import Redis from "ioredis";

const redisWorker = new Redis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null
});

redisWorker.on("connect", () => {
  console.log("Redis connected");
});

export default redisWorker;