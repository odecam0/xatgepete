import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

export const Options: React.FC = (props) => {
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
