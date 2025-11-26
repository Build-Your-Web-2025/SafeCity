import React, { useState, useEffect } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { registerUser, signInWithGoogle, setupRecaptcha, signInWithPhone } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [showPhoneVerification, setShowPhoneVerification] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Setup recaptcha on component mount
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = setupRecaptcha('recaptcha-container');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Registration failed", error);
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/dashboard");
        } catch (error) {
            console.error("Google sign-in failed", error);
            alert(error.message);
        }
    };

    const handlePhoneSignIn = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPhone(phoneNumber, window.recaptchaVerifier);
            setConfirmationResult(result);
            setShowPhoneVerification(true);
            alert("Verification code sent to your phone!");
        } catch (error) {
            console.error("Phone sign-in failed", error);
            alert(error.message);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            await confirmationResult.confirm(verificationCode);
            navigate("/dashboard");
        } catch (error) {
            console.error("Verification failed", error);
            alert("Invalid verification code");
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to SafeCity
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Join the community to report and track incidents.
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input
                            id="firstname"
                            placeholder="Tyler"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input
                            id="lastname"
                            placeholder="Durden"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                        className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
                        type="button"
                        onClick={handleGoogleSignIn}
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                            Sign up with Google
                        </span>
                        <BottomGradient />
                    </button>
                </div>
            </form>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            {!showPhoneVerification ? (
                <form onSubmit={handlePhoneSignIn} className="space-y-4">
                    <LabelInputContainer>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            placeholder="+1234567890"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </LabelInputContainer>
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                    >
                        Sign up with Phone &rarr;
                        <BottomGradient />
                    </button>
                </form>
            ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                    <LabelInputContainer>
                        <Label htmlFor="code">Verification Code</Label>
                        <Input
                            id="code"
                            placeholder="123456"
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </LabelInputContainer>
                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                    >
                        Verify Code &rarr;
                        <BottomGradient />
                    </button>
                </form>
            )}

            <div id="recaptcha-container"></div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
