import React, { ReactNode } from "react";

import styles from "../../styles/inputslider.module.css";

const InputSlider: React.FC<{
    minPrice: number,
    maxPrice: number,
    priceRange0: number,
    priceRange1: number,
    priceChangeHandler: (range: [number, number]) => void,
    children: ReactNode,
    isMin: boolean,
}> = (props) => {
    return (
        <div className={styles['input-slider']}>
            {props.children}
            <input 
                className={styles['slider']}
                type="range" 
                min={props.minPrice} 
                max={props.maxPrice} 
                value={props.isMin ? props.priceRange0: props.priceRange1} 
                onChange={(e) => props.priceChangeHandler(
                    [
                        props.isMin? parseInt(e.target.value): props.priceRange0, 
                        props.isMin? props.priceRange1: parseInt(e.target.value),
                    ]
                )}
            />
        </div>
    )
}

export default InputSlider;