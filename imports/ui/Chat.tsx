import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';

import { Mongo } from 'meteor/mongo';
const Contexts = new Mongo.Collection('Contexts');

import {Context_to_chat} from './Context_to_chat';
import {Options} from './Options';
import {ChatPrompt} from './ChatPrompt';

// Este componente é responsável pelo posição de 3 outros componentes da página:
// O contexto com as conversas já realizadas pelo usuário (Context_to_chat),
// as opções disponibilizadasd (Options), e o chat com as mensagens e os promps
// (ChatPrompt).
//
// Também é responsável por comunicar o estado de qual conversa está sendo selecionada
// agora, e as mensagens exibidas pelo ChatPrompt.

export const Chat : React.FC = () => {        // O chat será exibido caso haja uma
                                       // sessão de usuário

	const context_list = useTracker(() => { // A variável context_list estará
		Meteor.subscribe('contexts');       // atualizada com o conteúdo descrito
		return Contexts.find({}).fetch();   // pelo 'publish' contexts, apenas
	})                                      // com as conversas do usuário em
	                                        // sessão.

	// currentContext       conterá string indicando o contexto selecionado no
	//                      momento
	//
	// currentContextIndex  conterá indice em context_list correspondente ao
	//                      contexto atual
	const [currentContext, setCurrentContext] = useState<string>('');
	const [currentContextIndex, setCurrentContextIndex] = useState<number>(-1);

	// Obs: Ordem em context_list é a mesma da lista de botões renderizados
	//      no componente, fazendo com que o atributo 'key' de cada item da
	//      lista corresponda ao índice correto do contexto no array context_list

	// A seguinte função será um callback que será chamado com o indice do botão
	// que foi clicado. A função é definida neste componente pai pois deve alterar
	// as informações que são exibidas no componente irmão ao componente que
	// implementa os botões de contexto e a seleção de contextos.
	const selectCurrentContextFromButtom = (i : number) => { // recebe o indice do contexto selecionado
		setCurrentContext(context_list[i]._id);              // recupera o ID do contexto armazenado no BD
		setCurrentContextIndex(i);                           // atualiza a variável com o indice atual
	}

	// Os estilos para as tags de JSX utilizando tailwindCSS
	const outer_div = "flex grow h-full";
	const left_div  = "flex flex-col items-center pt-10 pb-10 bg-white gap-5 mx-5";
	const right_div = "border-l-2 border-slate-300 my-10";
	const border    = "border-b-2 border-slate-300 w-full";

	// O componente Context_to_chat recebe a lista de contextos (context_list)
	// o indice atual ( currentContextIndex ) e o callback para atualizar o contexto
	// que foi selecionado
	return (
		<div className={outer_div}>
			<div className={left_div}>
				<Context_to_chat className="grow" context_list={context_list}
					context_index={currentContextIndex}
					onClick={selectCurrentContextFromButtom} />
				<div className={border} />
				<Options />
			</div>
			<div className={right_div} />
			<ChatPrompt currentContext={currentContext} />
		</div>
	);
}
