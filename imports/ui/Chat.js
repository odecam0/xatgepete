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
exports.__esModule = true;
exports.Chat = void 0;
var meteor_1 = require("meteor/meteor");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var react_1 = __importStar(require("react"));
var mongo_1 = require("meteor/mongo");
var Contexts = new mongo_1.Mongo.Collection('Contexts');
var Context_to_chat_1 = require("./Context_to_chat");
var Options_1 = require("./Options");
var ChatPrompt_1 = require("./ChatPrompt");
var react_responsive_1 = require("react-responsive");
var door_closed_1 = require("../../icons/door-closed");
var door_open_1 = require("../../icons/door-open");
// Este componente é responsável pelo posição de 3 outros componentes da página:
// O contexto com as conversas já realizadas pelo usuário (Context_to_chat),
// as opções disponibilizadasd (Options), e o chat com as mensagens e os prompts
// (ChatPrompt).
//
// Também é responsável por comunicar o estado de qual conversa está sendo selecionada
// agora, e as mensagens exibidas pelo ChatPrompt.
var Chat = function () {
    // sessão de usuário
    // Se for mobile, deve mostrar apenas os contextos, ou apenas o prompt com as mensagens.
    // Se for mobile, o contexto deve iniciar escondido, já no desktop não.
    var isDesktop = (0, react_responsive_1.useMediaQuery)({ query: '(min-width: 640px)' });
    var _a = (0, react_1.useState)(true), showContexts = _a[0], setShowContexts = _a[1];
    var context_list = (0, react_meteor_data_1.useTracker)(function () {
        meteor_1.Meteor.subscribe('contexts'); // atualizada com o conteúdo descrito
        return Contexts.find({}).fetch(); // pelo 'publish' contexts, apenas
    }); // com as conversas do usuário em sessão.
    // currentContext       conterá string indicando o contexto selecionado no
    //                      momento
    //
    // currentContextIndex  conterá indice em context_list correspondente ao
    //                      contexto atual
    var _b = (0, react_1.useState)(''), currentContext = _b[0], setCurrentContext = _b[1];
    var _c = (0, react_1.useState)(-1), currentContextIndex = _c[0], setCurrentContextIndex = _c[1];
    // Obs: Ordem em context_list é a mesma da lista de botões renderizados
    //      no componente, fazendo com que o atributo 'key' de cada item da
    //      lista corresponda ao índice correto do contexto no array context_list
    // A seguinte função será um callback que será chamado com o indice do botão
    // que foi clicado. A função é definida neste componente pai pois deve alterar
    // as informações que são exibidas no componente irmão ao componente que
    // implementa os botões de contexto e a seleção de contextos.
    var selectCurrentContextFromButtom = function (i) {
        setCurrentContext(context_list[i]._id); // recebe o indice do contexto selecionado
        setCurrentContextIndex(i); // recupera o ID do contexto armazenado no BD
    }; // atualiza a variável com o indice atual
    var selectCurrentContextFromButtomMobile = function (i) {
        setCurrentContext(context_list[i]._id);
        setCurrentContextIndex(i);
        setShowContexts(!showContexts);
    };
    // Os estilos para as tags de JSX utilizando tailwindCSS
    var outer_div = "flex grow h-full";
    var left_div = "xl:w-1/6 sm:w-2/6 w-5/6 flex flex-col items-center pb-5 bg-white gap-5 mx-5 h-full ";
    var right_div = "xl:w-5/6 sm:w-4/6 w-5/6 bg-white flex flex-col pt-8 pb-4 px-2 h-[90%] sm:h-full";
    var right_div_full = "sm:w-full w-5/6 bg-white flex flex-col pt-8 pb-4 px-2 h-[90%] sm:h-full";
    var vertical_border = "border-l-2 border-slate-300 my-10";
    var border = "border-b-2 border-slate-300 w-full";
    // O componente Context_to_chat recebe a lista de contextos (context_list)
    // o indice atual ( currentContextIndex ) e o callback para atualizar o contexto
    // que foi selecionado
    return (isDesktop ?
        react_1["default"].createElement("div", { className: outer_div },
            showContexts ? react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement("div", { className: left_div },
                    react_1["default"].createElement(OpenButtom, { onClick: function () { return setShowContexts(!showContexts); }, className: "h-10 mt-5 self-start" }),
                    react_1["default"].createElement(Context_to_chat_1.Context_to_chat, { className: "grow overflow", context_list: context_list.reverse(), context_index: currentContextIndex, onClick: selectCurrentContextFromButtom }),
                    react_1["default"].createElement("div", { className: border }),
                    react_1["default"].createElement(Options_1.Options, null)),
                react_1["default"].createElement("div", { className: vertical_border })) : react_1["default"].createElement(CloseButtom, { className: "h-10 self-start mt-5 mx-5", onClick: function () { return setShowContexts(!showContexts); } }),
            react_1["default"].createElement("div", { className: showContexts ? right_div : right_div_full },
                react_1["default"].createElement(ChatPrompt_1.ChatPrompt, { currentContext: currentContext }))) :
        react_1["default"].createElement("div", { className: outer_div + " justify-center h-screen" }, !showContexts ? react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: left_div },
                react_1["default"].createElement(OpenButtom, { onClick: function () { return setShowContexts(!showContexts); }, className: "h-[10%] pt-5 self-center" }),
                react_1["default"].createElement(Context_to_chat_1.Context_to_chat, { className: "grow", context_list: context_list.reverse(), context_index: currentContextIndex, onClick: selectCurrentContextFromButtomMobile }),
                react_1["default"].createElement("div", { className: border }),
                react_1["default"].createElement(Options_1.Options, null))) :
            react_1["default"].createElement("div", { className: "flex flex-col w-full h-screen px-5" },
                react_1["default"].createElement(CloseButtom, { className: "h-10 pt-5 self-center h-[10%]", onClick: function () { return setShowContexts(!showContexts); } }),
                react_1["default"].createElement(ChatPrompt_1.ChatPrompt, { currentContext: currentContext, isMobile: true }))));
};
exports.Chat = Chat;
var CloseButtom = function (props) {
    return (react_1["default"].createElement("button", { className: props.className, onClick: props.onClick },
        react_1["default"].createElement(door_closed_1.ReactComponent, { style: { height: "100%", width: "100%" } })));
};
var OpenButtom = function (props) {
    return (react_1["default"].createElement("button", { className: props.className, onClick: props.onClick },
        react_1["default"].createElement(door_open_1.ReactComponent, { style: { height: "100%", width: "100%" } })));
};
