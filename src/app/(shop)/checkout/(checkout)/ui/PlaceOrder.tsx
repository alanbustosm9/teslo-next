"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { placeOrder } from "@/actions";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { totalItems, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryinformation()
  );

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setDisabled(true);

    const productsToOrder = cart.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size,
    }));


    const resp = await placeOrder(productsToOrder, address)

    setDisabled(false);
  };

  if (!loaded) {
    // todo: hacer un loading generico
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.zipCode}</p>
        <p>
          {address.city} - {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      {/* Checkout */}

      <h2 className="text-2xl mb-2">Resumen de orden</h2>

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

        <p className="text-red-500 mb-1">Error en la creación</p>
        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !disabled,
            "btn-disabled": disabled,
          })}

          // href="/orders/123"
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
