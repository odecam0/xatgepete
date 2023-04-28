import React, {useState} from 'react';

export const App: React.JSX.Element = () => (
	<div className="main_layout">
		<div className="left_part">
			<Context_to_chat />
			<Options />
		</div>
		<div className="right_part">
			<Chat />
			<Prompt />
		</div>
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
	const get_chats_buttons: React.FC = (buttoms_list): Array<React.ReactElement> => {
		return (buttoms_list.map((p, i) => (
			<buttom className="conversation_buttom" key={i} type='buttom'>
				{p.title}
			</buttom>)))
	}

	return (<div className="context_of_chat">
		{get_chats_buttons(mock_other_conversations)}
	</div>);
};

const Options: React.FC = (props) => {
	return (
		<div>
			<buttom type="buttom">
				Opções
			</buttom>
		</div>
	);
}



const Chat: React.FC = (props) => {
	return (
		<div className="chat">
			<h1>"O chat ainda tenho que ver como que vai fazer..."</h1>
		</div>);
};

const Prompt: React.FC = (props) => {
	const [prompt_data, set_prompt_data] = useState<String>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { set_prompt_data(e.target.value) };

	return (
		<div className="prompt">
			<form>
				<input type='text' value={prompt_data} onChange={handleChange} />
				<input className='submit' type='submit' value='Enviar' />
			</form>
		</div>
	);
}

// (setq tab-width 2)
