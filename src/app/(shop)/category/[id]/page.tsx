import { notFound } from "next/navigation";

import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "@/components";

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

export default function ({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Unisex",
  };

  if (!id) {
    notFound();
  }

  return (
    <>
      <Title title={`Artículos para ${labels[id]}`} />

      <ProductGrid products={products} />
    </>
  );
}
