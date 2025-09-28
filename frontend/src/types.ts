export type IProduct = {
  id: number;
  name: string;
  price: number;
  store_id: number;
  store: {
    id: number;
    name: string;
  };
  embedding: number[] | null;
};

export type ICart = {
  id: number;
  user_id: number;
  created_at: Date;
  store_id: number;
  active: boolean;
  store: {
    name: string;
  };
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
};
