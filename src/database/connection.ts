import { Client } from "postgres";

const client = new Client({
    hostname: "localhost",
    port: "5432",
    user: "postgres",
    password: "root",
    database: "server"
});

await client.connect();
console.log("connection successfuly conected without errors");

export default client;
