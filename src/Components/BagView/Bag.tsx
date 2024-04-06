import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MyContext } from "../Context/MyContext";
import { product } from "../Util/types";
import { close } from "../Util/Icon";
import CardBag from "./CardBag";
type Props = {
  setActiveBag: (arg: boolean) => void;
  activeBag: boolean;
};

const Bag: React.FC<Props> = ({ setActiveBag, activeBag }) => {
  const [open, setOpen] = useState(false);
  const { bag, updateBag, updateCountProduct, countProduct } =
    useContext(MyContext);
  const [actualTotal, setActualTotal] = useState(0);
  const [auxBag, setAuxBag] = useState<product[]>([]);

  const remove = (id: string) => {
    updateBag(bag.filter((f) => f.id !== id));
    setAuxBag(auxBag.filter((f) => f.id !== id));
    updateCountProduct(countProduct - 1);
  };
  const handleOption = (total: number) => {
    let options = [];
    for (let i = 0; i < total; i++) {
      options.push(
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      );
    }

    return options;
  };

  useEffect(() => {
    setOpen(activeBag);
    if (auxBag.length === 0) {
      for (let i = 0; i < bag.length; i++) {
        auxBag.push(bag[i]);
      }
    }
    let t = 0;
    for (let i = 0; i < auxBag.length; i++) {
      t += auxBag[i].value;
    }
    setActualTotal(t);
  }, [auxBag, activeBag]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={setActiveBag}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900 mb-5">
                          Bolsa
                        </Dialog.Title>
                        <button
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setActiveBag(false)}
                        >
                          {close}
                        </button>
                      </div>
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {bag.map((product: product) => (
                            <CardBag
                              key={product.id}
                              product={product}
                              handleOption={handleOption}
                              remove={remove}
                              auxBag={auxBag}
                              setAuxBag={setAuxBag}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6 flex flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        <p>${actualTotal}</p>
                      </div>

                      <button className="mt-5 bg-green-500  h-10 text-black rounded-lg">
                        Comprar
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Bag;
