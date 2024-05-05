"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/store";
import { OrderCheckout } from "@/components";

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
        <OrderCheckout
          totalItems={totalItems}
          subTotal={subTotal}
          tax={tax}
          total={total}
        />
    </>
  );
};
