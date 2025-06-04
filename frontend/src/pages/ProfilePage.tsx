import React from "react";
import { useLocation } from "react-router-dom";

import PageSetter from "../components/product-ui/PageSetter";
import PageNavigation from "../components/product-ui/PageNavigation";
import styles from "../styles/profile.module.css";

const ProfilePage: React.FC = () => {
    const location = useLocation();

    return <PageSetter>
        <div className={styles['main-page_wrapper']}>
            <div className={styles['page']}>
                <PageNavigation location={location}/>
                <div className={styles['main-wrapper']}>
                    <h1>Profile</h1>
                    <div className={styles['profile-info']}>
                        <span>Name</span>
                        <p>V N G Samba Siva Reddy</p>
                    </div>
                    <div className={styles['profile-info']}>
                        <span>Email</span>
                        <a href="mailto:sambasivareddychinta@gmail.com">sambasivareddychinta@gmail.com</a>
                    </div>
                    <div className={styles['profile-info']}>
                        <span>Phone Number</span>
                        <a href="tel:+917337375243">(+91) 733 737 5243</a>
                    </div>
                </div>
            </div>
        </div>
    </PageSetter>
}

export default ProfilePage;
