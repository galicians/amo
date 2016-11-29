import { ActionReducer, Action } from '@ngrx/store';




export const IE_DISPLAY = 'IE_DISPLAY';
export const IE_HIDE = 'IE_HIDE';

export const uiDisplayIEreducer: ActionReducer<any> = ( state: any = {}, action: Action) => {
	console.log('setting uiDisplayIEreducer');
	switch ( action.type ) {
		case IE_DISPLAY:
			return Object.assign(state, { 'ui.displayIE': true })
		case IE_HIDE:
			return Object.assign(state, { 'ui.displayIE': false })
		default:
			return state;
	}
}