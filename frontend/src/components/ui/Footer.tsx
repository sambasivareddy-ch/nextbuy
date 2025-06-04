import React from "react";

import styles from "../../styles/footer.module.css";
import { LinkedinIcon, InstaIcon, TwitterIcon } from "../icons/icons";

const Footer: React.FC = () => {
    return (
        <div className={styles['footer-wrapper']}>
            <div className={styles['footer-main']}>
                <div className={styles['company-info']}>
                    <h2>NextBuy</h2>
                    <p>
                        We act as a third-party website helps the customers to buy Tech Gadgets 
                        like Phones, SmartWatches, Laptops, HeadPhones, Gaming set etc.
                    </p>
                    <ol className={styles['company-social_profiles']}>
                        <li>
                            <a href="https://www.linkedin.com/in/samba-siva-reddy-ch/" target="_blank"><LinkedinIcon/></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/ssr.chinta/" target="_blank"><InstaIcon/></a>
                        </li>
                        <li>
                            <a href="https://x.com/sambasivadev" target="_blank"><TwitterIcon/></a>
                        </li>
                    </ol>
                </div>
                <div className={styles['company-services']}>
                    <h3>Services & Assistance</h3>
                    <ol className={styles['services']}>
                        <li>
                            <a href="/" target="_blank">Gift Cards</a>
                        </li>
                        <li>
                            <a href="/" target="_blank">Find an order</a>
                        </li>
                        <li>
                            <a href="/" target="_blank">Exchange & Return of goods</a>
                        </li>
                        <li>
                            <a href="/" target="_blank">Guarantee</a>
                        </li>
                        <li>
                            <a href="/" target="_blank">FAQs</a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Footer;