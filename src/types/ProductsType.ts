import { ProductType } from "./ProductType";

type ProductsType = {
  items: ProductType[];
  status: "success" | "error" | "";
};

export default ProductsType;
