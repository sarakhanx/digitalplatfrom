import { appRouter } from '@/trpc'
import {fetchRequestHandler} from '@trpc/server/adapters/fetch'
import { NextResponse } from 'next/server';

const handler = (req : Request)=>{
    fetchRequestHandler({
        endpoint:'api/trpc',
        req,
        router : appRouter,
    //@ts-expect-error context already passes from express middleware
        createContext:()=>({})
    })
}
export {handler as GET , handler as POST}