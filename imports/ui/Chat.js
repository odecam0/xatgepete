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
// Este componente é responsável pelo posição de 3 outros componentes da página:
// O contexto com as conversas já realizadas pelo usuário (Context_to_chat),
// as opções disponibilizadasd (Options), e o chat com as mensagens e os promps
// (ChatPrompt).
//
// Também é responsável por comunicar o estado de qual conversa está sendo selecionada
// agora, e as mensagens exibidas pelo ChatPrompt.
var Chat = function () {
    // sessão de usuário
    var context_list = (0, react_meteor_data_1.useTracker)(function () {
        meteor_1.Meteor.subscribe('contexts'); // atualizada com o conteúdo descrito
        return Contexts.find({}).fetch(); // pelo 'publish' contexts, apenas
    }); // com as conversas do usuário em
    // sessão.
    // currentContext       conterá string indicando o contexto selecionado no
    //                      momento
    //
    // currentContextIndex  conterá indice em context_list correspondente ao
    //                      contexto atual
    var _a = (0, react_1.useState)(''), currentContext = _a[0], setCurrentContext = _a[1];
    var _b = (0, react_1.useState)(-1), currentContextIndex = _b[0], setCurrentContextIndex = _b[1];
    // Obs: Ordem em context_list é a mesma da lista de botões renderizados
    //      no componente, fazendo com que o atributo 'key' de cada item da
    //      lista corresponda ao índice correto do contexto no array context_list
    // A seguinte função será um callback que será chamado com o indice do botão
    // que foi clicado. A função é definida neste componente pai pois deve alterar
    // as informações que são exibidas no componente irmão ao componente que
    // implementa os botões de contexto e a seleção de contextos.
    var selectCurrentContextFromButtom = function (i) {
        setCurrentContext(context_list[i]._id); // recupera o ID do contexto armazenado no BD
        setCurrentContextIndex(i); // atualiza a variável com o indice atual
    };
    // Os estilos para as tags de JSX utilizando tailwindCSS
    var outer_div = "flex grow h-full";
    var left_div = "flex flex-col items-center pt-10 pb-10 bg-white gap-5 mx-5";
    var right_div = "border-l-2 border-slate-300 my-10";
    var border = "border-b-2 border-slate-300 w-full";
    // O componente Context_to_chat recebe a lista de contextos (context_list)
    // o indice atual ( currentContextIndex ) e o callback para atualizar o contexto
    // que foi selecionado
    return (react_1["default"].createElement("div", { className: outer_div },
        react_1["default"].createElement("div", { className: left_div },
            react_1["default"].createElement(Context_to_chat_1.Context_to_chat, { className: "grow", context_list: context_list, context_index: currentContextIndex, onClick: selectCurrentContextFromButtom }),
            react_1["default"].createElement("div", { className: border }),
            react_1["default"].createElement(Options_1.Options, null)),
        react_1["default"].createElement("div", { className: right_div }),
        react_1["default"].createElement(ChatPrompt_1.ChatPrompt, { currentContext: currentContext })));
};
exports.Chat = Chat;
