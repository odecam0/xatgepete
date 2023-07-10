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
exports.__esModule = true;
exports.ChatPrompt = void 0;
var react_1 = __importStar(require("react"));
var meteor_1 = require("meteor/meteor");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var mongo_1 = require("meteor/mongo");
var Messages = new mongo_1.Mongo.Collection('Messages');
var ChatPrompt = function (props) {
    var messages = (0, react_meteor_data_1.useTracker)(function () {
        meteor_1.Meteor.subscribe('messages', props.currentContext);
        return Messages.find({}).fetch();
    });
    var _a = (0, react_1.useState)(""), prompt_data = _a[0], set_prompt_data = _a[1];
    var handleChange = function (e) { set_prompt_data(e.target.value); };
    var get_chat_messages = function (messages_list) {
        return (messages_list.map(function (p, i) {
            var className = 'self-start bg-white border-l-2 border-black pl-3';
            if (p.from == 'gpt') {
                className = 'self-end bg-white border-r-2 border-black pr-3';
            }
            return (react_1["default"].createElement("div", { key: i, className: className },
                react_1["default"].createElement("text", null, p.text)));
        }));
    };
    // So user cannot prompt anything while system is showing the gpt response
    var _b = (0, react_1.useState)(false), gptIsResponding = _b[0], setGptIsResponding = _b[1];
    // Ui, aqui vai ser complicado de adaptar pro database.
    // Penso que devo manter a mesma lógica, porem apenas dar um update no banco de dados
    var trigger_gpt_response = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setGptIsResponding(true);
            meteor_1.Meteor.call('insertGPTMessageInContext', props.currentContext, function () { return (setGptIsResponding(false)); });
            return [2 /*return*/];
        });
    }); };
    var handleSubmit = function (e) {
        e.preventDefault();
        // Caso não haja mensagem nenhuma, atualiza o nome do contexto
        // para as 16 primeiras letras da primeira pergunta
        if (messages.length == 0) {
            meteor_1.Meteor.call('updateContextName', props.currentContext, prompt_data.slice(0, 16));
        }
        meteor_1.Meteor.call('insertMessageInContext', { from: 'user', text: prompt_data }, props.currentContext);
        set_prompt_data('');
        trigger_gpt_response();
    };
    var canPrompt = function () {
        return (!gptIsResponding && (props.currentContext != ''));
    };
    // Return that renders
    // sm:h-screen is related to mediaquery on Chat.tsx
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "grow flex flex-col justify-start gap-5 break-all overflow-y-auto h-1/2" },
            get_chat_messages(messages),
            react_1["default"].createElement("div", { id: "anchor" })),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "flex w-full flex-col gap-3" },
            react_1["default"].createElement("input", { className: 'grow px-2 border-solid border-b-2 border-black bg-white w-full', type: 'text', value: prompt_data, onChange: handleChange, disabled: !canPrompt() }),
            react_1["default"].createElement("input", { className: 'bg-white rounded-lg p-2 border-black border-2 self-center w-fit', type: 'submit', value: 'Enviar', disabled: !canPrompt() }))));
};
exports.ChatPrompt = ChatPrompt;
