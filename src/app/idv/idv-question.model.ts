export class IdvQuestion {
  public sequence: number;
  public name: string;
  public id: number;
  public description: string;
  public type: string;
  public field: string;
  public channel: string;
  public whenLogged: number;
  public dataType: string;
  public dataFormat: any;
  public answer: string;

  constructor(obj?: any) {
    this.sequence = obj.sequence;
    this.name = obj.name;
    this.id = obj.id;
    this.description = obj.description;
    this.field = obj.field;
    this.channel = obj.channel;
    this.whenLogged = obj.whenLogged;
    this.dataType = obj.dataType;
    this.dataFormat = obj.dataFormat;
    this.answer = null;
  }
}
