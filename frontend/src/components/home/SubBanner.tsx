import React from "react";

import SubBannerItem from "../product-ui/SubBannerItem";
import Button from "../ui/Button";
import styles from "../../styles/subbanner.module.css"

import iphone from "../../assets/iphone.png";
import ps5 from "../../assets/ps5-rbg.png";
import pc from "../../assets/pc-rbg.png";
import headset from "../../assets/headset-rbg.png";

const SubBanner: React.FC = () => {
    return (
        <div className={styles['sub-banner_wrapper']}>
            <SubBannerItem 
                bannerImage={ps5}
                heading="Playstation 5" 
                description="Incredibly powerful CPUs, GPUs and an SSD with integrated I/O will redefine your Playstation Experience" 
            />
            <SubBannerItem 
                bannerImage={pc}
                heading="Macbook Air" 
                description="The new 15-inch MackBook Air makes room for more of what you love with a spacious Liquid Retina Display" 
                className={styles['left-to-right']} 
                button={<Button type="button" button_text="Shop Now" class_name={styles['sub-banner_shop__now_btn']}/>}
            />
            <SubBannerItem 
                bannerImage={headset} 
                heading="Apple Airpods Max" 
                description="Computational audio. Listen, it's powerful" 
            />
            <SubBannerItem 
                bannerImage={iphone}
                heading="Iphone 15 Pro" 
                description="Created to change everything for the better. For everyone" 
            />
        </div>
    )
}

export default SubBanner;
