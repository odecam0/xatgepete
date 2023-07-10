import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';

import { Mongo } from 'meteor/mongo';
const Contexts = new Mongo.Collection('Contexts');

import {Context_to_chat} from './Context_to_chat';
import {Options} from './Options';
import {ChatPrompt} from './ChatPrompt';

import {useMediaQuery} from 'react-responsive';

import {ReactComponent as DoorClosedIcon} from '../../icons/door-closed';
import {ReactComponent as DoorOpenIcon} from '../../icons/door-open';

// Este componente é responsável pelo posição de 3 outros componentes da página:
// O contexto com as conversas já realizadas pelo usuário (Context_to_chat),
// as opções disponibilizadasd (Options), e o chat com as mensagens e os prompts
// (ChatPrompt).
//
// Também é responsável por comunicar o estado de qual conversa está sendo selecionada
// agora, e as mensagens exibidas pelo ChatPrompt.

export const Chat: React.FC = () => {  // O chat será exibido caso haja uma
	// sessão de usuário

	// Se for mobile, deve mostrar apenas os contextos, ou apenas o prompt com as mensagens.
	// Se for mobile, o contexto deve iniciar escondido, já no desktop não.
	const isDesktop = useMediaQuery({ query: '(min-width: 640px)' });
	const [showContexts, setShowContexts] = useState(true);

	const context_list = useTracker(() => { // A variável context_list estará
		Meteor.subscribe('contexts');       // atualizada com o conteúdo descrito
		return Contexts.find({}).fetch();   // pelo 'publish' contexts, apenas
	})                                      // com as conversas do usuário em sessão.

	// currentContext       conterá string indicando o contexto selecionado no
	//                      momento
	//
	// currentContextIndex  conterá indice em context_list correspondente ao
	//                      contexto atual
	const [currentContext, setCurrentContext] = useState('');
	const [currentContextIndex, setCurrentContextIndex] = useState(-1);

	// Obs: Ordem em context_list é a mesma da lista de botões renderizados
	//      no componente, fazendo com que o atributo 'key' de cada item da
	//      lista corresponda ao índice correto do contexto no array context_list

	// A seguinte função será um callback que será chamado com o indice do botão
	// que foi clicado. A função é definida neste componente pai pois deve alterar
	// as informações que são exibidas no componente irmão ao componente que
	// implementa os botões de contexto e a seleção de contextos.
	const selectCurrentContextFromButtom = (i: number) => {
		setCurrentContext(context_list[i]._id); // recebe o indice do contexto selecionado
		setCurrentContextIndex(i);              // recupera o ID do contexto armazenado no BD
	}											// atualiza a variável com o indice atual

	const selectCurrentContextFromButtomMobile = (i: number) => {
		setCurrentContext(context_list[i]._id);
		setCurrentContextIndex(i);
		setShowContexts(!showContexts);
	}

	// Os estilos para as tags de JSX utilizando tailwindCSS
	const outer_div = "flex grow h-full";
	const left_div =  "xl:w-1/6 sm:w-2/6 w-5/6 flex flex-col items-center pb-5 bg-white gap-5 mx-5 h-full ";
	const right_div = "xl:w-5/6 sm:w-4/6 w-5/6 bg-white flex flex-col pt-8 pb-4 px-2 h-[90%] sm:h-full";
	const right_div_full = "sm:w-full w-5/6 bg-white flex flex-col pt-8 pb-4 px-2 h-[90%] sm:h-full";
	const vertical_border = "border-l-2 border-slate-300 my-10";
	const border = "border-b-2 border-slate-300 w-full";

	// O componente Context_to_chat recebe a lista de contextos (context_list)
	// o indice atual ( currentContextIndex ) e o callback para atualizar o contexto
	// que foi selecionado
	return (isDesktop ?
		<div className={outer_div}>
			{
				showContexts ? <>
					<div className={left_div}>
						<OpenButtom onClick={() => setShowContexts(!showContexts)}
							className="h-10 mt-5 self-start" />
						<Context_to_chat className="grow overflow"
							context_list={context_list.reverse()}
							context_index={currentContextIndex}
							onClick={selectCurrentContextFromButtom}
						/>
						<div className={border} />
						<Options />
					</div>
					<div className={vertical_border} />
				</> : <CloseButtom className="h-10 self-start mt-5 mx-5"
					onClick={() => setShowContexts(!showContexts)} />
			}

			<div className={showContexts? right_div : right_div_full}>
				<ChatPrompt currentContext={currentContext} />
			</div>
		</div> :
		<div className={outer_div + " justify-center h-screen"}>
			{
				!showContexts ? <>
					<div className={left_div}>
						<OpenButtom onClick={() => setShowContexts(!showContexts)}
							className="h-[10%] pt-5 self-center" />
						<Context_to_chat className="grow"
							context_list={context_list.reverse()}
							context_index={currentContextIndex}
							onClick={selectCurrentContextFromButtomMobile} />
						<div className={border} />
						<Options />
					</div>
				</> :
					<div className="flex flex-col w-full h-screen px-5">
						<CloseButtom className="h-10 pt-5 self-center h-[10%]"
							onClick={() => setShowContexts(!showContexts)} />
						<ChatPrompt currentContext={currentContext}
							isMobile />
					</div>
			}
		</div>
	);
}

const CloseButtom = (props) => {
	return (
		<button className={props.className}
			onClick={props.onClick}>
			<DoorClosedIcon style={{ height: "100%", width:"100%" }} />
		</button>
	);
}

const OpenButtom = (props) => {
	return (
		<button className={props.className}
			onClick={props.onClick}>
			<DoorOpenIcon style={{ height: "100%", width:"100%" }} />
		</button>
	);
}
