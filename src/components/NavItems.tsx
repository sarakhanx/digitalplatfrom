"use client";

import { PRODUCT_CATTEGORIES } from "@/config";
import React, { useRef } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = React.useState<Number | null>(null);

  const navRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(navRef , ()=>setActiveIndex(null))

  React.useEffect(() => {
    //? สร้างไว้ให้กด escape เพื่อปิดเมนู
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  return <div className="flex gap-4 h-full" ref={navRef}>
    {PRODUCT_CATTEGORIES.map((category , i ) => {
        const handleOpen = () => {
            if (activeIndex === i) {
                setActiveIndex(null);
            } else {
                setActiveIndex(i);
            }
        }
        const isOpen = i === activeIndex;
        const isAnyOpen = activeIndex !== null;

        return(
            <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
            key={category.value}
            />

            
        )

})}
  </div>;
};

export default NavItems;
