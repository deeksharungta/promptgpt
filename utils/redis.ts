import { Redis, RedisConfigNodejs } from "@upstash/redis";

const redisConfig: RedisConfigNodejs = {
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL || "",
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN || "",
};

const redis = new Redis(redisConfig);

export default redis;
