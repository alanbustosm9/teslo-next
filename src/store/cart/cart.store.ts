import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryinformation: () => {
    totalItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // methods
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // revisar si el producto existe
        const productInCart = cart.some(
          (p) => p.id === product.id && p.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // incrementar la cantidad
        const updatedCartProducts = cart.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            return { ...p, quantity: p.quantity + product.quantity };
          }

          return p;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            return { ...p, quantity };
          }

          return p;
        });

        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();

        const removeProductFromCart = cart.filter(
          (p) => p.id !== product.id || p.size !== product.size
        );

        set({ cart: removeProductFromCart });
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, p) => acc + p.quantity, 0);
      },

      getSummaryinformation: () => {
        const { cart, getTotalItems } = get();

        const totalItems = getTotalItems();
        const subTotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;

        return {
          totalItems,
          subTotal,
          tax,
          total,
        };
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
