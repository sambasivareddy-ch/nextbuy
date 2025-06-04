import React from "react";

import Button from "./Button";
import styles from "../../styles/portals.module.css";

const Confirm: React.FC<{
    message: string,
    okClickHandler: () => void,
    cancelClickHandler: () => void,
}> = (props) => {
    return <div className={styles['confirm-wrapper']}>
        <div className={styles['confirm-main']}>
            <p>{props.message}</p>
            <div className={styles['confirm-action_btns']}>
                <Button 
                    type="button" 
                    button_text="Cancel" 
                    class_name={styles['cancel-checkout_btn']}
                    clickHandler={() => props.cancelClickHandler()}
                />
                <Button 
                    type="button" 
                    button_text="Ok"
                    class_name={styles['proceed-checkout_btn']}
                    clickHandler={() => props.okClickHandler()}
                />
            </div>
        </div>
    </div>
}

export default Confirm;