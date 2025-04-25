import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/button.module.css";

const LinkButton: React.FC<{ link_text: string, class_name?: string, to: string }> = (props) => {
    const classes: string = `${styles['button']} ${styles['link-btn']} ${props.class_name}`

    return <button className={classes}>
        <Link to={props.to}>{props.link_text}</Link>
    </button>
}

export default LinkButton;