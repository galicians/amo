import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DashboardDataList } from './portal.dashboard.data';

@Injectable()
export class PortalDashNavService {
	
	OnInit() {
		this.getNavData();
	}

	getNavData() {
		return DashboardDataList;
	}
}