export class DashboardDataObject {
	constructor( public type: string, public icon: string, public list: any) {}
}

export class DashboardDataItem {
	constructor( public type: string, public icon: string, public url: string ) {}
}

let DashboardItemData = [
	[
		new DashboardDataItem( 'type1a', 'icon1a', 'url1a' ),
		new DashboardDataItem( 'type1b', 'icon1b', 'url1b' ),
		new DashboardDataItem( 'type1c', 'icon1c', 'url1c' )
	],
	[
		new DashboardDataItem( 'type2a', 'icon2a', 'url2a' ),
		new DashboardDataItem( 'type2b', 'icon2b', 'url2b' ),
		new DashboardDataItem( 'type2c', 'icon2c', 'url2c' )
	],
	[
		new DashboardDataItem( 'type3a', 'icon3a', 'url3a' ),
		new DashboardDataItem( 'type3b', 'icon3b', 'url3b' ),
		new DashboardDataItem( 'type3c', 'icon3c', 'url3c' )
	],
	[
		new DashboardDataItem( 'type4a', 'icon4a', 'url4a' ),
		new DashboardDataItem( 'type4b', 'icon4b', 'url4b' ),
		new DashboardDataItem( 'type4c', 'icon4c', 'url4c' )
	]
];

let DashboardData = [
	new DashboardDataObject( 'user', 'head', DashboardItemData[0]),
	new DashboardDataObject( 'settings', 'cog', DashboardItemData[1] ),
	new DashboardDataObject( 'configuration', 'spanner', DashboardItemData[2] ),
	new DashboardDataObject( 'templates', 'pencil', DashboardItemData[3] ),
];

export class DashboardDataList {
	DashboardDataPromise = Promise.resolve( DashboardData );
}



