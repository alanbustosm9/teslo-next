"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { useAddressStore, useCartStore } from "@/store";
import { placeOrder } from "@/actions";
import { OrderAddress, OrderCheckout } from "@/components";

export const PlaceOrder = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const address = useAddressStore((state) => state.address);

  const { totalItems, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryinformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setDisabled(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setDisabled(false);
      setErrorMessage(resp.message);
      return;
    }

    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!loaded) {
    // todo: hacer un loading generico
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <OrderAddress address={address} />

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-6" />

      {/* Checkout */}
      <OrderCheckout
        totalItems={totalItems}
        subTotal={subTotal}
        tax={tax}
        total={total}
      />

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer click en {`"Colocar orden"`}, aceptas nuestros
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500 mb-1">{errorMessage}</p>

        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !disabled,
            "btn-disabled": disabled,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
