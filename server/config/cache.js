// import { createClient } from 'redis';
const redis = require("redis")
const client = redis.createClient({
    url: process.env.Redis_Url
});

client.on('error', err => console.log('Redis Client Error', err));

const connectRedis = async () => {
    if (!client.isOpen) {
        await client.connect();
        console.log("Connected to Redis successfully");
    }
};

connectRedis()

module.exports = { client }