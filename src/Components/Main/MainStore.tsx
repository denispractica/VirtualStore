import Card from "../Card/Card";
import { section, category, product } from "../Util/types";
import categorias from "../Util/categorias.json";

const MainStore = () => {
  //Hacer el fetch de los datos y cambiar por los estaticos(categorias)

  return (
    <main className="flex gap-2 flex-wrap">
      {categorias.map((section: section) =>
        section.category.map((category: category) =>
          category.items.map((items: product) => (
            <Card key={items.id} product={items} typeItem={section.name} />
          ))
        )
      )}
    </main>
  );
};

export default MainStore;
