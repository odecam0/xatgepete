import React, {useState} from 'react';
import { Meteor } from 'meteor/meteor';
import ReactLoading from 'react-loading';
import { Accounts } from 'meteor/accounts-base';
import { useTracker } from 'meteor/react-meteor-data';

// Este componente possuirá 3 telas possíveis:
//  O formulário para login
//  O formuĺário para registro
//  Um formulário para confirmar o código enviado por email

export const SignInForm: React.FC = () => {
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

    return (
        <>
            {
                isSigningUp ?
                    <SignUpForm switchCallback={() => setIsSigningUp(false)} /> :
                    <LoginForm switchCallback={() => setIsSigningUp(true)} />
            }
        </>
    )
}

interface AbstractFormProps {
    fields: Array<{
        label: string;
        className: string;
        disabled: boolean;
        onChange: Function;
        value: string;
        type: string;
    }>;
    additionalButtons: [React.FC],
    submit_callback: Function;
    submit_message: Function;
    isLoading: boolean;
    errorMessage: string;
    switchCallback: Function;
    switchButtonText: string;
}

const AbstractForm : React.FC = ( props : AbstractFormProps ) => {
    const outer_div_style = "grid place-items-center w-full h-full";
    const inner_div_style = "border-solid border-black border-2 h-min p-8 rounded-xl flex flex-col gap-2";
    const inside_form_div_style = "flex flex-col gap-8";
    const fields_div_style = "flex flex-col gap-6";
    const submit_button_style = "border-solid border-black border-2 self-center py-1 px-4 rounded-lg";
    const switch_button_style = "self-center text-blue-700 border-b-2 border-blue-700";

    return (
        <div className={outer_div_style}>
            <div className={inner_div_style}>
                <form method="post" onSubmit={props.submit_callback}>
                    <div className={inside_form_div_style}>
                        <div className={fields_div_style}>
                            {
                                props.fields.map((element, index) => (
                                    <label key={index}> {element.label}
                                        <input className={element.className} disabled={element.disabled}
                                            value={element.value} onChange={element.onChange}
                                            type={element.type} />
                                    </label>
                                ))
                            }
                        </div>
                        <div className="flex justify-center">
                            {props.isLoading ? <ReactLoading type='cubes'
                                color='black' height='10%' width='10%' /> : <div />}
                        </div>
                        <button className={submit_button_style} type="submit">
                            {props.submit_message}
                        </button>
                    </div>
                </form>
                {(props.errorMessage != '') ?
                    <div className="text-red-700">
                        {props.errorMessage}
                    </div> : ""}
                {props.switchCallback ?
                    <button className={switch_button_style}
                        onClick={props.switchCallback}
                        type="button">{props.switchButtonText}</button>
                    : <div />}
        {props.additionalButtons ? props.additionalButtons : <div />}
            </div>
        </div >
    );
}

interface ConcreteFormProps {
    switchCallback: Function
}

const LoginForm : React.FC = ( props : ConcreteFormProps ) => {
    const [username , setUsername] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        await new Promise(r => setTimeout(r, 1000));

        Meteor.loginWithPassword(username, password, (e) => {
            setErrorMessage('Houve um erro ao tentar conectar com este usuário e senha.');
            setUsername('');
            setPassword('');
        })

        setIsLoading(false);
    }

    const text_input_style = "bg-inherit border-b-2 border-black"
    const disabled_text_input_style = "bg-inherit border-b-2 border-grey"

    return (
        <AbstractForm
            fields={[
                {
                    label: "Username",
                    className: isLoading ? disabled_text_input_style : text_input_style,
                    disabled: isLoading,
                    onChange: (e) => setUsername(e.target.value),
                    value: username,
                    type: "text"
                },
                {
                    label: "Senha",
                    className: isLoading ? disabled_text_input_style : text_input_style,
                    disabled: isLoading,
                    onChange: (e) => setPassword(e.target.value),
                    value: password,
                    type: "password"
                }
            ]}
            additionalButtons={<LoginWithGoogle/>}
            submit_callback={handleSubmit}
            submit_message="Conectar-se"
            isLoading={isLoading}
            errorMessage={errorMessage}
            switchCallback={props.switchCallback}
            switchButtonText="Registrar-se"
        />
    );

}

const SignUpForm : React.FC = ( props : ConcreteFormProps ) => {
    const [username , setUsername] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [passwordRepeat , setPasswordRepeat] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailRepeat, setEmailRepeat] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [emailSent, setEmailSent] = useState<boolean>(false);

    const text_input_style = "bg-inherit border-b-2 border-black"
    const disabled_text_input_style = "bg-inherit border-b-2 border-grey"

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true);
        if (password == passwordRepeat) {
            if (email == emailRepeat) {
                Meteor.call('checkIfEmailExists', email, (error, result : boolean) => {
                    if (!result) {
                        Meteor.call('sendEmail', email);
                        setEmailSent(true);
                    } else {
                        setErrorMessage("Este email ja está cadastrado.")
                    }
                })
            } else {
                setErrorMessage('Os emails não batem')
            }
        } else {
            setErrorMessage('As senhas não batem')
        }
        setIsLoading(false);
    }

    const finishChecking = (result : boolean) => {
        setIsLoading(true);
        if (result) {
            Meteor.call('registerAccount', username, email, password)
            Meteor.loginWithPassword(username, password)
        } else {
            setErrorMessage("O tempo do código esgotou, tente novamente.")
        }
        setEmailSent(false);
        setIsLoading(false);
    }

    return (
        <>
            {
                emailSent ? <CheckEmailCodeForm finishChecking={finishChecking} email={email}/> :
                    <AbstractForm
                        fields={[
                            {
                                label: "Username",
                                className: isLoading ? disabled_text_input_style : text_input_style,
                                disabled: isLoading,
                                onChange: (e) => setUsername(e.target.value),
                                value: username,
                                type: "text"
                            },
                            {
                                label: "Email",
                                className: isLoading ? disabled_text_input_style : text_input_style,
                                disabled: isLoading,
                                onChange: (e) => setEmail(e.target.value),
                                value: email,
                                type: "text"
                            },
                            {
                                label: "Repita o Email",
                                className: isLoading ? disabled_text_input_style : text_input_style,
                                disabled: isLoading,
                                onChange: (e) => setEmailRepeat(e.target.value),
                                value: emailRepeat,
                                type: "text"
                            },
                            {
                                label: "Senha",
                                className: isLoading ? disabled_text_input_style : text_input_style,
                                disabled: isLoading,
                                onChange: (e) => setPassword(e.target.value),
                                value: password,
                                type: "password"
                            },
                            {
                                label: "Repita a senha",
                                className: isLoading ? disabled_text_input_style : text_input_style,
                                disabled: isLoading,
                                onChange: (e) => setPasswordRepeat(e.target.value),
                                value: passwordRepeat,
                                type: "password"
                            },
                        ]}
                        submit_callback={handleSubmit}
                        submit_message="Registrar-se"
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        switchCallback={props.switchCallback}
                        switchButtonText="Conectar-se" />
            }
        </>
    );
}

interface CheckEmailProps {
    finishChecking: Function;
    email: string;
}

const CheckEmailCodeForm : React.FC = ( props : CheckEmailProps ) => {
    const [emailCode, setEmailCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const text_input_style = "bg-inherit border-b-2 border-black";
    const disabled_text_input_style = "bg-inherit border-b-2 border-grey";

    // Há uma complexidade aqui. Ao enviar o código este deve ser válido por
    // apenas um período de tempo, e a verificação do código é feita pelo
    // servidor. Como o servidor sabe qual código é de qual usuário?

    // Pensie no seguinte, o servidor, ao enviar o email com o código, armazena
    // o email, junto com o código enviado em uma coleção temporária no mongoDB.
    // Inicia um timer com o tempo em que o código é valido, e quando o tempo se
    // esgotar, uma flag é ativada que fará com que o metodo retorne um valor que
    // indicará que não conseguiu acertar o código a tempo, e este componente irá
    // retornar para o componente pai. Caso retorne True, apenas remove a entrada
    // da collection temporária e adciona o usuário.
    // Então o método deve retornar 3 possibildades.

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        Meteor.call('checkEmailCode', props.email, emailCode,
            (error, result: 'success' | 'failed' | 'timedout') => {
                if (!error) {
                    if (result == 'success') {
                        props.finishChecking(true);
                    } else if (result == 'timedout') {
                        props.finishChecking(false);
                    } else {
                        setErrorMessage("Este não é o código correto");
                        setEmailCode('');
                    }
                } else {
                    setErrorMessage("Houve um erro no servidor")
                    setEmailCode('');
                }
            });
        setIsLoading(false);
    }

    return(
        <AbstractForm
        fields={[
            {
                label: "Insira o código enviado por Email",
                className: isLoading ? disabled_text_input_style : text_input_style,
                disabled: isLoading,
                onChange: (e) => setEmailCode(e.target.value),
                value: emailCode,
                type: "text"
            }
        ]}
        submit_callback={handleSubmit}
        submit_message="Enviar"
        isLoading={isLoading}
        errorMessage={errorMessage} />
    );
}

const LoginWithGoogle : React.FC = () => {
    const handleLogin = () => {
        Meteor.loginWithGoogle({
            requestPermissions: ['openid', 'profile', 'email'],
            loginStyle: 'popup'
        }, (error) => {console.log(error)});
    };

    const serviceOn = useTracker(() => Accounts.loginServicesConfigured())

    return (
        <>
        {
            serviceOn ?
                <button type="button" className="border-solid border-black border-2 p-4 rounded-lg" onClick={handleLogin}>
                    Conecte-se usando o Google
                </button> : <div />
        }
        </>
    );
}
