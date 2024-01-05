import { AfterChangeHook, BeforeChangeHook } from "payload/dist/collections/config/types";
import { PRODUCT_CATTEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-types";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.user;
  return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Product> = async ({
  req,
  doc,
}) => {
  const fullUser = await req.payload.findByID({
    collection: 'users',
    id: req.user.id,
  })

  if (fullUser && typeof fullUser === 'object') {
    const { products } = fullUser

    const allIDs = [
      ...(products?.map((product) =>
        typeof product === 'object' ? product.id : product
      ) || []),
    ]

    const createdProductIDs = allIDs.filter(
      (id, index) => allIDs.indexOf(id) === index
    )

    const dataToUpdate = [...createdProductIDs, doc.id]

    await req.payload.update({
      collection: 'users',
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    })
  }
}


export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {

          const data = args.data as Product

            const createProduct = await stripe.products.create({
              name: data.name,
              default_price_data: {
                currency: "THB",
                unit_amount: Math.round(data.price! * 100)
              }
            });
            const updated : Product = {
              ...data , 
              stripeId : createProduct.id ,
              priceId : createProduct.default_price as string,

              
            }
            return updated
        } else if (args.operation === "update") {
          const data = args.data as Product

            const updatedProduct = await stripe.products.update(data.stripeId! , {
              name : data.name , 
              default_price : data.priceId!
            });
            const updated : Product = {
              ...data , 
              stripeId : updatedProduct.id ,
              priceId : updatedProduct.default_price as string,

              
            }
            return updated

        }
      },
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    { name: "name", label: "Name | ชื่อสินค้า", type: "text", required: true },
    {
      name: "description",
      label: "Description | รายละเอียดสินค้า",
      type: "textarea",
    },
    {
      name: "price",
      min: 0,
      max: 100000,
      label: "Prices | ราคา",
      type: "number",
    },
    {
      name: "category",
      label: "Category | หมวดหมู่สินค้า",
      type: "select",
      options: PRODUCT_CATTEGORIES.map(({ label, value }) => ({
        label,
        value,
      })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product Files | สินค้า(หากมี)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSell",
      label: "Product Status | สถานะสินค้า",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      minRows: 1,
      maxRows: 5,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
