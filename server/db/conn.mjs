import dotenv from 'dotenv'
dotenv.config({path:'../.env'})
import { MongoClient } from "mongodb";

console.log("process.env.ME_CONFIG_MONGODB_URL",process.env.ME_CONFIG_MONGODB_URL)
const URL = process.env.ME_CONFIG_MONGODB_URL || 'mongodb://localhost:27017';

const client = new MongoClient(URL,{useUnifiedTopology: true });

let dbConnection;
let toysCollection;

const dbName = 'myProject';


export async function main() {
    // Use connect method to connect to the server
    await client.connect();

    dbConnection = client.db(dbName);

    toysCollection = dbConnection.collection("toys");
    return dbConnection
}

main()
    .catch(console.error)
    // .finally(() => client.close());


export const getDBCon = () => {
    return dbConnection
}

export const getToyCollections = () => {
    return toysCollection
}




