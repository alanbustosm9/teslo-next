import { redirect } from "next/navigation";

import { getOrderById } from "@/actions";
import { currencyFormat } from "@/utils";
import {
  OrderAddress,
  OrderCheckout,
  OrderStatus,
  PaypalButton,
  ProductImage,
  Title,
} from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function ({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  const { id: addressId, orderId, countryId, ...rest} = address!

  const newAddress = {
    ...rest,
    country: countryId,
  };


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <ProductImage
                  src={`${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5 rounded"
                  style={{ width: "100px", height: "100px" }}
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x ${item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
           <OrderAddress address={newAddress} />

       

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-6" />

            {/* Checkout */}

            <OrderCheckout
              totalItems={order!.itemsInOrder}
              subTotal={order!.subTotal}
              tax={order!.tax}
              total={order!.total}
            />

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PaypalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
