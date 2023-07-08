import { Meteor } from 'meteor/meteor';
import React from 'react';

export const Context_to_chat: React.FC = (props) => {
	const buttons_style = "text-lg md:text-sm bg-white rounded-xl py-1 px-3 border-black border-2 border-dashed";
	const buttons_style_selected = "bg-white rounded-xl py-1 px-3 border-black border-2 border-solyd";

	const handleClickNovoChat = () => {
		Meteor.call('createNewContext');
	}

	return (
		<div className="flex flex-col grow gap-2 px-3 h-1/2 overflow-y-auto">
			<button className="bg-white rounded-xl py-1 px-3 border-black border-b-2 border-solid"
				type='button' onClick={handleClickNovoChat}>
				Criar novo chat
			</button>
			{
				props.context_list.map((p, i) => (
					<button className=
						{(i == props.context_index) ?
							buttons_style_selected : buttons_style}
						key={i} type='button' onClick={() => props.onClick(i)}>
						{p.title}
					</button>
				))
			}
		</div>
	);
};
