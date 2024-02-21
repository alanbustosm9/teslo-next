"use client";

import { useEffect, useState } from "react";
import { GetStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
    // eslint-disable-next-line
  }, []);

  const getStock = async () => {
    const inStock = await GetStockBySlug(slug);

    setStock(inStock);
    setIsLoading(false);
  };
  // TODO: ver este skeleton no me gustó xd

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
