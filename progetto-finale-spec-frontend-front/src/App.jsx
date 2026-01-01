import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import Compare from "./pages/Compare.jsx";
import Favorites from "./pages/Favorites.jsx";
import Product from "./pages/Product.jsx";
import Carrello from "./pages/Carrello.jsx";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  return (

    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<Detail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Carrello />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;