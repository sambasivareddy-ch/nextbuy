import React, { useState } from "react";

import NavigationLink from "./NavigationLink";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import { PhoneIcon, SmartWatchIcon, ComputerSmallIcon, HeadPhoneIcon, GamingIcon } from "../icons/icons";

import styles from "../../styles/navigation.module.css";

const SubNav: React.FC = () => {
    const [openMenu, setOpenMenu] = useState(window.innerWidth > 800? true: false);

    window.onresize = () => {
        if (window.innerWidth > 800) {
            setOpenMenu(true)
        } else {
            setOpenMenu(false)
        }
    }

    return (
        <nav className={styles['page-sub_nav']}>
            <button className={styles['sub-nav_menu__toggler']} onClick={() => setOpenMenu(!openMenu)}>
                {!openMenu && <MenuIcon/>}
                {openMenu && <CloseIcon/>}
            </button>
            {openMenu && <div className={styles['page-sub_nav_link']}>
                <NavigationLink link_text="Home" to="/">
                    <HomeFilledIcon/>
                </NavigationLink>
            </div>}
            {openMenu && <div className={styles['page-sub_nav_link']}>
                <NavigationLink link_text="Phone" to="/phone">
                    <PhoneIcon />
                </NavigationLink>
            </div>}
            {openMenu && <div className={styles['page-sub_nav_link']}>
                <NavigationLink link_text="Watches" to="/smartwatch">
                    <SmartWatchIcon />
                </NavigationLink>
            </div>}
            {openMenu && <div className={styles['page-sub_nav_link']}>
                <NavigationLink link_text="Computer" to="/computers">
                    <ComputerSmallIcon />
                </NavigationLink>
            </div>}
            {openMenu && <div className={styles['page-sub_nav_link']}>
                <NavigationLink link_text="Head Phones" to="/head-phones">
                    <HeadPhoneIcon />
                </NavigationLink>
            </div>}
            {openMenu && <div className={styles['page-sub_nav_link']}>
                <NavigationLink link_text="Gaming" to="/gaming">
                    <GamingIcon />
                </NavigationLink>
            </div>}
        </nav>
    )
}

export default SubNav;