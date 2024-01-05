import Image from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, Clock4, Flower2, Truck } from "lucide-react";
import ProductReel from "@/components/ProductReel";

const perks = [
  {
    name :'Fresh Flowers',
    Icon:Flower2,
    describtion: 'winterglorywe provided your choice with fresh flowers',
  },
  {
    name :'Response',
    Icon:Clock4,
    describtion: 'your happy no need to waste more times, we answer you 24/7',
  },
  {
    name : 'Delivery',
    Icon:Truck,
    describtion: 'Send to you door (or special location) all FRESH to the destination',
  },
]

export default function Home() {
  return (<>
  
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl ">
        <h1 className="font-t text-4xl sm:text-6xl">
          Winter Glory <br /><span className='tracking-tight'>flower pattaya</span>
        </h1>
        <p className="text-sm md:text-lg mt-4 max-w-prose text-muted-foreground">Welcome to winter glory flower every happy can be happiler</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href='/products' className={buttonVariants({className:'hover:bg-green-50'})}>Browse Your Flower &rarr;</Link>
          <Button variant='ghost'>Purpose &rarr;</Button>
        </div>
      </div>
      <ProductReel
      title="Browse the Flowers"
      href="/products"
      query={{sort:'desc',limit:4 ,category:'best-seller'}}
      />
    </MaxWidthWrapper>
    <section className='border-t border-grey-200 bg-grey-100'>
      <MaxWidthWrapper className='py-20'>
      <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
    {perks.map((perk)=>(
      <div
      key={perk.name}
      className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
        <div className="flex justify-center md:flex-shrink-0">
          <div className='h-16 w-16 flex items-center justify-center rounded-full bg-green-100 text-green-900'>
        {<perk.Icon className="w-1/3 h1/3" />}
          </div>
          </div>

          <div className="mt-4 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
            <h3 className="text-base text-grey-900 ">{perk.name}</h3>
            <p className='mt-3 text-sm text-muted-foreground'>
              {perk.describtion }
            </p>
          </div>
          
        </div>
      
      ))}
      </div>
      </MaxWidthWrapper>
    </section>
  </>
  );
}
