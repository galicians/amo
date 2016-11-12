import { IdvQuestion } from './idv-question.model';

export class IdvAnswer {
  public answer: string;
  public idvQuestionVO: any = {}; // idvQuestionVO:Object = {}; doesn't work why?

  constructor(input: IdvQuestion) {
    this.answer = input.answer;
    this.idvQuestionVO.id = input.id;
  }
}



