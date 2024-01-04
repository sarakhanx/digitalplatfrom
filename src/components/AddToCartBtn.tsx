"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import React from "react";
import { Product } from "@/payload-types";

const AddToCartBtn = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
    >
      {isSuccess ? "Added !" : "Pick it !"}
    </Button>
  );
};

export default AddToCartBtn;
