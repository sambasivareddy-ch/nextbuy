import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Toast from '../ui/Toast';
import styles from '../../styles/form.module.css';
import useApi from '../../hooks/useApi';
import { setUser } from '../../store/userSlice';

const Login: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dispatcher = useDispatch();
    const navigate = useNavigate();

    const [success, setSuccess] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const [apiCaller, apiData, isLoading, error] = useApi(`${import.meta.env.VITE_APP_SERVER_URL}/auth/login`, 'POST', '');

    useEffect(() => {
        if (apiData) {
            setSuccess(true);
            setValidationError(null);
            dispatcher(setUser({
                user: {
                    id: apiData.customer?.id,
                    email: apiData.customer?.email,
                    name: apiData.customer?.name,
                    phone: apiData.customer?.phone,
                },
                token: apiData.token
            }))
            navigate('/');
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

        await apiCaller({
            email,
            password,
        });
    }

    return (
        <div className={styles.formContainer} onSubmit={formSubmitHandler}>
            <form className={styles.form}>
                <p className={styles.homeText}>
                    <Link to="/">Go back to Catalog</Link>
                </p>
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
                <p className={styles.formText}>
                    Forgot your password? <Link to="/forget-password">Reset Password</Link>
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