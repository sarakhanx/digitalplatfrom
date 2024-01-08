import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";
import volumePath from "../lib/volumePath";

const isAdminOrPermission = () : Access => async ({
    req
})=> {
    const user = req.user as User | undefined ;
    if(!user) return false
    if(user.role == 'admin') return true

    return {
        user :{
            equals:req.user.id,
        }
    }
}

export const Media: CollectionConfig = {
  slug: "media",
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  access:{
    read : async ({req})=>{
        const referer = req.headers.referer;
        if (!req.user || !referer?.includes('sell')) {
            return true
            
        }
        return await isAdminOrPermission() ({req});
    },
    delete: isAdminOrPermission(),
    update: isAdminOrPermission(),
  },
  admin:{
    hidden: ({user})=> user.role !== 'admin'
  },
  
  upload: {
    staticURL: volumePath('/media'),
    staticDir: "media",
    imageSizes: [
      { name: "thumnails", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 1024, position: "centre" },
      { name: "tablet", width: 1024, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields:[
    {
name : 'user',
type : 'relationship',
relationTo:'users',
required : true,
hasMany : false,
admin: {
    condition:()=>false
},
    }
  ]
};
