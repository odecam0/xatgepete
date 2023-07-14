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
					{p.text}
				</div>
			);
		}));
	}

	// So user cannot prompt anything while system is showing the gpt response
	const [gptIsResponding, setGptIsResponding] = useState<boolean>(false);

	const trigger_gpt_response = async (prompt_data:string) => {
		setGptIsResponding(true);

		Meteor.call('insertGPTMessageInContext', props.currentContext, prompt_data, () => (setGptIsResponding(false)));
	};

	const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Caso não haja mensagem nenhuma, atualiza o nome do contexto
		// para as 16 primeiras letras da primeira pergunta
		if (messages.length == 0) {
			Meteor.call('updateContextName', props.currentContext, prompt_data.slice(0, 16))
		}

		Meteor.call('insertMessageInContext', {from:'user', text:prompt_data}, props.currentContext);

		trigger_gpt_response(prompt_data);
		set_prompt_data('');
	};

	const canPrompt = () => {
		return (!gptIsResponding && (props.currentContext != ''))
	}

	const activeSendButtonStyle = "bg-white rounded-lg p-2 border-black border-2 self-center w-fit";
	const inactiveSendButtonStyle = "bg-white rounded-lg p-2 border-slate-400 text-slate-400 border-2 self-center w-fit";

	// Return that renders
	// sm:h-screen is related to mediaquery on Chat.tsx
	return (
			<>
			<div className="grow flex flex-col justify-start gap-5 break-all overflow-y-auto h-1/2">
				{get_chat_messages(messages)}
				<div id="anchor"></div>
			</div>
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-3" >
				<input className='grow px-2 border-solid border-b-2 border-black bg-white w-full'
					type='text' value={prompt_data} onChange={handleChange} disabled={!canPrompt()} />
			<input className={canPrompt()? activeSendButtonStyle : inactiveSendButtonStyle}
					type='submit' value='Enviar' disabled={!canPrompt()} />
			</form>
			</>
	);
}
