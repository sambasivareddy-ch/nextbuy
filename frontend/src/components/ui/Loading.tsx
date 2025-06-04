import React from "react"

import { PacmanLoader } from "react-spinners";
import styles from "../../styles/loading.module.css"

const Loading: React.FC = () => {
    return <div className={styles['loading-wrapper']}>
        <PacmanLoader color={"#211C24"}/>
    </div>
}

export default Loading;