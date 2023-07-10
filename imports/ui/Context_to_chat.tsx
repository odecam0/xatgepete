import { Meteor } from 'meteor/meteor';
import React from 'react';

import {ReactComponent as ChatIcon} from '../../icons/chat-svgrepo-com';
import {ReactComponent as PlusIcon} from '../../icons/plus-frame-svgrepo-com';

export const Context_to_chat: React.FC = (props) => {
	const buttons_style = "h-9 flex gap-2 items-center text-sm bg-white rounded-xl px-3 border-black border-2 border-dashed";
	const buttons_style_selected = "text-sm h-9 flex gap-2 items-center bg-white rounded-xl px-3 border-black border-2 border-solid";

	const handleClickNovoChat = () => {
		Meteor.call('createNewContext');
	}

	return (
		<div className="flex flex-col grow gap-2 px-3 h-1/2 overflow-y-auto">
			<button className="h-9 bg-white text-sm rounded-xl py-1 px-4 border-black border-b-2 border-solid flex items-center gap-2"
				type='button' onClick={handleClickNovoChat}>
				<PlusIcon style={{ height: "50%" }} />
				<div>Criar novo chat</div>
			</button>
			{
				props.context_list.map((p, i) => (
					<button className={(i == props.context_index) ?
						buttons_style_selected : buttons_style}
						key={i} type='button' onClick={() => props.onClick(i)}>
						<ChatIcon className="h-1/2"/>
						{p.title}
					</button>
				))
			}
		</div>
	);
};
