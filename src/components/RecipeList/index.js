import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faPlusCircle, faSearch, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RecipeService from "./../../service/RecipeService";

import "./recipelist.css";

function RecipeList(props) {
    const recipeService = new RecipeService();
    let [recipes, setRecipes] = useState([]);

    useEffect(() => {
        recipeService.getRecipes().then(data => {
          setRecipes(data);
        });
      }, []);

    const getFilteredRecipes = (filter) => {
        if (!filter) {
            return recipes;
        }

        return recipes.filter((r) => {
            return r.name.toLowerCase().startsWith(filter.toLowerCase());
        });
    };

    return (
        <div>
            <div id="recipe-book-search-container">
                <Link to="/createRecipe">
                    <FontAwesomeIcon id="create-new-recipe" icon={faPlusCircle} />
                </Link>
                <input type="text" value={props.filter} onChange={(event) => props.setFilter(event.target.value)} />
                <FontAwesomeIcon id="recipe-book-search-icon" icon={faSearch} />
            </div>
            <ul id="recipe-list">
                {getFilteredRecipes(props.filter).flatMap((v, i) => (
                    <li key={i} className="recipe-list-item">
                        <Link to={"/recipe/" + v.id} className="recipe-link">{v.name}</Link>
                        <Link to={"/createRecipe/" + v.id}><FontAwesomeIcon className="edit-recipe-icon" icon={faPen} /></Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeList;