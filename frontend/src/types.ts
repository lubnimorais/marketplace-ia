export type IProduct = {
  id: number;
  name: string;
  price: number;
  store_id: number;
  embedding: number[] | null;
  store: {
    id: number;
    name: string;
  };
};
