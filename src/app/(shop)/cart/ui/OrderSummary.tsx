"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const OrderSummary = () => {
  const { totalItems, tax, total, subTotal } = useCartStore((state) =>
    state.getSummaryinformation()
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  //todo hacer un componente de loading mas bonitos
  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {totalItems === 1 ? "1 articulo" : `${totalItems} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
    </>
  );
};
