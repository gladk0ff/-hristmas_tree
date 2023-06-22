import {ME_CONFIG_MONGODB_URL} from './app.config.mjs'
import { MongoClient } from "mongodb";

const client = new MongoClient(ME_CONFIG_MONGODB_URL,{useUnifiedTopology: true });

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




