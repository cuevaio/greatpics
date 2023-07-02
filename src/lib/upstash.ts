import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = new Redis({
  url: String(process.env.UPSTASH_REDIS_REST_URL),
  token: String(process.env.UPSTASH_REDIS_REST_TOKEN),
});

export const imageRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(3, "1 h"),
  analytics: true,
});

export const aiRatelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, "1 h"),
  analytics: true,
});