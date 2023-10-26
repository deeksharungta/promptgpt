import Redis from "ioredis";

const redis = new Redis({
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  port: 19984,
});

export default redis;
