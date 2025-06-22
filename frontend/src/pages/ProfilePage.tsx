import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import PageSetter from "../components/product-ui/PageSetter";
import PageNavigation from "../components/product-ui/PageNavigation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "../styles/profile.module.css";

import { AddressInfo } from '../types/types';

const ProfilePage: React.FC<{
    userName: string,
    emailAddress: string,
    phoneNumber: string,
    password: string,
    address: AddressInfo | null,
}> = (props) => {
    const location = useLocation();

    const userNameRef = useRef<HTMLInputElement>(null);
    const emailAddressRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passswordRef = useRef<HTMLInputElement>(null);

    const nameRef = useRef<HTMLInputElement>(null);
    const houseNumberRef = useRef<HTMLInputElement>(null);
    const streetRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const pincodeRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);


    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    return <PageSetter>
        <div className={styles['main-page_wrapper']}>
            <div className={styles['page']}>
                <PageNavigation location={location}/>
                <div className={styles['main-wrapper']}>
                    <div className={styles['profile-header']}>
                        <h1>Profile</h1>
                        <Button 
                            type="button"
                            button_text="Edit"
                            class_name={styles['edit-btn']}
                            clickHandler={() => {
                                setIsEditMode(!isEditMode)
                            }}
                        />
                    </div>
                    <div className={styles['profile-info_wrapper']}>
                        <h2>Basic Details</h2>
                        <form className={styles['profile-info_form']}>
                            <Input 
                                type="text"
                                placeholder="user name"
                                required={true}
                                inputRef={userNameRef}
                                name="user-name"
                                readOnly={!isEditMode}
                                value={isEditMode ? undefined: props.userName}
                            />
                            <Input 
                                type="email"
                                placeholder="email address"
                                required={true}
                                inputRef={emailAddressRef}
                                name="email-address"
                                readOnly={!isEditMode}
                                value={isEditMode ? undefined: props.emailAddress}
                            />
                            <Input 
                                type="password"
                                placeholder="password"
                                required={true}
                                inputRef={passswordRef}
                                name="password"
                                readOnly={!isEditMode}
                                value={isEditMode ? undefined: props.password}
                            />
                            <Input 
                                type="text"
                                placeholder="phone number"
                                required={true}
                                inputRef={phoneNumberRef}
                                name="phone-number"
                                readOnly={!isEditMode}
                                value={isEditMode ? undefined: props.phoneNumber}
                            />
                            {isEditMode && <Button
                                type="submit"
                                button_text="Update & Save"
                                class_name={styles['update-btn']}
                            />}
                        </form>
                    </div>
                    <div className={styles['profile-info_address__wrapper']}>
                        <h2>Address</h2>
                        <form className={styles['address_form']}>
                            <Input
                                type="text"
                                placeholder="Name"
                                required={true}
                                inputRef={nameRef}
                                name="name"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.name}
                            />
                            <Input
                                type="number"
                                placeholder="House Number"
                                required={true}
                                inputRef={houseNumberRef}
                                name="house-number"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.house_number}
                            />
                            <Input
                                type="text"
                                placeholder="Street"
                                required={true}
                                inputRef={streetRef}
                                name="street"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.street}
                            />
                            <Input
                                type="text"
                                placeholder="City or Village"
                                required={true}
                                inputRef={cityRef}
                                name="city"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.city}
                            />
                            <Input
                                type="text"
                                placeholder="State"
                                required={true}
                                inputRef={stateRef}
                                name="state"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.state}
                            />
                            <Input
                                type="text"
                                placeholder="Country"
                                required={true}
                                inputRef={countryRef}
                                name="country"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.country}
                            />
                            <Input
                                type="number"
                                placeholder="Pincode"
                                required={true}
                                inputRef={pincodeRef}
                                name="pincode"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.pincode}
                            />
                            <Input
                                type="text"
                                placeholder="Phone Number"
                                required={true}
                                inputRef={phoneRef}
                                name="phone-number"
                                readOnly={!isEditMode}
                                value={isEditMode? undefined: props.address?.phone}
                            />
                            {isEditMode && <Button
                                type="submit"
                                button_text="Update & Save"
                                class_name={styles['update-btn']}
                            />}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </PageSetter>
}

export default ProfilePage;
