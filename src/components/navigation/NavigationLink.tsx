import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from "../../styles/navigation.module.css";

const NavigationLink: FC<{ link_text?: string, to: string, children?: ReactNode, class_name?:string }> = (props) => {
    const classes = `${styles['header-nav_link']} ${props.class_name}`

    return (
        <NavLink to={props.to} className={classes}>
            {props.children}{props.link_text}
        </NavLink>
    )
}

export default NavigationLink;