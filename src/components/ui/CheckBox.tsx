import React from "react";

import styles from "../../styles/checkbox.module.css";

const CheckBox: React.FC<{
    className?: string, 
    name: string, label: string, 
    checked: boolean, 
    changeHandler: (key: string) => void
}> = (props) => {
    const classes = `${styles['checkbox']} ${props.className}`

    const onChangeHandler = () => {
        props.changeHandler(props.label);
    }

    return (
        <label className={classes}>
            <input type="checkbox" name={props.name} checked={props.checked} onChange={onChangeHandler}/>
            <p>{props.label}</p>
        </label>
    )
}

export default CheckBox;