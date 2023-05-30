import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';
import { Mongo } from 'meteor/mongo';

import { SignInForm } from './SignInAndUp';

const Contexts = new Mongo.Collection('Contexts');
const Messages = new Mongo.Collection('Messages');

export const App: React.JSX.Element = () => {
	const user = useTracker(() => Meteor.user());

	return (
		<div className="flex h-screen">
			{
				user ?
					<Chat/>
					:
					<SignInForm />
			}
		</div>
	);
};

const Chat : React.FC = (props) => {

	const context_list = useTracker(() => {
		Meteor.subscribe('contexts');
		return Contexts.find({}).fetch();
	})

	const [currentContext, setCurrentContext] = useState<string>('');
	const [currentContextIndex, setCurrentContextIndex] = useState<number>(-1);

	// A ideia do callback que selecionará o contexto atual será a seguinte:
	// considerando que a ordem dos botões de contexto renderizados no componente
	// será a mesma em que os objetos de contexto estão organizados em context_list
	// o atributo key do botão será usado como indice para selecionar o contexto
	// correto na array context_list
	const selectCurrentContextFromButtom = (i) => {
		setCurrentContext(context_list[i]._id);
		setCurrentContextIndex(i);
	}

	return (
		<div className="flex grow h-full">
			<div className="flex flex-col items-center pt-10 pb-10 bg-white gap-5 mx-5">
				<Context_to_chat className="grow" context_list={context_list}
					context_index={currentContextIndex}
					onClick={selectCurrentContextFromButtom} />
				<div className="border-b-2 border-slate-300 w-full" />
				<Options />
			</div>
			<div className="border-l-2 border-slate-300 my-10"/>
			<ChatPrompt currentContext={currentContext}/>
		</div>
	);
}

// props not yet typed, because i've not decided yet how its gonna go
interface conversation_data {
	title: String;
}

const Context_to_chat: React.FC = (props) => {
	const buttons_style = "bg-white rounded-xl py-1 px-3 border-black border-2 border-dashed";
	const buttons_style_selected = "bg-white rounded-xl py-1 px-3 border-black border-2 border-solyd";

	const handleClickNovoChat = () => {
		Meteor.call('createNewContext');
	}

	return (
		<div className="flex flex-col grow gap-2 px-3">
			{
				props.context_list.map((p, i) => (
					<button className={(i == props.context_index) ? buttons_style_selected : buttons_style} key={i} type='button' onClick={() => props.onClick(i)}>
						{p.title}
					</button>
				))
			}
			<button className="bg-white rounded-xl py-1 px-3 border-black border-b-2 border-solid" type='button' onClick={handleClickNovoChat}>
				Criar novo chat
			</button>
		</div>
	);
};

const Options: React.FC = (props) => {
	const buttons_style = "bg-white rounded-xl py-1 px-3 border-black border-2";

	return (
		<div className="flex flex-col gap-2">
			<button className={buttons_style} type="button">
				Opções
			</button>
			<button className={buttons_style} type="button" onClick={() => Meteor.logout()}>
				Desconectar-se
			</button>
		</div>
	);
}


interface chat_messages {
	from: 'user' | 'gpt';
	text: string;
}

// TODO: manter o chat scrollado pra baixo.
const ChatPrompt : React.FC = (props) => {
	const messages = useTracker(() => {
		Meteor.subscribe('messages', props.currentContext);
		return Messages.find({}).fetch();
	})

	const [prompt_data, set_prompt_data] = useState<String>("");

	const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => { set_prompt_data(e.target.value) };

	const get_chat_messages = (messages_list) => {
		return(messages_list.map((p, i) => {

			let className = 'self-start bg-white border-l-2 border-black pl-3';
			if (p.from == 'gpt') {
				className = 'self-end bg-white border-r-2 border-black pr-3';
			}

			return (
				<div key={i} className={className}>
					<text>{p.text}</text>
				</div>
			);
		}));
	}

	// So user cannot prompt anything while system is showing the gpt response
	const [gptIsResponding, setGptIsResponding] = useState<boolean>(false);

	// Ui, aqui vai ser complicado de adaptar pro database.
	// Penso que devo manter a mesma lógica, porem apenas dar um update no banco de dados
	const trigger_gpt_response = async () => {
		setGptIsResponding(true);

		Meteor.call('insertGPTMessageInContext', props.currentContext, () => (setGptIsResponding(false)));
	};

	const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Caso não haja mensagem nenhuma, atualiza o nome do contexto
		// para as 16 primeiras letras da primeira pergunta
		if (messages.length == 0) {
			Meteor.call('updateContextName', props.currentContext, prompt_data.slice(0, 16))
		}

		Meteor.call('insertMessageInContext', {from:'user', text:prompt_data}, props.currentContext);
		set_prompt_data('');

		trigger_gpt_response();
	};

	const canPrompt = () => {
		return (!gptIsResponding && (props.currentContext != ''))
	}

	return (
		<div className="bg-white grow flex flex-col pt-8 pb-4 px-2">
			<div className="grow flex flex-col justify-start gap-5">
				{get_chat_messages(messages)}
				<div id="anchor"></div>
			</div>
			<form onSubmit={handleSubmit} className="w-full flex gap-6" >
			<input className='grow px-2 border-solid border-b-2 border-black bg-white' type='text' value={prompt_data} onChange={handleChange} disabled={!canPrompt()}/>
			<input className='w-1/12 bg-white rounded-lg p-2 border-black border-2' type='submit' value='Enviar' disabled={!canPrompt()}/>
			</form>
		</div>
	);
}

