export interface contextType {
  bag: product[];
  updateBag: (arg: product[]) => void;

  dataSection: section[];
  updateDataSection: (arg: section[]) => void;

  countProduct: number;
  updateCountProduct: (arg: number) => void;
}

export interface section {
  id: string;
  name: string;
  category: category[] | [];
}

export interface category {
  id: string;
  name: string;
  items: product[] | [];
}

export interface product {
  id: string;
  name: string;
  value: number;
  size: string[];
  total: number;
  url: string[];
  colors: string[];
}

