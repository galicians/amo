import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class PaymentSource {
	public id: string;
	public customerVO: Object;
	public name: string;
	public sequence: number;
	public type: string;
	public status: string;
	public reference: number;
	public attributes: Object;
	public accountNumber: string;
	public whenLogged: number;

	constructor(obj: any) {
		this.id = obj.id;
		this.customerVO = obj.customerVO;
		this.name = obj.name;
		this.sequence = obj.sequence;
		this.type = obj.type;
		this.status = obj.status;
		this.reference = obj.reference;
		this.attributes = obj.attributes;
		this.accountNumber = obj.accountNumber;
		this.whenLogged = obj.whenLogged;
	}
}