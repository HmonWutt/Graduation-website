import "./App.css";
import Loginpage from "./loginpage";
import Mainpage from "./Mainpage";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="App">
          <Header/>
          <Routes>
              <Route path="/mainpage/:username" element={<Mainpage/>} />
              <Route path="*" element={ <Loginpage /> } />
          </Routes>
          <Footer/>
        </div>
    </Router>
  );
}

export default App;
