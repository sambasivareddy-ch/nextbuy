import React from "react";

import TopHeader from "./TopHeader";
import SubNav from "./SubNav";

import styles from "../../styles/navigation.module.css";

const Header: React.FC = () => {
    return (
        <header className={styles['home-page__header']}>
            <TopHeader/>
            <SubNav/>
        </header>
    )
}

export default Header;