import React, { useState, useEffect } from "react";
import { faChevronLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import "./recipedetails.css";
import RecipeService from "../../service/RecipeService";
import { haeMittatyyppi, convertDecimal, compareIntegers } from "./../../utility/util";

function RecipeDetails(props) {
    const recipeService = new RecipeService();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        recipeService.getRecipe(props.match.params.id).then(data => {
            setRecipe(data);
        });
    }, []);

    return (
        <div>
            {(recipe &&
                <div>
                    <div id="recipe-details-back-button" className="recipe-book-inline">
                        <Link to="/">
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </Link>
                    </div>
                    <div className="recipe-book-inline"><h1>{recipe.name}</h1></div>
                    <Link to={"/createRecipe/" + props.match.params.id}><FontAwesomeIcon id="recpie-details-edit-recipe-icon" icon={faPen} /></Link>
                    <p id="recipe-description">{recipe.description}</p>
                    <div id="recipe-ingredients">
                        {recipe.ingredients && (recipe.ingredients.sort((a, b) => compareIntegers(a.orderNro, b.orderNro)).flatMap((v, i) => (
                            <div key={"ingredient-" + i} className="row">
                                <div className="cell recipe-name">{v.name}</div>
                                {(v.measurement > 0 &&
                                    <div className="cell">
                                        <div className="cell recipe-measurement">{convertDecimal(v.measurement)}</div>
                                        <div className="cell">{haeMittatyyppi(v.measurementType)}</div>
                                    </div>
                                )}
                            </div>
                        )))}
                    </div>
                    <h2>Valmistusohjeet</h2>
                    <ul id="recipe-steps">
                        {recipe.workSteps && (recipe.workSteps.sort((a, b) => compareIntegers(a.orderNro, b.orderNro)).flatMap((v, i) => (
                            <li key={"workstep-" + i}>{v.description}</li>
                        )))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RecipeDetails;