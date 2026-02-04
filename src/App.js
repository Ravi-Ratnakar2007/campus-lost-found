import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import PostItem from "./pages/PostItem";
import ItemDetails from "./pages/ItemDetails";
import EditItem from "./pages/EditItem";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lost" element={<LostItems />} />
        <Route path="/found" element={<FoundItems />} />
        <Route path="/post" element={<PostItem />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/edit/:id" element={<EditItem />} />

      </Routes>
    </Router>
  );
}

export default App;
