import { Route, Switch } from "react-router";

import Notes from "src/views/Notes";
import Home from "src/views/Home";

import "src/index.css";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route path="/notes" exact>
        <Notes />
      </Route>
    </Switch>
  );
}

export default App;
