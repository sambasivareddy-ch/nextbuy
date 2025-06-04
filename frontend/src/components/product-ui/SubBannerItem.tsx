import React, { ReactNode } from "react";

import styles from "../../styles/subbanner.module.css"

const SubBannerItem: React.FC<{
    bannerImage: string 
    heading: string 
    description: string
    button?: ReactNode
    className?: string
}> = (props) => {
    const classes = `${styles['sub-banner_item__wrapper']} ${props.className}`
    return (
        <div className={classes}>
            <div className={styles['sub-banner_image']}>
                <img src={props.bannerImage} alt="Banner Image"/>
            </div>
            <div className={styles['sub-banner_description']}>
                <h2>{props.heading}</h2>
                <p>{props.description}</p>
                {props.button}
            </div>
        </div>
    )
}

export default SubBannerItem;