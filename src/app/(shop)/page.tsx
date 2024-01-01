import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

// Temporal data
const products = initialData.products;

export default function Home() {
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Encuentra los mejores productos para tu hogar"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  );
}
