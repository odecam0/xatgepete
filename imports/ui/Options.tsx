import React from 'react';
import { Meteor } from 'meteor/meteor';

import {ReactComponent as GearIcon} from '../../icons/gear-setting-settings-svgrepo-com';
import {ReactComponent as LogOutIcon} from '../../icons/log-out-svgrepo-com';

export const Options: React.FC = () => {
	const buttons_style = "flex items-center py-1 gap-2 bg-white rounded-xl px-3 border-black border-2 text-sm ";

	return (
		<div className="flex flex-col gap-2">
			<button className={buttons_style} type="button">
			<GearIcon className="h-6" />
				Opções
			</button>
			<button className={buttons_style} type="button" onClick={() => Meteor.logout()}>
				<LogOutIcon className="h-6"/>
				Desconectar-se
			</button>
		</div>
	);
}
