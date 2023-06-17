import Hapi from '@hapi/hapi';
import {ObjectId} from "mongodb";
import dotenv from 'dotenv'
import {getToyCollections } from "./db/conn.mjs";
dotenv.config({path:'../.env'})

const PORT = process.env.API_PORT||3000
console.log("API_PORT",process.env.API_PORT)

//https://www.mongodb.com/developer/languages/javascript/hapijs-nodejs-driver/
const init = async (getToys) => {

    const server = Hapi.server({
        port: PORT,
        routes: {
            cors: {
                origin: ['*'] // an array of origins or 'ignore'
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) =>  {
            return h.response('Рабочий');
        }
    });

    server.route({
        method: 'GET',
        path: '/toys',
        handler: async (request, h) =>  {
            try {
                const data = await getToys().find({}).toArray();
                console.log("===>getToys()",data)
                return h.response(data);
            }catch (e){
                return h.response(e.toString());
            }

        }
    });

    server.route({
        method: 'POST',
        path: '/toys',
        handler: async (request, h)=> {
            const data = JSON.parse(request.payload);
            if (data._id) {
                const {_id,...rest} = data;

                const a = await getToys().findOneAndUpdate(
                    { _id : new ObjectId(_id) },
                    { $set: rest },
                    {returnDocument:'after'}
                )
                console.log('document',a.value);
                return h.response(a.value)
            } else {
                const result = await getToys().insertOne(data)
                return h.response({
                    _id: result.insertedId,
                    ...data
                });
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init(getToyCollections);
