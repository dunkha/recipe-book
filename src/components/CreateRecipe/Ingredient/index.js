import React from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { haeMittatyypit } from "./../../../utility/util";

function Ingredient(props) {
    return (
        <div className="ingredient-row">
            <div className="ingredient-col">
                <input type="text" className="text-input" defaultValue={props.ingredient.name}
                    onBlur={(event) => props.updateName(event.target.value)} />
            </div>
            <div className="ingredient-col">
                <input type="text" className="small-text-input" defaultValue={props.ingredient.measurement > 0 ? props.ingredient.measurement : ''}
                    onBlur={(event) => props.updateMeasurement(event.target.value)} />
            </div>
            <div className="ingredient-col">
                <select className="select-input" defaultValue={props.ingredient.measurementType}
                        onChange={(event) => props.updateMeasurementType(event.target.value)}>
                    <option key="measurement-type-empty" value="">-- Valitse mittatyyppi --</option>
                    {haeMittatyypit().flatMap((v, i) => (
                        <option key={"measurmenet-type-name-" + i} value={v.value}>{v.name}</option>
                    ))}
                </select>
            </div>
            <div className="ingredient-col">
                <FontAwesomeIcon icon={faTrashAlt} className="trash-ingredient" onClick={(event) => props.remove()} />
            </div>
        </div>
    );
}

export default Ingredient;