import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import createRecipe from "./components/CreateRecipe";

import './App.css';
import CreateRecipe from './components/CreateRecipe';

function App() {
  let [filter, setFilter] = useState('');

  return (
    <div id="recipe-book-container">
      <Router>
        <Switch>
          <Route exact path="/">
            <RecipeList filter={filter} setFilter={setFilter} />
          </Route>
          <Route path="/recipe/:id" component={RecipeDetails} />
          <Route path="/createRecipe/:id?" component={CreateRecipe} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
