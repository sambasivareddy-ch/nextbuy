import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/home.module.css";

const Category: React.FC<{type: string, children: ReactNode, to: string}> = (props) => {
    return (
        <Link to={props.to} className={styles['category-wrapper']}>
            {props.children}
            <p className={styles['category-type']}>{props.type}</p>
        </Link>
    )
}

export default Category;