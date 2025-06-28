import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Toast from '../ui/Toast';
import styles from '../../styles/form.module.css';
import useApi from '../../hooks/useApi';

const CreateAccount: React.FC = () => {
    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const [success, setSuccess] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const [postData, apiData, isLoading, error] = useApi(`http://localhost:5000/auth/create`, 'POST', '');

    useEffect(() => {
        if (apiData) {
            setSuccess(true);
            setValidationError(null);
            navigate('/');
            emailRef.current!.value = '';
            passwordRef.current!.value = '';
            confirmPasswordRef.current!.value = '';
            nameRef.current!.value = '';
            phoneRef.current!.value = '';
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
        const confirmPassword = confirmPasswordRef.current?.value;
        const name = nameRef.current?.value;
        const phone = phoneRef.current?.value;

        if (!email || !password || !confirmPassword || !name || !phone) {
            setValidationError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setValidationError('Passwords do not match');
            return;
        }

        await postData({
            email,
            password,
            name,
            phone
        });
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={formSubmitHandler}>
                <h2 className={styles.formTitle}>Create Account</h2>
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
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    inputRef={confirmPasswordRef}
                    required={true}
                />
                <Input 
                    type='text'
                    name='name'
                    placeholder='Full Name'
                    inputRef={nameRef}
                    required={true}
                />
                <Input 
                    type='tel'
                    name='phone'
                    placeholder='Phone Number'
                    inputRef={phoneRef}
                    required={true}
                />
                <Button
                    type="submit"
                    class_name={styles.formButton}
                    button_text='Create Account'
                />
                <p className={styles.formText}>
                    Already have an account? <Link to="/">Login</Link>  
                </p>
            </form>
            {success && <Toast message="Sign in successful!" type="success" />}
            {error && <Toast message={error} type="failure" />}
            {validationError && <Toast message={validationError} type="info" />}
            {isLoading && <Toast message="Loading..." type="info" />}
        </div>
    );
}  

export default CreateAccount;