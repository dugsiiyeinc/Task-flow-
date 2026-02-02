import {betterAuth} from "better-auth"
import { MongoClient } from "mongodb"
import {mongodbAdapter} from "better-auth/adapters/mongodb"
import { headers } from "next/headers";

const client=new MongoClient(process.env.MONGODB_URI!);
await client.connect();
const db=client.db();

export const auth= betterAuth({
    database: mongodbAdapter(db,{
        client,
    }),
    emailAndPassword:{
        enabled:true
    },
    socialProviders: {
       github: {
         clientId: process.env.GITHUB_CLIENT_ID!,
         clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
        google: { 
          clientId: process.env.GOOGLE_CLIENT_ID!, 
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }, 
    },
});

export async function getSession() {

    const result=await auth.api.getSession({
        headers:await headers()
    })
    return result;
}