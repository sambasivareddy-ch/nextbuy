import React from "react";

import styles from "../../styles/portals.module.css";

type ToastType = "success" | "failure" | "info"

const Toast: React.FC<{
    type: ToastType,
    message: string
}> = (props) => {
    const classes = `${styles['toast-wrapper']} ${styles[`toast-wrapper_${props.type}`]}`

    return <div className={classes}>
        {props.message}
    </div>
}

export default Toast;