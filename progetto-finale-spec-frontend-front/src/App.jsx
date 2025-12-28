import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail.jsx"
import Compare from "./pages/Compare"
import Favorites from "./pages/Favorites"
import Navbar from "./assets/components/Navbar.jsx"
import Freschi from "./pages/Freschi.jsx"
import Creme from "./pages/Creme.jsx"
import Polveri from "./pages/Polveri.jsx"
import Carrello from "./pages/Carrello.jsx"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/freschi" element={<Freschi />} />
        <Route path="/category/creme" element={<Creme />} />
        <Route path="/category/polvere" element={<Polveri />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Carrello />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App