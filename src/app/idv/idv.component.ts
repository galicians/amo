import { Component, OnInit } from '@angular/core';
import { IdvQuestionsService} from './idv-questions.service';
import { IdvQuestion } from './idv-question.model';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import {TranslateService} from 'ng2-translate';

@Component({
  moduleId: module.id,
  selector: 'app-idv',
  templateUrl: './idv.component.html',
  styleUrls: ['./idv.component.css']
})
export class IdvComponent implements OnInit {

  ngOnInit() {
    
  }

  idvQuestions: Array<IdvQuestion>;
 
  
  submitIdvResponses( idvquestions: any): void {
    this.idvQuestionsService.postIdvQuestions(idvquestions).subscribe(
      data => this.router.navigate(['/welcome']),
      error => console.log('error'),
      () => console.log('login done')
    );
  } 
  


  constructor(private idvQuestionsService: IdvQuestionsService, private route: ActivatedRoute, private router: Router, translate: TranslateService)
    {

      route.data
        .subscribe(
          data => this.idvQuestions = data['questions']
        )
      translate.setDefaultLang('en');
      translate.use('en');
    }


  //ngOnInit() {

    // if you don't subscribe to this method, the http call won't take place
    // this.idvQuestionsService.getIdvQuestions().subscribe((res : IdvQuestion[]) => {

    // this.idvQuestionsService.getIdvQuestions().subscribe((res : Array<IdvQuestion>) => {
    //   this.idvQuestions = res;
    //   })

  //};


}


