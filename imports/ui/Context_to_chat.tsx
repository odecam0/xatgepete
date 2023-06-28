import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';

export const Context_to_chat: React.FC = (props) => {
	const buttons_style = "bg-white rounded-xl py-1 px-3 border-black border-2 border-dashed";
	const buttons_style_selected = "bg-white rounded-xl py-1 px-3 border-black border-2 border-solyd";

	const handleClickNovoChat = () => {
		Meteor.call('createNewContext');
	}

	return (
		<div className="flex flex-col grow gap-2 px-3">
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
			<button className="bg-white rounded-xl py-1 px-3 border-black border-b-2 border-solid"
				type='button' onClick={handleClickNovoChat}>
				Criar novo chat
			</button>
		</div>
	);
};
