import React, { ReactNode } from "react";

import styles from "../../styles/button.module.css";

type ButtonType = "button" | "submit" | "reset";

const Button: React.FC<{ 
    type: ButtonType,
    button_text: string, 
    class_name?: string, 
    clickHandler?: (v: any) => void,  
    val?: number,
}> = (props) => {
    const classes: string = `${styles['button']} ${props.class_name}`

    return <>
        <button 
            type={props.type}
            className={classes} 
            onClick={props.clickHandler? () => props.clickHandler!(props.val): undefined}
        >
            {props.button_text}
        </button>
    </>
}

export const AddToWishlistBtn: React.FC<{ 
    button_text: string, 
    class_name?: string, 
    clickHandler: () => void
}> = (props) => {
    const classes: string = `${styles['button']} ${props.class_name}`

    return <>
        <button 
            className={classes} 
            onClick={() => props.clickHandler()}
        >
            {props.button_text}
        </button>
    </>
}

export const AddToCartlistBtn: React.FC<{ 
    button_text: string | ReactNode, 
    class_name?: string, 
    clickHandler: () => void
}> = (props) => {
    const classes: string = `${styles['button']} ${props.class_name}`

    return <>
        <button 
            className={classes} 
            onClick={() => props.clickHandler()}
        >
            {props.button_text}
        </button>
    </>
}

export default Button;