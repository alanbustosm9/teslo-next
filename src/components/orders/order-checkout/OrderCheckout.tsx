import { currencyFormat } from "@/utils";
import { TAX_COUNTRY_PERCENTAGE } from "@/helpers";

interface Props {
  totalItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

export const OrderCheckout = ({ totalItems, subTotal, tax, total }: Props) => {
  return (
    <>
      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {totalItems === 1 ? "1 articulo" : `${totalItems} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos ({TAX_COUNTRY_PERCENTAGE}%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
    </>
  );
};
