import { Fragment, useContext, useState } from "react";
import categorias from "../Util/categorias.json";
import { searchIcon, buyIcon } from "../Util/Icon";
import { Popover, Transition } from "@headlessui/react";
import { MyContext } from "../Context/MyContext";
import Bag from "../BagView/Bag";

const StoreNavigation = () => {
  const [activeBag, setActiveBag] = useState(false);
  const { countProduct } = useContext(MyContext);
  return (
    <>
      <header className="border-t bg-gradient-to-r from-grisecito  to-black h-20 rounded-t-lg m-5 mb-0 min-w-320" />
      <nav className="border-b border-l border-r bg-white h-20 rounded-b-lg mx-5 mt-0 flex justify-between items-center flex-wrap lg:h-10 min-w-320">
        <section className="w-40 ml-5 flex justify-between">
          {categorias.map((c) => (
            <Popover.Group key={c.id}>
              <Popover className="relative flex">
                <Popover.Button className="outline-none flex ml-5 items-center gap-x-1 text-sm font-semibold leading-6 border-b-2 border-transparent text-gray-900 hover:border-b-2 hover:border-grisecito">
                  {c.name}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="bg-gradient-to-r from-grisecito  to-black mt-14 lg:mt-6 md:mt-8 absolute overflow-y-auto -left-4 h-80 top-full overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 z-20">
                    <button className="p-4">
                      {c.category.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex-auto items-center gap-x-6 rounded-lg p-4 text-sm leading-6 text-white hover:bg-gray-50 hover:text-black "
                        >
                          <p className="mt-1">{item.name}</p>
                        </div>
                      ))}
                    </button>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>
          ))}
        </section>
        <section className="flex ml-5 justify-between w-80 items-center lg:w-96">
          <div className="flex items-center">
            <input
              className="text-center outline-none border rounded-lg w-40 md:w-50 lg:w-60"
              type="text"
            />
            <button className="ml-5">{searchIcon}</button>
          </div>
          <div className="flex items-center ml-2.5 mr-2.5">
            <button onClick={() => setActiveBag(true)}>{buyIcon}</button>
            <span
              className={`text-sm ml-1 font-medium ${
                countProduct > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {countProduct}
            </span>
          </div>
        </section>
      </nav>
      <Bag activeBag={activeBag} setActiveBag={setActiveBag} />
    </>
  );
};

export default StoreNavigation;
