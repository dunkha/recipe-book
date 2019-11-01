import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Ingredient from "./Ingredient";
import WorkStep from "./WorkStep";

import RecipeService from "./../../service/RecipeService";
import { compareIntegers } from "./../../utility/util";

import "./createrecipe.css";

function CreateRecipe(props) {
    const service = new RecipeService();
    let history = useHistory();
    const shortid = require('shortid');

    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [ingredients, setIngredients] = useState([]);
    let [steps, setSteps] = useState([]);

    useEffect(() => {
        console.log('init...')
        if (props.match.params.id) {
            service.getRecipe(props.match.params.id).then((response) => {
                console.log('id: ' + shortid.generate());
                if (response.name) {
                    setName(response.name);
                }

                if (response.description) {
                    setDescription(response.description);
                }

                if (response.ingredients) {
                    setIngredients(response.ingredients.map((ingredient) => {
                        return {...ingredient, id: shortid.generate()};
                    }));
                }

                if (response.workSteps) {
                    setSteps(response.workSteps);
                }
            });
        }
    }, []);

    let returnHome = () => {
        history.push("/");
    };

    function saveRecipe() {
        if (!name) {
            return;
        }

        let recipe = {
            name: name,
            description: description,
            ingredients: ingredients.map((ingredient, index) => {
                return {...ingredient, orderNro: index};
            }),
            workSteps: steps.map((workStep, index) => {
                return {...workStep, orderNro: index};
            })
        };

        service.createRecipe(recipe);
    }

    function updateRecipe() {
        if (!name) {
            return;
        }

        let recipe = {
            id: props.match.params.id,
            name: name,
            description: description,
            ingredients: ingredients.map((ingredient, index) => {
                return {...ingredient, orderNro: index};
            }),
            workSteps: steps.map((workStep, index) => {
                return {...workStep, orderNro: index};
            })
        };

        service.updateRecipe(recipe);
    }

    function deleteRecipe() {
        service.deleteRecipe(props.match.params.id).then(() => {
            returnHome();
        });
    }

    function updateIngredientName(i, v) {
        let _ingredients = ingredients.slice();

        _ingredients[i].name = v;

        setIngredients(_ingredients);
    }

    function updateIngredientMeasurement(i, v) {
        let _ingredients = ingredients.slice();

        _ingredients[i].measurement = v;

        setIngredients(_ingredients);
    }

    function updateIngredientMeasurementType(i, v) {
        let _ingredients = ingredients.slice();

        _ingredients[i].measurementType = v;

        setIngredients(_ingredients);
    }

    function createNewIngredient() {
        let _ingredients = ingredients.slice();
        _ingredients.push({
            id: shortid.generate(),
            name: '',
            measurement: '',
            measurementType: ''
        });

        setIngredients(_ingredients);
    }

    function removeIngredient(i) {
        let _ingredients = ingredients.slice();
        _ingredients.splice(i, 1);

        setIngredients(_ingredients);
    }

    function updateWorkStepDescription(i, v) {
        let _steps = steps.slice();

        _steps[i].description = v;

        setSteps(_steps);
    }

    function createNewWorkStep() {
        let _steps = steps.slice();
        
        _steps.push({
            description: ''
        });

        setSteps(_steps);
    }

    return (
        <div>
            <div id="recipe-details-back-button" className="recipe-book-inline">
                <Link to="/">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Link>
            </div>
            <div className="recipe-book-inline"><h1>Luo uusi resepti</h1></div>
            <div className="lomake-osio">
                <div><label>Nimi</label></div>
                <input id="luo-resepti-nimi" type="text" className="text-input" defaultValue={name} onBlur={(event) => setName(event.target.value)}  />
            </div>
            <div className="lomake-osio">
                <div><label>Kuvaus</label></div>
                <textarea id="luo-resepti-kuvaus" className="text-area" defaultValue={description} onBlur={(event) => setDescription(event.target.value)} />
            </div>
            <div className="lomake-osio">
                <div className="lomake-osio-otsikko">Ainesosat</div>
                {ingredients.length > 0 && (<div>
                    <div className="ingredient-col header-col ingredient-header-col-1">Nimi</div>
                    <div className="ingredient-col header-col ingredient-header-col-2">Määrä</div>
                    <div className="ingredient-col header-col">Mitta</div>
                </div>)}
                {ingredients.sort((a, b) => compareIntegers(a.orderNro, b.orderNro)).flatMap((v, i) => (
                    <Ingredient key={v.id} ingredient={v} updateName={(value) => updateIngredientName(i, value)}
                        updateMeasurement={(value) => updateIngredientMeasurement(i, value)}
                        updateMeasurementType={(value) => updateIngredientMeasurementType(i, value)} remove={() => (removeIngredient(i))}/>
                ))}
                <button className="secondary-button" onClick={createNewIngredient}>Luo uusi ainesosa</button>
            </div>
            <div className="lomake-osio">
                <div className="lomake-osio-otsikko">Työvaiheet</div>
                {steps.flatMap((v, i) => (
                    <WorkStep key={"workstep-" + i} workstep={v} updateDescription={(value) => updateWorkStepDescription(i, value)} />
                ))}
                <button className="secondary-button" onClick={createNewWorkStep}>Luo uusi työvaihe</button>
            </div>
            <div className="lomake-osio">
                {props.match.params.id && (
                    <div>
                        <button className="primary-button" onClick={updateRecipe}>Tallenna resepti</button>
                        <button className="delete-button" onClick={deleteRecipe}>Poista resepti</button>
                    </div>
                )}
                {!props.match.params.id && (
                    <button className="primary-button" onClick={saveRecipe}>Luo uusi resepti</button>
                )}
            </div>
        </div>
    )
}

export default CreateRecipe;