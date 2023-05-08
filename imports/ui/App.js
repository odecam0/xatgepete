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
exports.App = void 0;
var react_1 = __importStar(require("react"));
var App = function () { return (react_1["default"].createElement("div", { className: "flex h-screen" },
    react_1["default"].createElement("div", { className: "flex flex-col items-center pt-10 pb-10 bg-sky-900" },
        react_1["default"].createElement(Context_to_chat, null),
        react_1["default"].createElement(Options, null)),
    react_1["default"].createElement(ChatPrompt, null))); };
exports.App = App;
var mock_other_conversations = [
    { title: "Primeira conversa" },
    { title: "Segunda conversa" },
    { title: "Decima quinta conversa?" }
];
var Context_to_chat = function (props) {
    var get_chats_buttons = function (buttoms_list) {
        return (buttoms_list.map(function (p, i) { return (react_1["default"].createElement("buttom", { className: "bg-sky-600 border-sky-300 font-black", key: i, type: 'buttom' }, p.title)); }));
    };
    return (react_1["default"].createElement("div", { className: "flex flex-col grow gap-2 px-3" }, get_chats_buttons(mock_other_conversations)));
};
var Options = function (props) {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("buttom", { className: "font-black", type: "buttom" }, "Op\u00E7\u00F5es")));
};
// TODO: manter o chat scrollado pra baixo.
var ChatPrompt = function (props) {
    var _a = (0, react_1.useState)([
        { from: 'user', text: 'Mensagem exemplo do usuário' },
        { from: 'gpt', text: 'Resposta exemplo do ChatGPT' }
    ]), messages = _a[0], set_messages = _a[1];
    var _b = (0, react_1.useState)(""), prompt_data = _b[0], set_prompt_data = _b[1];
    var handleChange = function (e) { set_prompt_data(e.target.value); };
    var get_chat_messages = function (messages_list) {
        return (messages_list.map(function (p, i) {
            var className = 'self-start bg-cyan-700 p-2 rounded-lg';
            if (p.from == 'gpt') {
                className = 'self-end bg-cyan-700 p-2 rounded-lg';
            }
            return (react_1["default"].createElement("div", { key: i, className: className },
                react_1["default"].createElement("text", null, p.text)));
        }));
    };
    // Por algum motivo está reconhecendo o messages antigo, sem o imput do usuário....
    var trigger_gpt_response = function (userPrompt) { return __awaiter(void 0, void 0, void 0, function () {
        var message, sent_message, _a, _b, _c, _i, i;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    message = 'Ainda não tem o chatGPT respondendo'.split(' ');
                    sent_message = '';
                    set_messages(messages.concat([userPrompt, { from: 'gpt', text: sent_message }]));
                    _a = message;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    i = _c;
                    sent_message = sent_message + message[i] + ' ';
                    // set_messages(messages.slice(0, -1).concat([{from:'gpt', text:sent_message}]));
                    set_messages(messages.concat([userPrompt, { from: 'gpt', text: sent_message }]));
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 200); })];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (e) {
        e.preventDefault();
        set_messages(messages.concat([{ from: 'user', text: prompt_data }]));
        set_prompt_data('');
        trigger_gpt_response({ from: 'user', text: prompt_data });
    };
    return (react_1["default"].createElement("div", { className: "bg-cyan-400 grow flex flex-col py-3 px-2" },
        react_1["default"].createElement("div", { className: "grow flex flex-col justify-start" },
            get_chat_messages(messages),
            react_1["default"].createElement("div", { id: "anchor" })),
        react_1["default"].createElement("form", { onSubmit: handleSubmit, className: "w-full flex gap-1" },
            react_1["default"].createElement("input", { className: 'grow rounded-lg px-2', type: 'text', value: prompt_data, onChange: handleChange }),
            react_1["default"].createElement("input", { className: 'w-1/12 bg-sky-200 rounded-lg p-1', type: 'submit', value: 'Enviar' }))));
};
