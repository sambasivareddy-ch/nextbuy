import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PageSetter from "../components/product-ui/PageSetter";
import PageNavigation from "../components/product-ui/PageNavigation";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import Toast from "../components/ui/Toast";
import styles from "../styles/profile.module.css";

import { UserInfo } from '../types/types';
import { RootState } from "../store/store";
import useFetch from "../hooks/useFetch";
import useApi from "../hooks/useApi";

const ProfilePage: React.FC<{
    user: UserInfo | null, 
}> = (props) => {
    const userInfo: any = useSelector<RootState>((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

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

    const [apiCaller, apiData, isLoading] = useFetch();
    useEffect(() => {
        const fetchAddress = async () => {
            await apiCaller(`http://localhost:5000/user/address/${userInfo.user.id}`, userInfo?.token);
        }

        fetchAddress();
    }, [userInfo]);

    const [newAddressApiCaller, _, isNewAddressSaving, isNewAddressSaveCauseError] = useApi('http://localhost:5000/user/address', "POST", userInfo?.token);
    const [modifyAddressApiCaller, ____, isAddressUpdating, isAddressUpdatingCauseError] = useApi('http://localhost:5000/user/address', 'PUT', userInfo?.token);

    const addressUpdateHandler = async (e: FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const houseNumber = houseNumberRef.current?.value;
        const street = streetRef.current?.value;
        const city = cityRef.current?.value;
        const state = stateRef.current?.value;
        const country = countryRef.current?.value;
        const pincode = pincodeRef.current?.value;
        const phone = phoneRef.current?.value;

        if (apiData.length === 0) {
            await newAddressApiCaller({
                customer_id: userInfo.user.id,
                name,
                houseNumber,
                street,
                city,
                state,
                country,
                pincode,
                phone
            })
        } else {
            await modifyAddressApiCaller({
                customer_id: userInfo.user.id,
                name,
                houseNumber,
                street,
                city,
                state,
                country,
                pincode,
                phone
            })
        }
        navigate('/profile');
    }

    return isLoading ? <Loading/>: <PageSetter>
        <div className={styles['main-page_wrapper']}>
            <div className={styles['page']}>
                <PageNavigation location={location}/>
                <div className={styles['main-wrapper']}>
                    <div className={styles['profile-header']}>
                        <h1>Profile</h1>
                        <Button 
                            type="button"
                            button_text={!isEditMode ? "Edit": "Cancel"}
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
                                value={isEditMode ? undefined: props.user?.name}
                            />
                            <Input 
                                type="email"
                                placeholder="email address"
                                required={true}
                                inputRef={emailAddressRef}
                                name="email-address"
                                readOnly={!isEditMode}
                                value={isEditMode ? undefined: props.user?.email}
                            />
                            <Input 
                                type="password"
                                placeholder="password"
                                required={true}
                                inputRef={passswordRef}
                                name="password"
                                readOnly={!isEditMode}
                                value={isEditMode ? undefined: 'sample'}
                            />
                            <Input 
                                type="text"
                                placeholder="phone number"
                                required={true}
                                inputRef={phoneNumberRef}
                                name="phone-number"
                                readOnly={!isEditMode}
                                value={isEditMode ? undefined: props.user?.phone}
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
                        <form className={styles['address_form']} onSubmit={addressUpdateHandler}>
                            <Input
                                type="text"
                                placeholder="Name"
                                required={true}
                                inputRef={nameRef}
                                name="name"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0].name}
                            />
                            <Input
                                type="text"
                                placeholder="House Number"
                                required={true}
                                inputRef={houseNumberRef}
                                name="house-number"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0].houseNumber}
                            />
                            <Input
                                type="text"
                                placeholder="Street"
                                required={true}
                                inputRef={streetRef}
                                name="street"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0].street}
                            />
                            <Input
                                type="text"
                                placeholder="City or Village"
                                required={true}
                                inputRef={cityRef}
                                name="city"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0].city}
                            />
                            <Input
                                type="text"
                                placeholder="State"
                                required={true}
                                inputRef={stateRef}
                                name="state"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0]?.state}
                            />
                            <Input
                                type="text"
                                placeholder="Country"
                                required={true}
                                inputRef={countryRef}
                                name="country"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0]?.country}
                            />
                            <Input
                                type="number"
                                placeholder="Pincode"
                                required={true}
                                inputRef={pincodeRef}
                                name="pincode"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0]?.pincode}
                            />
                            <Input
                                type="text"
                                placeholder="Phone Number"
                                required={true}
                                inputRef={phoneRef}
                                name="phone-number"
                                readOnly={!isEditMode}
                                value={apiData.length === 0 || isEditMode? undefined: apiData[0]?.phone}
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
            {isNewAddressSaving && <Toast type="info" message="Saving the Address..."/>}
            {isNewAddressSaveCauseError && <Toast type="failure" message="Saving the Address failed..."/>}
            {isAddressUpdating && <Toast type="info" message="Updating the Address..."/>}
            {isAddressUpdatingCauseError && <Toast type="failure" message="Updating the Address failed..."/>}
        </div>
    </PageSetter>
}

export default ProfilePage;
