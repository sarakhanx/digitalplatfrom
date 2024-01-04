import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import { Users } from "./collections/Users";
import dotenv from 'dotenv';
import { Products } from "./collections/Products/Products";
import { Media } from "./collections/Media";
import { ProductFiles } from "./collections/ProductFile";
import { Orders } from "./collections/Orders";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    //  todo: เอาไว้เพื่อเพิ่ม collections จาก database ที่เราได้สร้างไว้ที่ ./collections
    collections:[Users , Products , Media , ProductFiles , Orders], 
    routes: {
        admin : '/sell',
    },
    admin:{
        user:'users',
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "WINTER GLORY",
            favicon: "https://raw.githubusercontent.com/withastro/astro/main/assets/favicon.png",
            ogImage: "https://raw.githubusercontent.com/withastro/astro/main/assets/social.jpg", //ภาพนี้จะแสดงผลเวลาเราแชร์ใน facebook
        }
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),
    typescript: {
        //สร้างไฟล์ Type ไว้ที่ไหน
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    }
})