import React from "react";

import styles from "../../styles/radio.module.css";

const RadioInput: React.FC<{
    className?: string, 
    name: string, label?: string, 
    checked: boolean, 
    changeHandler: () => void,
}> = (props) => {
    const classes = `${styles['radio']} ${props.className}`

    const onChangeHandler = () => {
        props.changeHandler();
    }

    return (
        <label className={classes}>
            <input type="radio" name={props.name} checked={props.checked} onChange={onChangeHandler}/>
            {props.label && <p>{props.label}</p>}
        </label>
    )
}

export default RadioInput;