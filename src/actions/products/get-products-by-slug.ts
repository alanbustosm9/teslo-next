"use server";
import prisma from "@/lib/prisma";

export const getProductsBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },

      where: {
        slug: slug,
      },
    });

    if (!product) return null;

    // Excluir el ProductImage del tipado de product
    const { ProductImage, ...rest } = product;

    return {
      ...rest,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error getting products by slug");
  }
};
