import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import PageSetter from "../components/product-ui/PageSetter";
import PageNavigation from "../components/product-ui/PageNavigation";
import AddressSection from "../components/product-ui/AddressSection";
import CartProduct from "../components/product-ui/CartProduct";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import chip from "../assets/chip.png";
import Loading from "../components/ui/Loading";
import Confirm from "../components/ui/Confirm";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Toast from "../components/ui/Toast";

import type { RootState } from "../store/store";
import { addressState, addToAddress } from "../store/addressSlice";
import { AddressInfo } from "../types/types";
import styles from "../styles/checkout.module.css";

import useApi from "../hooks/useApi";
import useFetch from "../hooks/useFetch";

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const addresses: addressState = useSelector((state: RootState) => state.address);
    const cart = useSelector((state: RootState) => state.cart);
    const userInfo: any = useSelector((state: RootState) => state.user);

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);

    const nameRef = useRef<HTMLInputElement>(null);
    const houseNumberRef = useRef<HTMLInputElement>(null);
    const streetRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const pincodeRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const [addressName, setAddressName] = useState('');
    const [addressHouseNumber, setAddressHouseNumber] = useState('');
    const [addressStreet, setAddressStreet] = useState('');
    const [addressCity, setAddressCity] = useState('');
    const [addressState, setAddressState] = useState('');
    const [addressCountry, setAddressCountry] = useState('');
    const [addressPincode, setAddressPincode] = useState('');
    const [addressPhone, setAddressPhone] = useState('');

    const cardOwnerNameRef = useRef<HTMLInputElement>(null);
    const cardNumberRef = useRef<HTMLInputElement>(null);
    const expDataRef = useRef<HTMLInputElement>(null);
    const cvvRef = useRef<HTMLInputElement>(null);

    const [cardNumberState, setCardNumberState] = useState('');
    const [cardOwnerNameState, setCardOwnerNameState] = useState('');
    const [expDateState, setExpDateState] = useState('');

    const [apiCaller, apiData, ___] = useFetch();
    useEffect(() => {
        const fetchAddress = async () => {
            await apiCaller(`${import.meta.env.VITE_APP_SERVER_URL}/user/address/${userInfo.user.id}`, userInfo?.token);
        }

        fetchAddress();
    }, [userInfo]);


    const [modifyAddressApiCaller, ____, isAddressUpdating, isAddressUpdatingCauseError] = useApi('${import.meta.env.VITE_APP_SERVER_URL}/user/address', 'PUT', userInfo?.token);

    useEffect(() => {
        if (isPaymentProcessing) {
            setTimeout(() => {
                setIsPaymentProcessing(false);
                setIsPaymentSuccess(true);
            }, 3000)
        }
    }, [isPaymentProcessing])

    useEffect(() => {
        if (apiData) {
            const newAddress: AddressInfo = {
                name: apiData[0]?.name,
                house_number: apiData[0]?.houseNumber,
                street: apiData[0]?.street,
                city: apiData[0]?.city,
                state: apiData[0]?.state,
                country: apiData[0]?.country,
                pincode: apiData[0]?.pincode,
                phone: apiData[0]?.phone
            }
    
            dispatch(addToAddress({
                address: newAddress
            }))
        }
    }, [apiData])

    useEffect(() => {
        if (addresses.count) {
            Object.entries(addresses.addresses).forEach(userAddress => {
                if (userAddress[1].address.name) {
                    setAddressName(userAddress[1].address.name);
                    setAddressHouseNumber(userAddress[1].address.house_number);
                    setAddressState(userAddress[1].address.state);
                    setAddressStreet(userAddress[1].address.street);
                    setAddressCity(userAddress[1].address.city);
                    setAddressCountry(userAddress[1].address.country);
                    setAddressPhone(userAddress[1].address.phone);
                    setAddressPincode(userAddress[1].address.pincode);
                }
            });
        }
    }, [addresses]);

    const editAddressFormSubmitHandler = async (e: FormEvent) => {
        e.preventDefault()

        await modifyAddressApiCaller({
            customer_id: userInfo.user.id,
            name: addressName,
            houseNumber: addressHouseNumber,
            street: addressStreet,
            city: addressCity,
            state: addressState,
            country: addressCountry,
            pincode: addressPincode,
            phone: addressPhone
        });

        if (!isAddressUpdatingCauseError) {
            const newAddress: AddressInfo = {
                name: nameRef.current?.value!,
                house_number: houseNumberRef.current?.value!,
                street: streetRef.current?.value!,
                city: cityRef.current?.value!,
                state: stateRef.current?.value!,
                country: countryRef.current?.value!,
                pincode: pincodeRef.current?.value!,
                phone: phoneRef.current?.value!
            }

            dispatch(addToAddress({
                address: newAddress
            }))

            setShowAddAddressForm(false);
        }
    }

    const creditCardPaymentSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        setIsPaymentProcessing(true);
    }

    return isPaymentProcessing ? <Loading /> : <PageSetter>
        <div className={styles['main-page_wrapper']}>
            <div className={styles['page']}>
                <PageNavigation location={location} />
                <h1>Checkout</h1>
                <div className={styles['main-wrapper']}>
                    <div className={styles['summary_wrapper']}>
                        <h2>Summary</h2>
                        <div className={styles['order-summary_wrapper']}>
                            <h3>Orders</h3>
                            {cart.totalProducts !== 0 &&
                                Object.entries(cart.products).map(([_, prod]) => {
                                    return <CartProduct
                                        productDetails={prod.product}
                                        count={prod.count}
                                        type="summary"
                                        key={Math.random()}
                                        className={styles['summary-cart_card']}
                                    />
                                })
                            }
                            <h4 className={styles['price']}>Total Price: ${cart.totalPrice}</h4>
                        </div>
                        <div className={styles['order-summary_addresses']}>
                            <div className={styles['address-main']}>
                                <div className={styles['address-main_header']}>
                                    <h3>Address</h3>
                                    {!showAddAddressForm && <button onClick={() => { setShowAddAddressForm(true) }}>
                                        <EditIcon />
                                    </button>}
                                    {showAddAddressForm && <button onClick={() => { setShowAddAddressForm(false) }}>
                                        <CloseIcon />
                                    </button>}
                                </div>
                                {showAddAddressForm &&
                                    <form className={styles['add-address_form']} onSubmit={editAddressFormSubmitHandler}>
                                        <Input type="text" placeholder="Name" required={true} value={addressName} onChange={(e) => setAddressName(e.target.value)} />
                                        <Input type="text" placeholder="House No." required={true} value={addressHouseNumber} onChange={(e) => setAddressHouseNumber(e.target.value)} />
                                        <Input type="text" placeholder="Street" required={true} value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} />
                                        <Input type="text" placeholder="City" required={true} value={addressCity} onChange={(e) => setAddressCity(e.target.value)} />
                                        <Input type="text" placeholder="State" required={true} value={addressState} onChange={(e) => setAddressState(e.target.value)} />
                                        <Input type="text" placeholder="Country" required={true} value={addressCountry} onChange={(e) => setAddressCountry(e.target.value)} />
                                        <Input type="text" placeholder="Pincode" required={true} value={addressPincode} onChange={(e) => setAddressPincode(e.target.value)} />
                                        <Input type="text" placeholder="Phone Number" required={true} value={addressPhone} onChange={(e) => setAddressPhone(e.target.value)} />
                                        <Button type="submit" button_text="Edit Address" />
                                    </form>
                                }
                            </div>
                            {addresses.count !== 0 && Object.entries(addresses.addresses).map(([_, address]) => {
                                if (address.address?.name) {
                                    return <AddressSection
                                        name={address.address.name}
                                        house_number={address.address.house_number}
                                        street={address.address.street}
                                        city={address.address.city}
                                        state={address.address.state}
                                        country={address.address.country}
                                        pincode={address.address.pincode}
                                        phone={address.address.phone}
                                        key={Math.random()}
                                    />
                                }
                            })}
                            {addresses.count === 0 && <p>Please add an address to order</p>}
                        </div>
                    </div>
                    <div className={styles['payment_wrapper']}>
                        <h2>Payment</h2>
                        <div className={styles['credit-card_wrapper']}>
                            <div className={styles['card-header']}>
                                <img
                                    src={chip}
                                    alt="chip icon"
                                />
                                <h2>Card</h2>
                            </div>
                            <div className={styles['card-number_wrapper']}>
                                <span className={styles['card-number']}>
                                    {cardNumberState.substring(0, 4) + 'XXXX'.substring(0, 4 - cardNumberState.substring(0, 4).length)}
                                </span>
                                <span className={styles['card-number']}>
                                    {cardNumberState.substring(4, 8) + 'XXXX'.substring(0, 4 - cardNumberState.substring(4, 8).length)}
                                </span>
                                <span className={styles['card-number']}>
                                    {cardNumberState.substring(8, 12) + 'XXXX'.substring(0, 4 - cardNumberState.substring(8, 12).length)}
                                </span>
                                <span className={styles['card-number']}>
                                    {cardNumberState.substring(12, 16) + 'XXXX'.substring(0, 4 - cardNumberState.substring(12, 16).length)}
                                </span>
                            </div>
                            <div className={styles['card-owner_details']}>
                                <div className={styles['card-owner']}>
                                    <p>Owner Name</p>
                                    <h3>{cardOwnerNameState + 'XXXXXXXXX'.substring(0, cardOwnerNameState.length > 10 ? 0 : 10 - cardOwnerNameState.length)}</h3>
                                </div>
                                <p>{expDateState || 'XXXX-XX'}</p>
                            </div>
                        </div>
                        <form className={styles['card-payment_form']} onSubmit={creditCardPaymentSubmitHandler}>
                            <Input type="text" placeholder="Cardholder Name" required={true} inputRef={cardOwnerNameRef} onChange={(e) => setCardOwnerNameState(e.target.value)} />
                            <Input type="text" placeholder="Card Number" required={true} inputRef={cardNumberRef} onChange={(e) => setCardNumberState(e.target.value)} maxLength={16} />
                            <Input type="month" placeholder="Exp. Date" required={true} inputRef={expDataRef} onChange={(e) => setExpDateState(e.target.value)} />
                            <Input type="text" placeholder="CVV" required={true} inputRef={cvvRef} />
                            <Button type="submit" button_text="Make Payment" />
                        </form>
                    </div>
                </div>
            </div>
            {isPaymentSuccess && createPortal(
                <Confirm
                    message="Hurray!! Payment successful"
                    okClickHandler={() => {
                        setIsPaymentSuccess(false)
                        window.location.href = "/"
                    }}
                    cancelClickHandler={() => { setIsPaymentSuccess(false) }}
                />,
                document.getElementById("confirm")!
            )}
        </div>
        {isAddressUpdating && <Toast type="info" message="Updating the Address..." />}
        {isAddressUpdatingCauseError && <Toast type="failure" message="Updating the Address failed..." />}
    </PageSetter>
}

export default CheckoutPage;