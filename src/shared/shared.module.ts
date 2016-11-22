import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { MaterialLayoutDirective } from './material.layout.directive';
import { MaterialFlexDirective } from './material.flex.directive';
import { MaterialImports } from './material.imports';

@NgModule({
	imports: [ MaterialModule.forRoot() ],
	declarations: [ MaterialLayoutDirective, MaterialFlexDirective ],
	exports: [ MaterialModule, MaterialLayoutDirective, MaterialFlexDirective ]
})
export class SharedModules {}