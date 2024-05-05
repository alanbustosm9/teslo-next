"use client";

import { useEffect, useState } from "react";
import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { redirect } from "next/navigation";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const updateProductsInCart = useCartStore(
    (state) => state.updateProductQuantity
  );

  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

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
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProductsInCart(product, quantity)
              }
            />

            <button
              className="underline mt-3"
              onClick={() => removeProductFromCart(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
