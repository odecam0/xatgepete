"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.SignInForm = void 0;
var react_1 = __importStar(require("react"));
var meteor_1 = require("meteor/meteor");
var react_loading_1 = __importDefault(require("react-loading"));
var accounts_base_1 = require("meteor/accounts-base");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var icons8_google_1 = require("../../icons/icons8-google");
// Este componente possuirá 3 telas possíveis:
//  O formulário para login
//  O formuĺário para registro
//  Um formulário para confirmar o código enviado por email
var SignInForm = function () {
    var _a = (0, react_1.useState)(false), isSigningUp = _a[0], setIsSigningUp = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null, isSigningUp ?
        react_1["default"].createElement(SignUpForm, { switchCallback: function () { return setIsSigningUp(false); } }) :
        react_1["default"].createElement(LoginForm, { switchCallback: function () { return setIsSigningUp(true); } })));
};
exports.SignInForm = SignInForm;
var AbstractForm = function (props) {
    var outer_div_style = "grid place-items-center w-full h-full";
    var inner_div_style = "border-solid border-black border-2 h-min p-8 rounded-xl flex flex-col gap-2";
    var inside_form_div_style = "flex flex-col gap-8";
    var fields_div_style = "flex flex-col gap-6";
    var submit_button_style = "border-solid border-black border-2 self-center py-1 px-4 rounded-lg";
    var switch_button_style = "self-center text-blue-700 border-b-2 border-blue-700";
    return (react_1["default"].createElement("div", { className: outer_div_style },
        react_1["default"].createElement("div", { className: inner_div_style },
            react_1["default"].createElement("form", { method: "post", onSubmit: props.submit_callback },
                react_1["default"].createElement("div", { className: inside_form_div_style },
                    react_1["default"].createElement("div", { className: fields_div_style }, props.fields.map(function (element, index) { return (react_1["default"].createElement("label", { key: index },
                        " ",
                        element.label,
                        react_1["default"].createElement("input", { className: element.className, disabled: element.disabled, value: element.value, onChange: element.onChange, type: element.type }))); })),
                    react_1["default"].createElement("div", { className: "flex justify-center" }, props.isLoading ? react_1["default"].createElement(react_loading_1["default"], { type: 'cubes', color: 'black', height: '10%', width: '10%' }) : react_1["default"].createElement("div", null)),
                    react_1["default"].createElement("button", { className: submit_button_style, type: "submit" }, props.submit_message))),
            (props.errorMessage != '') ?
                react_1["default"].createElement("div", { className: "text-red-700" }, props.errorMessage) : "",
            props.switchCallback ?
                react_1["default"].createElement("button", { className: switch_button_style, onClick: props.switchCallback, type: "button" }, props.switchButtonText)
                : react_1["default"].createElement("div", null),
            props.additionalButtons ? props.additionalButtons : react_1["default"].createElement("div", null))));
};
var LoginForm = function (props) {
    var _a = (0, react_1.useState)(''), username = _a[0], setUsername = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var _d = (0, react_1.useState)(false), isLoading = _d[0], setIsLoading = _d[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 1000); })];
                case 1:
                    _a.sent();
                    meteor_1.Meteor.loginWithPassword(username, password, function (e) {
                        setErrorMessage('Houve um erro ao tentar conectar com este usuário e senha.');
                        setUsername('');
                        setPassword('');
                    });
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var text_input_style = "bg-inherit border-b-2 border-black";
    var disabled_text_input_style = "bg-inherit border-b-2 border-grey";
    return (react_1["default"].createElement(AbstractForm, { fields: [
            {
                label: "Username",
                className: isLoading ? disabled_text_input_style : text_input_style,
                disabled: isLoading,
                onChange: function (e) { return setUsername(e.target.value); },
                value: username,
                type: "text"
            },
            {
                label: "Senha",
                className: isLoading ? disabled_text_input_style : text_input_style,
                disabled: isLoading,
                onChange: function (e) { return setPassword(e.target.value); },
                value: password,
                type: "password"
            }
        ], additionalButtons: react_1["default"].createElement(LoginWithGoogle, null), submit_callback: handleSubmit, submit_message: "Conectar-se", isLoading: isLoading, errorMessage: errorMessage, switchCallback: props.switchCallback, switchButtonText: "Registrar-se" }));
};
var SignUpForm = function (props) {
    var _a = (0, react_1.useState)(''), username = _a[0], setUsername = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(''), passwordRepeat = _c[0], setPasswordRepeat = _c[1];
    var _d = (0, react_1.useState)(''), email = _d[0], setEmail = _d[1];
    var _e = (0, react_1.useState)(''), emailRepeat = _e[0], setEmailRepeat = _e[1];
    var _f = (0, react_1.useState)(''), errorMessage = _f[0], setErrorMessage = _f[1];
    var _g = (0, react_1.useState)(false), isLoading = _g[0], setIsLoading = _g[1];
    var _h = (0, react_1.useState)(false), emailSent = _h[0], setEmailSent = _h[1];
    var text_input_style = "bg-inherit border-b-2 border-black";
    var disabled_text_input_style = "bg-inherit border-b-2 border-grey";
    var handleSubmit = function (e) {
        e.preventDefault();
        setIsLoading(true);
        if (password == passwordRepeat) {
            if (email == emailRepeat) {
                meteor_1.Meteor.call('checkIfEmailExists', email, function (error, result) {
                    if (!result) {
                        meteor_1.Meteor.call('sendEmail', email);
                        setEmailSent(true);
                    }
                    else {
                        setErrorMessage("Este email ja está cadastrado.");
                    }
                });
            }
            else {
                setErrorMessage('Os emails não batem');
            }
        }
        else {
            setErrorMessage('As senhas não batem');
        }
        setIsLoading(false);
    };
    var finishChecking = function (result) {
        setIsLoading(true);
        if (result) {
            meteor_1.Meteor.call('registerAccount', username, email, password);
            meteor_1.Meteor.loginWithPassword(username, password);
        }
        else {
            setErrorMessage("O tempo do código esgotou, tente novamente.");
        }
        setEmailSent(false);
        setIsLoading(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, emailSent ? react_1["default"].createElement(CheckEmailCodeForm, { finishChecking: finishChecking, email: email }) :
        react_1["default"].createElement(AbstractForm, { fields: [
                {
                    label: "Username",
                    className: isLoading ? disabled_text_input_style : text_input_style,
                    disabled: isLoading,
                    onChange: function (e) { return setUsername(e.target.value); },
                    value: username,
                    type: "text"
                },
                {
                    label: "Email",
                    className: isLoading ? disabled_text_input_style : text_input_style,
                    disabled: isLoading,
                    onChange: function (e) { return setEmail(e.target.value); },
                    value: email,
                    type: "text"
                },
                {
                    label: "Repita o Email",
                    className: isLoading ? disabled_text_input_style : text_input_style,
                    disabled: isLoading,
                    onChange: function (e) { return setEmailRepeat(e.target.value); },
                    value: emailRepeat,
                    type: "text"
                },
                {
                    label: "Senha",
                    className: isLoading ? disabled_text_input_style : text_input_style,
                    disabled: isLoading,
                    onChange: function (e) { return setPassword(e.target.value); },
                    value: password,
                    type: "password"
                },
                {
                    label: "Repita a senha",
                    className: isLoading ? disabled_text_input_style : text_input_style,
                    disabled: isLoading,
                    onChange: function (e) { return setPasswordRepeat(e.target.value); },
                    value: passwordRepeat,
                    type: "password"
                },
            ], submit_callback: handleSubmit, submit_message: "Registrar-se", isLoading: isLoading, errorMessage: errorMessage, switchCallback: props.switchCallback, switchButtonText: "Conectar-se" })));
};
var CheckEmailCodeForm = function (props) {
    var _a = (0, react_1.useState)(''), emailCode = _a[0], setEmailCode = _a[1];
    var _b = (0, react_1.useState)(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_1.useState)(''), errorMessage = _c[0], setErrorMessage = _c[1];
    var text_input_style = "bg-inherit border-b-2 border-black";
    var disabled_text_input_style = "bg-inherit border-b-2 border-grey";
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
    var handleSubmit = function (e) {
        e.preventDefault();
        setIsLoading(true);
        meteor_1.Meteor.call('checkEmailCode', props.email, emailCode, function (error, result) {
            if (!error) {
                if (result == 'success') {
                    props.finishChecking(true);
                }
                else if (result == 'timedout') {
                    props.finishChecking(false);
                }
                else {
                    setErrorMessage("Este não é o código correto");
                    setEmailCode('');
                }
            }
            else {
                setErrorMessage("Houve um erro no servidor");
                setEmailCode('');
            }
        });
        setIsLoading(false);
    };
    return (react_1["default"].createElement(AbstractForm, { fields: [
            {
                label: "Insira o código enviado por Email",
                className: isLoading ? disabled_text_input_style : text_input_style,
                disabled: isLoading,
                onChange: function (e) { return setEmailCode(e.target.value); },
                value: emailCode,
                type: "text"
            }
        ], submit_callback: handleSubmit, submit_message: "Enviar", isLoading: isLoading, errorMessage: errorMessage }));
};
var LoginWithGoogle = function () {
    var handleLogin = function () {
        meteor_1.Meteor.loginWithGoogle({
            requestPermissions: ['openid', 'profile', 'email'],
            loginStyle: 'popup'
        }, function (error) { console.log(error); });
    };
    var serviceOn = (0, react_meteor_data_1.useTracker)(function () { return accounts_base_1.Accounts.loginServicesConfigured(); });
    return (react_1["default"].createElement(react_1["default"].Fragment, null, serviceOn ?
        react_1["default"].createElement("button", { type: "button", className: "border-solid border-black border-2 p-4 rounded-lg flex gap-5 items-center", onClick: handleLogin },
            "Conecte-se usando o Google ",
            react_1["default"].createElement(icons8_google_1.ReactComponent, { className: "self-end" })) : react_1["default"].createElement("div", null)));
};
