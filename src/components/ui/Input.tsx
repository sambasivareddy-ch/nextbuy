import React, { RefObject } from "react";

import styles from "../../styles/input.module.css";

type InputType = "number" | "text" | "password" | "email" | "date" | "month"

const Input: React.FC<{
    type: InputType,
    placeholder: string,
    required: boolean,
    inputRef: RefObject<HTMLInputElement | null>
}> = (props) => {

    return <input 
        type={props.type} 
        placeholder={props.placeholder} 
        required={props.required}
        className={styles['input']}
        ref={props.inputRef}
    />
}

export default Input;