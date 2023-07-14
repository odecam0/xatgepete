import React, {useState} from 'react';
import { Meteor } from 'meteor/meteor';

import ReactModal from 'react-modal';

import {ReactComponent as GearIcon} from '../../icons/gear-setting-settings-svgrepo-com';
import {ReactComponent as LogOutIcon} from '../../icons/log-out-svgrepo-com';

import {Mongo} from 'meteor/mongo';
const Keys = new Mongo.Collection('Keys');

export const Options: React.FC = () => {
	const buttons_style = "flex items-center py-1 gap-2 bg-white rounded-xl px-3 border-black border-2 text-sm ";

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div className="flex flex-col gap-2">
				<button className={buttons_style} type="button" onClick={() => setIsModalOpen(!isModalOpen)}>
					<GearIcon className="h-6" />
					Opções
				</button>
				<button className={buttons_style} type="button" onClick={() => Meteor.logout()}>
					<LogOutIcon className="h-6" />
					Desconectar-se
				</button>
			</div>
			<OptionsModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
		</>
	);
}

const OptionsModal: React.FC = (props: { isOpen: boolean, closeModal: () => void }) => {
	const [apiKey, setApiKey] = useState('');

	const setInitialApiKeyValue = () => {
		Meteor.subscribe('key');
		setApiKey(Keys.find().fetch()[0].apiKey);
	}

	return (
		<ReactModal className="absolute bg-white p-8 flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" isOpen={props.isOpen}
			onAfterClose={() => Meteor.call('setUserApiKey', apiKey)}
			onAfterOpen={() => setInitialApiKeyValue()}
			shouldCloseOnOverlayClick={true}>
			<div className="flex flex-col gap-2">
				<div>Insira sua chave aqui:</div>
				<form onSubmit={props.closeModal}>
					<input className='grow px-2 border-solid border-b-2 border-black bg-white w-full'
						type='text' value={apiKey} onChange={e => setApiKey(e.target.value)} />
				</form>
				<button className="bg-white rounded-lg p-2 border-black border-2 self-center w-fit" onClick={props.closeModal}>
					Close
				</button>
			</div>
		</ReactModal>
	);
}
