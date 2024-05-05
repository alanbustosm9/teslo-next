"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { ProductImage } from "@/components";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (productsInCart.length === 0) {
    redirect("/empty");
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.id}-${product.size}`}
          className="flex mb-5"
        >
          <ProductImage
            src={`${product.image}`}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded"
            style={{ width: "100px", height: "100px" }}
          />
          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
