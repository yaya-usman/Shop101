
export default interface IProducts {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}


export type ProductWithQty = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
    qty: number
}



export type ProductContextState = {
    products: ProductWithQty[];
    addProduct: (prod : IProducts) => void;
    delProduct: (id: number) => void;
    increaseQty: (id : number) => number | undefined;
   decreaseQty: (id : number) => number | undefined;
  }
  