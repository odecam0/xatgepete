import React, {useState} from 'react';

export const App: React.JSX.Element = () => (
	<div className="flex h-screen">
		<div className="flex flex-col items-center pt-10 pb-10 bg-sky-900">
			<Context_to_chat />
			<Options />
		</div>
		<ChatPrompt/>
	</div>
);



// props not yet typed, because i've not decided yet how its gonna go
interface conversation_data {
	title: String;
}

const mock_other_conversations: Array<conversation_data> = [
	{ title: "Primeira conversa" },
	{ title: "Segunda conversa" },
	{ title: "Decima quinta conversa?" }
];

const Context_to_chat: React.FC = (props) => {
	const get_chats_buttons: React.FC = (buttoms_list : Array<conversation_data>): Array<React.ReactElement> => {
		return (buttoms_list.map((p, i) => (
			<buttom className="bg-sky-600 border-sky-300 font-black" key={i} type='buttom'>
				{p.title}
			</buttom>)))
	}

	return (<div className="flex flex-col grow gap-2 px-3">
		{get_chats_buttons(mock_other_conversations)}
	</div>);
};

const Options: React.FC = (props) => {
	return (
		<div>
			<buttom className="font-black" type="buttom">
				Opções
			</buttom>
		</div>
	);
}


interface chat_messages {
	from: 'user' | 'gpt';
	text: String;
}

// TODO: manter o chat scrollado pra baixo.
const ChatPrompt : React.FC = (props) => {
	const [messages, set_messages] = useState<Array<chat_messages>>([
		{ from: 'user', text: 'Mensagem exemplo do usuário' }, // Initial mock data
		{ from: 'gpt', text: 'Resposta exemplo do ChatGPT' }
	]);

	const [prompt_data, set_prompt_data] = useState<String>("");

	const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => { set_prompt_data(e.target.value) };

	const get_chat_messages = (messages_list : Array<chat_messages>) => {
		return(messages_list.map((p, i) => {

			let className = 'self-start bg-cyan-700 p-2 rounded-lg';
			if (p.from == 'gpt') {
				className = 'self-end bg-cyan-700 p-2 rounded-lg';
			}

			return (
				<div key={i} className={className}>
					<text>{p.text}</text>
				</div>
			);
		}));
	}

	// Por algum motivo está reconhecendo o messages antigo, sem o imput do usuário....
	const trigger_gpt_response = async (userPrompt:chat_messages) => {
		const message = 'Ainda não tem o chatGPT respondendo'.split(' ');
		let sent_message = '';
		set_messages(messages.concat([userPrompt, {from:'gpt', text:sent_message}]));

		for (let i in message) {
			sent_message = sent_message + message[i] + ' ';
			// set_messages(messages.slice(0, -1).concat([{from:'gpt', text:sent_message}]));
			set_messages(messages.concat([userPrompt, {from:'gpt', text:sent_message}]));
			await new Promise(r => setTimeout(r, 200));
		}
	};

	const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		set_messages(messages.concat([{from:'user', text:prompt_data}]));
		set_prompt_data('');

		trigger_gpt_response({from:'user', text:prompt_data});
	};

	return (
		<div className="bg-cyan-400 grow flex flex-col py-3 px-2">
			<div className="grow flex flex-col justify-start">
				{get_chat_messages(messages)}
				<div id="anchor"></div>
			</div>
			<form onSubmit={handleSubmit} className="w-full flex gap-1" >
				<input className='grow rounded-lg px-2' type='text' value={prompt_data} onChange={handleChange} />
				<input className='w-1/12 bg-sky-200 rounded-lg p-1' type='submit' value='Enviar' />
			</form>
		</div>
	);
}

