import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Spinners from '../Spinners/Spinners';

const SignUp = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        emailUser,
        emailLoading,
        emailError,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating] = useUpdateProfile(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (emailUser || googleUser) {

            let user = emailUser || googleUser;
            console.log(user.user.displayName);
            const url = `https://simple-to-do-app-server.herokuapp.com/login`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.user.email
                })
            })
                .then(res => res.json())
                .then(data => {
                    let message = `Sign up Success`;
                    toast.success(message, { id: 'login' });
                    localStorage.setItem('accessToken', data.accessToken);
                    navigate(from, { replace: true });
                })
        }
    }, [emailUser, googleUser, navigate, from]);

    useEffect(() => {
        if (emailError || googleError) {
            let errorNote = emailError || googleError;
            toast.error(errorNote?.message, { id: 'signupError' });
        }
    }, [emailError, googleError]);

    if (emailLoading || googleLoading || updating) {
        return <Spinners></Spinners>
    }

    return (
        <div>
            <section className="mb-10">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?t=st=1650271995~exp=1650272595~hmac=c3f6965ddf672f82382af0d6f1b688b3cb684039f0593cb9fb7569a3b5285ee2&w=740" className="w-full" alt="login-logo" />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form>
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="text-lg mb-0 mr-4">Sign up with</p>

                                    <button
                                        onClick={() => signInWithGoogle()}
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1">
                                        {/* -- Google sign up-- */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-4 h-4">
                                            <path
                                                fill="currentColor"
                                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                                    </button>

                                </div>

                                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p className="text-center font-semibold mx-4 mb-0">Or</p>
                                </div>

                                {/* -- Name input -- */}
                                <div className="mb-6">
                                    <input
                                        onBlur={(e) => setDisplayName(e.target.value)}
                                        type="text"
                                        required
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput1"
                                        placeholder="Your Name" />
                                </div>
                                {/* -- Email input -- */}
                                <div className="mb-6">
                                    <input
                                        onBlur={(e) => setEmail(e.target.value)}
                                        type="text"
                                        required
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Email address" />
                                </div>

                                {/* -- Password input -- */}
                                <div className="mb-6">
                                    <input
                                        onBlur={(e) => setPassword(e.target.value)}
                                        type="password"
                                        required
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput3"
                                        placeholder="Password" />
                                </div>

                                <div className="text-center lg:text-left">
                                    <button
                                        onClick={async () => {
                                            if (displayName || email || password) {
                                                if (!email.includes('@')) {
                                                    toast.error('Invalid E-mail ID', { id: 'email@Error' })
                                                }
                                                else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
                                                    await createUserWithEmailAndPassword(email, password);
                                                    await updateProfile({ displayName });
                                                    await sendEmailVerification();
                                                } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
                                                    toast.error('Password Must Contain Minimum eight characters, at least one letter and one number', { id: 'passError' })
                                                }
                                            } else {
                                                toast.error('Name, Email & password required', { id: 'inputError' })
                                            }
                                        }}
                                        type="button"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Sign up
                                    </button>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Already have an account?
                                        <Link
                                            to='/login'
                                            className="mx-2 text-blue-600 hover:text-red-500 focus:text-red-500 ttransition duration-150 ease-in"
                                        >Login</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUp;