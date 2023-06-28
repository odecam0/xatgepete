import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState, useEffect } from 'react';

import { SignInForm } from './SignInAndUp';

import { Chat } from './Chat';

export const App: React.JSX.Element = () => {     // Este é o componente raiz de
	const user = useTracker(() => Meteor.user()); // toda a aplicação.

	return (
		<div className="flex h-screen">
			{
				user ?                  // Aqui é implementada a lógica que define
					<Chat/>:            // oque será exibido caso haja ou não uma
					<SignInForm />      // sessão de usuário.
			}
		</div>
	);
};
