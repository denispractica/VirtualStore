import React, { useContext, useEffect, useState } from "react";
import Carousel from "./Carousel";
import { MyContext } from "../Context/MyContext";
import { product } from "../Util/types";
import Bag from "../BagView/Bag";

interface Props {
  product: product;
  typeItem: string;
}

const Card: React.FC<Props> = ({ product, typeItem }) => {
  const [inside, setInside] = useState(false);
  const [activeBag, setActiveBag] = useState(false);
  const { updateCountProduct, countProduct, updateBag, bag } =
    useContext(MyContext);

  const handleInside = () => {
    const indexBag = bag.findIndex((f) => f.id === product.id);
    let newBag: product[] = [];
    if (indexBag === -1) {
      newBag = [...bag, product];
    } else {
      newBag = bag.filter((f) => f.id !== product.id);
    }
    setInside(!inside);
    if (inside) {
      updateCountProduct(countProduct - 1);
      updateBag(newBag);
    } else {
      updateCountProduct(countProduct + 1);
      updateBag(newBag);
    }
  };
  useEffect(() => {
    const indexProduct = bag.findIndex((f) => f.id === product.id);
    if (indexProduct === -1) setInside(false);
  }, [bag]);
  return (
    <>
      <section className="m-5 h-96 w-80 flex flex-col box-border z-10">
        <div className="h-80 rounded-lg relative bg-gradient-to-b from-white via-white to-grisecito">
          <Carousel imageUrls={product.url} />
          <strong>
            <span className="text-white text-3xl absolute bottom-0 right-0 mr-10 mb-6">
              ${product.value}
            </span>
          </strong>
        </div>
        <div className="h-20 mt-2 p-2 flex justify-between items-center">
          <div className="flex flex-col">
            <span>
              <strong>{product.name}</strong>
            </span>
            <span>{typeItem}</span>
          </div>
          {inside && (
            <strong>
              <button
                onClick={() => setActiveBag(true)}
                className="bg-green-600 text-white rounded-lg p-2"
              >
                Bolsa
              </button>
            </strong>
          )}
        </div>
        <button
          onClick={handleInside}
          className={`mt-2 p-2 bg-gray-200 bg-opacity-50 rounded-lg ${
            inside
              ? "bg-red-500 text-white"
              : "hover:bg-green-500 hover:text-white"
          }`}
        >
          {inside ? "Quitar de la bolsa" : "Agregar a la bolsa"}
        </button>
      </section>
      <Bag activeBag={activeBag} setActiveBag={setActiveBag} />
    </>
  );
};
export default Card;
