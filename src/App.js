import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/new">
          <New />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
