import React, { createContext, useState, FC, useEffect } from "react";
import { IProducts, ProductContextState, ProductWithQty } from "../types";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { usePrevious } from "../hooks/usePrevious";

const contextDefaultValues: ProductContextState = {
  products: [],
  addProduct: () => { },
  delProduct: () => { },
  increaseQty: () => 0,
  decreaseQty: () => 0,
  totalItem: 0,
  discount: 0,
  totalPrice: 0,
  totalDiscountedPrice: 0

};

export const ProductsContext =
  createContext<ProductContextState>(contextDefaultValues);

const ProductsProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<ProductWithQty[]>(
    contextDefaultValues.products
  );
  const [totalItem, setTotalItem] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDiscountedPrice, setTotalDiscPrice] = useState<number>(0);
  const randomDiscounts = [0.03, 0.1, 0.02, 0.05, 0.23, 0.5];
  const randomNum = Math.floor(Math.random() * randomDiscounts.length);
  const router = useRouter();
  const prevId = usePrevious<any>(router.query.id)



  useEffect(() => {
    if (router.query.id === prevId) {
      setDiscount(discount);
    }
    setDiscount(randomDiscounts[randomNum]);
  }, [router.query.id]);



  //=============ADD-TO-CART====================//
  const addProduct = (newProduct: IProducts) => {
    const itemExists = products.find((item) => item.id === newProduct.id);
    if (itemExists) {
      itemExists.qty++;
      setTotalItem(totalItem);
      setTotalDiscPrice((prev) => prev + itemExists.discountedPrice);

    } else {
      const discountedPrice =
        parseFloat(newProduct.price) - parseFloat(newProduct.price) * discount;
      products.push({
        ...newProduct,
        qty: 1,
        discountedPrice: discountedPrice,
      });
      setTotalItem(totalItem + 1);
      setTotalDiscPrice((prev) => prev + discountedPrice)

    }
    setTotalPrice((prev) => (prev + parseFloat(newProduct.price)))

    // Cookies.set("inCart", JSON.stringify([...products, newProduct]));
  };

  //=============REMOVE FROM CART====================//
  const delProduct = (id: number) => {
    const newProducts = products.filter((product) => product.id !== id);
    const deletedProduct = products.find(item => item.id === id);

    setProducts(newProducts);
    setTotalItem(totalItem - 1);

    if (deletedProduct) {
      setTotalPrice((prev) => prev - (parseFloat(deletedProduct.price) * deletedProduct.qty))
      setTotalDiscPrice((prev) => prev - (deletedProduct.discountedPrice * deletedProduct.qty))
    }
  }



  //=============INCREASE QTY====================//
  const increaseQty = (id: number) => {
    const item = products.find((item) => item.id === id);
    if (item) {
      item.qty++;
      setTotalPrice((prev) => prev + (parseFloat(item.price)))
      setTotalDiscPrice((prev) => prev + (item.discountedPrice))
    }
    return item?.qty;
  };


  //=============DECREASE QTY====================//
  const decreaseQty = (id: number) => {
    const item = products.find((item) => item.id === id);

    if (item?.qty === 1) {
      const index = products.findIndex((item) => item.id === id);
      products.splice(index, 1);
      item.qty = 0;
      setTotalItem(totalItem - 1);
      setTotalPrice((prev) => prev - (parseFloat(item.price)))
      setTotalDiscPrice((prev) => prev - (item.discountedPrice))

    } else {
      if (item) {
        item.qty--;
        setTotalPrice((prev) => prev - (parseFloat(item.price) * item.qty))
        setTotalDiscPrice((prev) => prev - (item.discountedPrice * item.qty))
      }
      return item?.qty;
    }

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
        discount,
        totalPrice,
        totalDiscountedPrice
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
