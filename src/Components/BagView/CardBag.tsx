import React, { useState } from "react";
import { product } from "../Util/types";
import { RadioGroup } from "@headlessui/react";

type Props = {
  product: product;
  handleOption: (arg: number) => JSX.Element[];
  remove: (arg: string) => void;
  auxBag: product[];
  setAuxBag: (arg: product[]) => void;
};

const CardBag: React.FC<Props> = ({
  product,
  handleOption,
  remove,
  auxBag,
  setAuxBag,
}) => {
  const [actualTotal, setActualTotal] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.size[0]);

  const handleTotal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const actualValue = product.value * Number(e.target.value);
    setActualTotal(actualValue);
    const filterBag = auxBag.filter((f) => f.id !== product.id);
    const newBag = {
      id: product.id,
      name: product.name,
      value: actualValue,
      size: product.size,
      total: product.total,
      url: product.url,
      colors: product.colors,
    };
    setAuxBag([...filterBag, newBag]);
  };
  return (
    <li key={product.id} className="flex py-6 items-center">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={product.url[0]}
          alt="Producto"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 justify-between">
        <div className="flex flex-col text-base font-medium text-gray-900">
          <div className="flex flex-col">
            <h3>{product.name}</h3>
            <select
              onChange={handleTotal}
              className="bg-gray-300 w-12 rounded-lg p-2"
            >
              {handleOption(product.total)}
            </select>
          </div>
          {/* Colors */}
          <RadioGroup
            value={selectedColor}
            onChange={setSelectedColor}
            className="mt-4"
          >
            <div className="flex items-center space-x-3">
              {product.colors.map((color) => (
                <RadioGroup.Option
                  key={color}
                  value={color}
                  className={`${
                    selectedColor === color ? "ring " : ""
                  } ring-gray-400 relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none`}
                >
                  <RadioGroup.Label as="span" className="sr-only">
                    {color}
                  </RadioGroup.Label>
                  <span
                    style={{ backgroundColor: `${color}` }}
                    aria-hidden="true"
                    className="h-6 w-6 rounded-full border border-black border-opacity-10"
                  />
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          {/* Sizes */}
          <RadioGroup
            value={selectedSize}
            onChange={setSelectedSize}
            className="mt-4"
          >
            <div className="flex items-center space-x-3">
              {product.size.map((size) => (
                <RadioGroup.Option
                  key={size}
                  value={size}
                  className={`${
                    selectedSize === size ? "ring " : ""
                  } ring-gray-400 relative -m-0.5 flex cursor-pointer items-center justify-center p-0.5 focus:outline-none`}
                >
                  <span className="h-8 w-8  border border-black border-opacity-10 text-center m-auto p-1">
                    {size}
                  </span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <p className="mt-4">
            ${actualTotal === 0 ? product.value : actualTotal}
          </p>
        </div>

        <button
          onClick={() => remove(product.id)}
          className="font-medium text-red-500 hover:text-red-200"
        >
          Quitar
        </button>
      </div>
    </li>
  );
};

export default CardBag;
