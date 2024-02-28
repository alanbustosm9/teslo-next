import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  //updateProductQuantity: (product: CartProduct) => void;
  //removeProductFromCart: (product: CartProduct) => void;
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

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, p) => acc + p.quantity, 0);
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
