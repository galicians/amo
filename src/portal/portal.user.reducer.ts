import { ActionReducer, Action } from '@ngrx/store';

export const PORTAL_LOG_IN = 'PORTAL_LOG_IN';
export const PORTAL_LOG_OUT = 'PORTAL_LOG_OUT';

export const portalUsers: ActionReducer<any> = ( state: any = [], action: Action) => {
	switch ( action.type ) {
		case PORTAL_LOG_IN:
			return [
				...state,
				action.payload
			];

		case PORTAL_LOG_OUT:
			return [
				...state,
				action.payload
			];

		default:
			return state;
	}
}