"use client";

import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const [error, setError] = useState(false);

  const addToCart = () => {
    if (!size) {
      setError(true);
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: "",
      title: "",
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);

    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {error && !size && (
        <span className="mt-2 text-red-500 text-sm font-bold fade-in">
          Debe de seleccionar una talla*
        </span>
      )}

      {/* Size selector */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
