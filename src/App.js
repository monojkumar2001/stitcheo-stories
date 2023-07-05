import Mint from "./components/Mint";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  useEffect(() => {
		AOS.init();
	}, []);
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <Mint />
        </Route>
      </Switch>
    </Router>
  </div>

  );
}

export default App;
