import { createClient } from "redis";
import hash from "object-hash";
import config from "../../config/app.js";

let redisClient = undefined;

async function initializeRedisClient() {
	const redisURL = config.REDIS.REDIS_URL;

	if (redisURL) {
		redisClient = createClient({ url: redisURL }).on("error", (error) => {
			console.error(`Failed to create the Redis client with error:`);
			console.error("Error : ", error);
		});
	}

	try {
		await redisClient.connect();
		console.log(`Connected to Redis successfully!`);
	} catch (error) {
		console.error(`Connection to Redis failed with error:`);
		console.error("error : ", error);
	}
}

function requestToKey(req) {
	const reqDataToHash = {
		query: req.query,
		body: req.body,
	};
	return `${req.path}@${hash.sha1(reqDataToHash)}`;
}

async function isRedisWorking() {
	return !!redisClient?.isOpen();
}

async function keyExists(key) {
	if (isRedisWorking) {
		const exists = await redisClient.exists(key);
		return exists === 1 ? true : false;
	}
}

async function writeData(
	key,
	data,
	options = {
		EX: 120, // 60 seconds
	}
) {
	if (isRedisWorking) {
		try {
			await redisClient.set(key, JSON.stringify(data), options);
		} catch (error) {
			console.error(`Failed to cache data for key=${key}`, error);
		}
	}
}

async function readData(key) {
	if (isRedisWorking) {
		const cachedValue = await redisClient.get(key);
		return JSON.parse(cachedValue);
	}
	return null;
}

async function deleteData(key) {
	if (isRedisWorking) {
		await redisClient.del(key);
	}
}

async function rateLimiter(timer, key) {
	const requestCount = await redisClient.incr(key);
	if (requestCount === 1) {
		await redisClient.expire(key, timer);
	}
	const timeRemaining = await redisClient.ttl(key);

	return { requestCount, timeRemaining };
}

export {
	initializeRedisClient,
	writeData,
	readData,
	deleteData,
	requestToKey,
	keyExists,
	rateLimiter,
};
