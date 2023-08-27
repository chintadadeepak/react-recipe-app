import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SaveRecipe from "./pages/SaveRecipe";
import Auth from "./pages/Auth";
import CreateRecipe from "./pages/CreateRecipe";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/save-recipe" element={<SaveRecipe />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
