import { Component, OnInit } from '@angular/core';
import { IdvQuestionsService } from './idv-questions.service';
import { IdvQuestion } from './idv-question.model';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-idv',
  //template: 'IDV WORKS!',
  templateUrl: './idv.component.html',
  styleUrls: ['./idv.component.css']
})

export class IdvComponent implements OnInit {
  idvQuestions: Array<IdvQuestion>;
  myForm: FormGroup;
  controls: any = {};
  controlsArray: any = []; // same that formControlItem
  formControlItem: any;  // formControlItem: AbstractControl; in the moment we add the
                         //  property name, we need to create a different interface 
                         //  for AbstractControl, extending the interface with 
                         //  the property 'name'
  validators: Array<any>;
  error: boolean = false;
  errorMsg: string;
  dateFormat: string;
  locale: string;
  loginDate: any;


  submitIdvResponses(a: any): void {
    this.controlsArray.map( formInput => {
      this.idvQuestions.map( question => {
        if ( formInput.name === question.name ) question.answer = formInput.answer;
      });
    });
    this.idvQuestionsService.postIdvQuestions(this.idvQuestions).subscribe(
      data => this.router.navigate(['/app/welcome']),
      error => {
        this.error = true;
        this.errorMsg = JSON.parse(error['_body']).errors[0].key;
      },
      () => { console.log('Login successful'); }
    );
  }

  constructor(
    private idvQuestionsService: IdvQuestionsService,
    private route: ActivatedRoute,
    private router: Router,
    translate: TranslateService) {
      route.data
        .subscribe(
          data => {
            console.log('route.data', data);
            this.idvQuestions = data['questions'];
            this.locale = data['properties']['ui.locale'] ;
            this.loginDate = data['properties']['ui.loginDate'] ;
          }
        );
      translate.setDefaultLang(this.locale);
      translate.use(this.locale);

      this.idvQuestions.map(question  => {
        this.validators = [Validators.required];
        if ( question.dataType === 'DATE' ) this.validators.push( this.validateDate );
        this.formControlItem = new FormControl('', this.validators);
        this.formControlItem.name = question.name;
        this.controlsArray.push(this.formControlItem);
      });
  }

  validateDate = (date) => {
      let regEx;
      if ( this.locale === 'en-gb' )
        regEx = new RegExp(
          /^(0[1-9]|1\d|2\d|3[01])[\/\-](0[1-9]|1[0-2])[\/\-](19|10)\d{2}/
         );
      if ( this.locale === 'en' )
        regEx = new RegExp(
          /^(0[1-9]|1[0-2])[\/\-](0[1-9]|1\d|2\d|3[01])[\/\-](19|10)\d{2}/
         );
      if ( !date ) return null;
      return regEx.test(date.value) ? null : { validDate: true };
  }

  ngOnInit() {
    this.formControlItem.valueChanges.subscribe(
        (value: string) => {
          console.log(this.formControlItem.name, ' has changed');
    });
  }

}

