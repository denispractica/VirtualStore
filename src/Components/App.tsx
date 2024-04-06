import StoreNavigation from "./Navigation/StoreNavigation";
import MainStore from "./Main/MainStore";
import { MyProvider } from "./Context/MyContext";
const App = () => {
  return (
    <MyProvider>
      <StoreNavigation />
      <MainStore />
    </MyProvider>
  );
};

export default App;
