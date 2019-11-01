import React from "react";

import "./workstep.css";

function WorkStep(props) {

    return (
        <div className="workstep-row">
            <textarea type="text" className="small-text-area" defaultValue={props.workstep.description} onBlur={(event) => props.updateDescription(event.target.value)} />
        </div>
    );
}

export default WorkStep;