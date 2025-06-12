import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Toast from '../ui/Toast';
import styles from '../../styles/form.module.css';
import useApi from '../../hooks/useApi';

const Login: React.FC<{
    setIsLoggedIn: () => void;
}> = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [success, setSuccess] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const [postData, apiData, isLoading, error] = useApi(`${import.meta.env.VITE_APP_API_URL}/auth/login`, 'POST');

    useEffect(() => {
        if (apiData) {
            setSuccess(true);
            setValidationError(null);
            emailRef.current!.value = '';
            passwordRef.current!.value = '';
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

        await postData({
            email,
            password,
        });
    }

    return (
        <div className={styles.formContainer} onSubmit={formSubmitHandler}>
            <form className={styles.form}>
                <h2 className={styles.formTitle}>Login</h2>
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
                    placeholder="Password"
                    inputRef={passwordRef}
                    required={true}
                />
                <Button
                    type="submit"
                    class_name={styles.formButton}
                    button_text='Login'
                />
                <p className={styles.formText}>
                    Don't have an account? <Link to="/create-account">Create Account</Link>
                </p>
            </form>
            {success && <Toast message="Sign up successful!" type="success" />}
            {error && <Toast message={error} type="failure" />}
            {validationError && <Toast message={validationError} type="info" />}
            {isLoading && <Toast message="Loading..." type="info" />}
        </div>
    );
}  

export default Login;