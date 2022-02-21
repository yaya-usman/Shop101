import React, { createContext, useState, FC, useEffect } from "react";
import { IProducts, ProductContextState, ProductWithQty } from "../types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


const contextDefaultValues: ProductContextState = {
  products: [],
  addProduct: () => { },
  delProduct: () => { },
  increaseQty: () => 0,
  decreaseQty: () => 0,
  totalItem: 0,
  discount: 0
};

export const ProductsContext =
  createContext<ProductContextState>(contextDefaultValues);

const ProductsProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<ProductWithQty[]>(
    contextDefaultValues.products
  );
  const [totalItem, setTotalItem] = useState<number>(0)
  const [discount, setDiscount] = useState<number>(0)
  const randomDiscounts = [0.03, 0.1, 0.02, 0.05, 0.23, 0.5];
  const randomNum = Math.floor(Math.random() * randomDiscounts.length);
  const router = useRouter()


  useEffect(() => {
    setDiscount(randomDiscounts[randomNum])
  }, [router.query.id])

  const addProduct = (newProduct: IProducts) => {
    const itemExists = products.find((item) => item.id === newProduct.id);
    if (itemExists) {
      itemExists.qty++;
      setTotalItem(totalItem);
    }
    else {
      const discountedPrice = parseFloat(newProduct.price) - parseFloat(newProduct.price) * discount
      products.push({ ...newProduct, qty: 1, discountedPrice: discountedPrice });
      setTotalItem(totalItem + 1)
    }

    // Cookies.set("inCart", JSON.stringify([...products, newProduct]));
  };


  const delProduct = (id: number) => {
    const newProducts = products.filter((product) => product.id !== id);
    // Cookies.set("inCart", JSON.stringify(newProducts),{
    //   maxAge: 0
    // });
    setProducts(newProducts);
    setTotalItem(totalItem - 1);

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
      setTotalItem(totalItem - 1);

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
        totalItem,
        discount
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
