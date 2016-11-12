/**
 * Created by pablo on 10/10/2016.
 */
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// to use ngFor need to import BrowserModule, 
// TO DO: try CommonModule
import { BrowserModule } from '@angular/platform-browser';
import { IdvComponent } from './idv.component';
import  { IdvQuestionsService } from './idv-questions.service';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    IdvComponent
  ],
  exports: [ IdvComponent, TranslateModule ],
  providers: [ IdvQuestionsService ]
})

export class IdvModule {}


