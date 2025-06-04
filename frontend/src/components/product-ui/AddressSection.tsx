import React from "react";

import styles from "../../styles/address.module.css";

const AddressSection: React.FC<{
    name: string
    house_number: string,
    street: string,
    city: string,
    state: string,
    country: string,
    pincode: string,
    phone: string,
}> = (props) => {

    return (
        <div className={styles['address-section_wrapper']}>
            <h3>{props.name}</h3>
            <p>{props.house_number} {props.street}, {props.city}, {props.state}, {props.country} {props.pincode}</p>
            <p>Phone: {props.phone}</p>
        </div>
    )
}

export default AddressSection;