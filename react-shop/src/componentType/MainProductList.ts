import { productType } from "./App";

export type ProductListType = {
  keys: string;
  item: productType[];
  category: string;
}[];
