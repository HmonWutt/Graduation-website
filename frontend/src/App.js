import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import Loginpage from "./loginpage";
import Mainpage from "./Mainpage";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="App" className="App">
        <Header />
        <Routes>
          {" "}
          <Route path="/" element={<Loginpage />}>
            <Route index element={<Header />} />
            <Route path="/mainpage/:username" element={<Mainpage />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
