"use server";
import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import { TAX_COUNTRY, TOTAL_COUNTRY } from "@/helpers";

interface ProductToOrder {
  id: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return {
        ok: false,
        message: "No hay sesión de usuario",
      };
    }

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((p) => p.id),
        },
      },
    });

    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find((p) => p.id === item.id);

        if (!product) throw new Error("Producto no existe - 500");

        const subTotales = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * TAX_COUNTRY;
        totals.total += subTotal * TOTAL_COUNTRY;

        return totals;
      },
      { subTotal: 0, total: 0, tax: 0 }
    );

    const prismaTx = await prisma.$transaction(async (tx) => {});
  } catch (error) {
    console.log(error);
  }
};
