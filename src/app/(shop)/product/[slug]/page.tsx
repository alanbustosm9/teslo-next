export const revalidate = 604800; // 7 days;

import { notFound } from "next/navigation";

import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";

import { titleFont } from "@/config/fonts";
import { getProductsBySlug } from "@/actions";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ({ params }: Props) {
  const { slug } = params;
  const product = await getProductsBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      {/* Product details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Size selector */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Quantity selector */}
        <QuantitySelector quantity={1} />

        {/* Button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
