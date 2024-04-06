import { ReactNode, createContext, useState } from "react";
import { contextType, product, section } from "../Util/types";

export const MyContext = createContext<contextType>({
  bag: [],
  updateBag: () => {},

  dataSection: [],
  updateDataSection: () => {},

  countProduct: 0,
  updateCountProduct: () => {},
});

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bag, setBag] = useState<product[]>([]);
  const updateBag = (arg: product[]) => {
    setBag(arg);
  };

  const [dataSection, setDataSection] = useState<section[]>([]);
  const updateDataSection = (arg: section[]) => {
    setDataSection(arg);
  };

  const [countProduct, setCountProduct] = useState(0);
  const updateCountProduct = (arg: number) => {
    setCountProduct(arg);
  };

  return (
    <MyContext.Provider
      value={{
        bag,
        updateBag,
        dataSection,
        updateDataSection,
        countProduct,
        updateCountProduct,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
