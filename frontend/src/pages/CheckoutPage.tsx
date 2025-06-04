import React, { useState, useRef, FormEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import PageSetter from "../components/product-ui/PageSetter";
import PageNavigation from "../components/product-ui/PageNavigation";
import AddressSection from "../components/product-ui/AddressSection";
import CartProduct from "../components/product-ui/CartProduct";
import AddCircleIcon from '@mui/icons-material/AddCircle'; 
import RemoveIcon from '@mui/icons-material/Remove';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import chip from "../assets/chip.png";
import Loading from "../components/ui/Loading";
import Confirm from "../components/ui/Confirm";

import type { RootState } from "../store/store";
import { addressState, addToAddress } from "../store/addressSlice";
import { AddressInfo } from "../types/types";
import styles from "../styles/checkout.module.css";

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const addresses: addressState = useSelector((state: RootState) => state.address);
    const cart = useSelector((state: RootState) => state.cart);

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
    const phoneRef =useRef<HTMLInputElement>(null)

    const cardOwnerNameRef = useRef<HTMLInputElement>(null);
    const cardNumberRef = useRef<HTMLInputElement>(null);
    const expDataRef = useRef<HTMLInputElement>(null);
    const cvvRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isPaymentProcessing) {
            setTimeout(() => {
                setIsPaymentProcessing(false);
                setIsPaymentSuccess(true);
            }, 3000)
        }
    }, [isPaymentProcessing])

    const addAddressFormSubmitHandler = (e: FormEvent) => {
        e.preventDefault()

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

    const creditCardPaymentSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        setIsPaymentProcessing(true);
    }

    return isPaymentProcessing? <Loading/> : <PageSetter>
        <div className={styles['main-page_wrapper']}>
            <div className={styles['page']}>
                <PageNavigation location={location}/>
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
                                    {!showAddAddressForm && <button onClick={() => {setShowAddAddressForm(true)}}>
                                        <AddCircleIcon/>
                                    </button>}
                                    {showAddAddressForm && <button onClick={() => {setShowAddAddressForm(false)}}>
                                        <RemoveIcon/>
                                    </button>}
                                </div>
                                {showAddAddressForm && 
                                    <form className={styles['add-address_form']} onSubmit={addAddressFormSubmitHandler}>
                                        <Input type="text" placeholder="Name" required={true} inputRef={nameRef}/>
                                        <Input type="text" placeholder="House No." required={true} inputRef={houseNumberRef}/>
                                        <Input type="text" placeholder="Street" required={true} inputRef={streetRef}/>
                                        <Input type="text" placeholder="City" required={true} inputRef={cityRef}/>
                                        <Input type="text" placeholder="State" required={true} inputRef={stateRef}/>
                                        <Input type="text" placeholder="Country" required={true} inputRef={countryRef}/>
                                        <Input type="text" placeholder="Pincode" required={true} inputRef={pincodeRef}/>
                                        <Input type="text" placeholder="Phone Number" required={true} inputRef={phoneRef}/>
                                        <Button type="submit" button_text="Add Address"/>
                                    </form>
                                }
                            </div>
                            {addresses.count !== 0 && Object.entries(addresses.addresses).map(([_, address]) => {
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
                                <img 
                                    src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                                    alt="visa icon"
                                />
                            </div>
                            <div className={styles['card-number_wrapper']}>
                                <span className={styles['card-number']}>2787</span>
                                <span className={styles['card-number']}>2000</span>
                                <span className={styles['card-number']}>2410</span>
                                <span className={styles['card-number']}>2025</span>
                            </div>
                            <div className={styles['card-owner_details']}>
                                <div className={styles['card-owner']}>
                                    <p>Owner Name</p>
                                    <h3>Samba Chinta</h3>
                                </div>
                                <p>01/30</p>
                            </div>
                        </div>
                        <form className={styles['card-payment_form']} onSubmit={creditCardPaymentSubmitHandler}>
                            <Input type="text" placeholder="Cardholder Name" required={true} inputRef={cardOwnerNameRef}/>
                            <Input type="text" placeholder="Card Number" required={true} inputRef={cardNumberRef}/>
                            <Input type="month" placeholder="Exp. Date" required={true} inputRef={expDataRef}/>
                            <Input type="text" placeholder="CVV" required={true} inputRef={cvvRef}/>
                            <Button type="submit" button_text="Make Payment"/>
                        </form>
                    </div>
                </div>
            </div>
            {isPaymentSuccess && createPortal(
                <Confirm 
                    message="Hurray!! Payment successful" 
                    okClickHandler={() => {
                        setIsPaymentSuccess(false)
                        window.location.href="/"
                    }}
                    cancelClickHandler={() => {setIsPaymentSuccess(false)}}
                />,
                document.getElementById("confirm")!
            )}
        </div>
    </PageSetter>
}

export default CheckoutPage;