import React, { ReactNode, useState } from 'react';

import { KeyArrowUp, KeyArrowDown } from "../icons/icons";
import styles from "../../styles/filter.module.css";

const Filter: React.FC<{
    name: string,
    children: ReactNode
}> = (props) => {
    const [isArrowDown, setIsArrowDown] = useState(false);

    return (
        <div className={styles['filter-wrapper']}>
            <div className={styles['filter-header']}>
                <h3>{props.name}</h3>
                <button onClick={() => {setIsArrowDown(!isArrowDown)}}>
                    {!isArrowDown && <KeyArrowDown/>}
                    {isArrowDown && <KeyArrowUp/>}
                </button>
            </div>
            <div className={styles['checkboxes']}>
                {!isArrowDown && props.children}
            </div>
        </div>
    )
}

export default Filter;