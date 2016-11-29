import { ActionReducer, Action } from '@ngrx/store';
import { APP_JMX_PROPS, APP_PROPERTIES_LOADED, APP_PROPERTIES_NOT_LOADED } from './app.constants';



export const uiPropertiesReducer: ActionReducer<any> = (state: any = APP_JMX_PROPS, action: Action) => {
	console.log('setting uiPropertiesReducer');
	switch ( action.type ) {
		case APP_PROPERTIES_LOADED:
			return Object.assign(state, true)
		case APP_PROPERTIES_NOT_LOADED:
			return Object.assign(state, false)
		default:
			return state;
	}
} 
