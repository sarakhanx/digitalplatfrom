import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price : number | string ,
  
  options : {
    currency?: 'THB' | 'USD' | 'EUR' | 'CNY',
    notation?: Intl.NumberFormatOptions['notation'],

  } = {}
) {
  const { currency = 'THB', notation = 'compact' } = options

  const numericPrice = 
  typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,

  }).format(numericPrice)
}
export function constructMetadata({
  title = 'ร้านดอกไม้ Winter glory flower',
  description = 'ให้บริการด้านช่อดอกไม้ , ซุ้มดอกไม้ , จัดงาน อีเวนท์ , ร้านดอกไม้พัทยา , ร้านช่อดอกไม้ให้แฟน , ดอกไม้เซอร์ไพรซ์ , ดอกไม้ดึงเงิน',
  image = '/thumbnail.png', 
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@amplication.live',
    },
    icons,
    metadataBase: new URL('https://winterglory.up.railway.app/'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
