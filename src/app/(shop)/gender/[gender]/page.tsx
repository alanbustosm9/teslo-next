export const revalidate = 60;

import { notFound, redirect } from "next/navigation";

import { GenderCategory } from "@/interfaces";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginationProductsWithImages } from "@/actions";
import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: GenderCategory;
  };
  searchParams: {
    page?: string;
  };
}

export default async function ({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginationProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect("/");
  }

  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Unisex",
  };

  if (!gender) {
    notFound();
  }

  return (
    <>
      <Title title={`Artículos para ${labels[gender]}`} />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
