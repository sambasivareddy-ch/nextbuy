import React, { RefObject } from "react";

import styles from "../../styles/input.module.css";

type InputType = "number" | "text" | "password" | "email" | "date" | "month" | "time" | "week" | "search" | "tel" | "url";

const Input: React.FC<{
    type: InputType,
    placeholder: string,
    required: boolean,
    inputRef: RefObject<HTMLInputElement | null>
    name?: string,
    readOnly?: boolean,
    value?: string | number | undefined | readonly string[],
}> = (props) => {

    return <input 
        type={props.type} 
        placeholder={props.placeholder} 
        required={props.required}
        className={styles['input']}
        ref={props.inputRef}
        name={props.name ? props.name : undefined}
        value={props.value}
        readOnly={props.readOnly}
    />
}

export default Input;