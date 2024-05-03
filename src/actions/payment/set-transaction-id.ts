"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId,
        // isPaid: true,
      },
    });

    if (!order) throw new Error(`No se actualizó la orden ${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo actualizar la orden",
    };
  }
};
