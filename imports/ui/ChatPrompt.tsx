import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

import { Mongo } from 'meteor/mongo';
const Messages = new Mongo.Collection('Messages');

interface chat_messages {
	from: 'user' | 'gpt';
	text: string;
}

export const ChatPrompt : React.FC = (props) => {
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

	// Return that renders
	// sm:h-screen is related to mediaquery on Chat.tsx
	return (
		<div className={"bg-white grow flex flex-col pt-8 pb-4 px-2 h-1/2 sm:h-screen"}>
			<div className="grow flex flex-col justify-start gap-5 break-all overflow-y-auto h-1/2">
				{get_chat_messages(messages)}
				<div id="anchor"></div>
			</div>
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-3" >
				<input className='grow px-2 border-solid border-b-2 border-black bg-white w-full'
					type='text' value={prompt_data} onChange={handleChange} disabled={!canPrompt()} />
				<input className='bg-white rounded-lg p-2 border-black border-2 self-center w-fit'
					type='submit' value='Enviar' disabled={!canPrompt()} />
			</form>
		</div>
	);
}
