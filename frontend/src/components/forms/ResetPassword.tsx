import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Toast from '../ui/Toast';
import styles from '../../styles/form.module.css';
import useApi from '../../hooks/useApi';

const ResetPassword: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const [success, setSuccess] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const [apiCaller, apiData, isLoading, error] = useApi(`http://localhost:5000/auth/reset-password`, 'PUT', '');

    useEffect(() => {
        if (apiData) {
            setSuccess(true);
            setValidationError(null);
            emailRef.current!.value = '';
            passwordRef.current!.value = '';
            navigate('/');
        } else if (error) {
            setSuccess(false);
            setValidationError(error);
        }
    }, [apiData, error]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(false);
            setValidationError(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [success, validationError]);

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) {
            setValidationError('All fields are required');
            return;
        }

        await apiCaller({
            email,
            password,
        });
    }

    return (
        <div className={styles.formContainer} onSubmit={formSubmitHandler}>
            <form className={styles.form}>
                <h2 className={styles.formTitle}>Update Password</h2>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    inputRef={emailRef}
                    required={true}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Reset Password"
                    inputRef={passwordRef}
                    required={true}
                />
                <Button
                    type="submit"
                    class_name={styles.formButton}
                    button_text='Update Password'
                />
                <p className={styles.formText}>
                    Remembered Password? <Link to="/">Login into Account</Link>
                </p>
            </form>
            {success && <Toast message="Updated password successful!" type="success" />}
            {error && <Toast message={error} type="failure" />}
            {validationError && <Toast message={validationError} type="info" />}
            {isLoading && <Toast message="Loading..." type="info" />}
        </div>
    );
}  

export default ResetPassword;