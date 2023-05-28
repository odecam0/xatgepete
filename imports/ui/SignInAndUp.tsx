import React, {useState} from 'react';
import { Meteor } from 'meteor/meteor';

export const SignInForm : React.FC = (props) => {

    const [username , setUsername] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [passwordRepeat , setPasswordRepeat] = useState<string>('');

    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSignUp = (e) => {
        e.preventDefault();

        if (password == passwordRepeat) {
            Meteor.call('registerAccount', username, password)
            Meteor.loginWithPassword(username, password)
        } else {
            setErrorMessage("As duas senhas precisam ser idênticas.")
            setPassword('');
            setPasswordRepeat('');
        }
    }

    const handleSignIn = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password, (e) => {
            setErrorMessage('Houve um erro ao tentar conectar com este usuário e senha.');
            setUsername('');
            setPassword('');
        }
    }

    const text_input_style = "bg-inherit border-b-2 border-black"

    return (
        <div className="grid place-items-center w-full h-full">
            <div className="border-solid border-black border-2 h-min p-8 rounded-xl flex flex-col gap-2">
                <form method="post" onSubmit={isSigningUp ? handleSignUp : handleSignIn}>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-6">
                            <label> Nome de usuário:
                                <input className={text_input_style} name="username" value={username}
                                    onChange={(e) => (setUsername(e.target.value))} />
                            </label>
                            <label> Senha:
                                <input className={text_input_style} type="password" name="password"
                                    value={password} onChange={(e) => (setPassword(e.target.value))} />
                            </label>
                            {
                                isSigningUp ?
                                    <label> Repita a senha:
                                    <input className={text_input_style} type="password" name="password-repeat"
                                        value={passwordRepeat} onChange={(e) => (setPasswordRepeat(e.target.value))} />
                                </label> : ""
                            }
                        </div>
                        <button
                            className="border-solid border-black border-2 self-center py-1 px-4 rounded-lg"
                            type="submit">
                            {isSigningUp ? "Registrar-se" : "Conectar-se"}
                        </button>
                    </div>
                </form>
                {
                    (errorMessage != '') ?
                        <div className="text-red-700">
                            {errorMessage}
                        </div> : ""
                }
                <button className="self-center text-blue-700 border-b-2 border-blue-700"
                    onClick={isSigningUp ? () => setIsSigningUp(false) : () => setIsSigningUp(true)}
                    type="button">{isSigningUp ? "Conectar-se" : "Registrar-se"}</button>
            </div>
        </div>
    );
}
