import React, { createContext, useState, FC } from "react";
import { IProducts, ProductContextState, ProductWithQty } from "../types";
import Cookies from "js-cookie";

const contextDefaultValues: ProductContextState = {
  products: [],
  addProduct: () => { },
  delProduct: () => { },
  increaseQty: () => 0,
  decreaseQty: () => 0,
};

export const ProductsContext =
  createContext<ProductContextState>(contextDefaultValues);

const ProductsProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<ProductWithQty[]>(
    contextDefaultValues.products
  );

  const addProduct = (newProduct: IProducts) => {
    const itemExists = products.find((item) => item.id === newProduct.id);
    if (itemExists) {
      itemExists.qty++;
    }
    else {
      products.push({ ...newProduct, qty: 1 });
    }
    // Cookies.set("inCart", JSON.stringify([...products, newProduct]));
  };

  const delProduct = (id: number) => {
    const newProducts = products.filter((product) => product.id !== id);
    // Cookies.set("inCart", JSON.stringify(newProducts),{
    //   maxAge: 0
    // });
    setProducts(newProducts);

  };


  const increaseQty = (id: number) => {
    const item = products.find((item) => item.id === id)
    if (item) {
      item.qty++;
    }
    return item?.qty

  };

  const decreaseQty = (id: number) => {
    const item = products.find((item) => item.id === id)

    if (item?.qty === 1) {
      const index = products.findIndex((item) => item.id === id)
      products.splice(index, 1);
      item.qty = 0;
    }
    else {
      if (item) {
        item.qty--;
      }
    }
    return item?.qty


  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        delProduct,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
