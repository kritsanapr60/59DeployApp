import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAdminTemplate]'
})
export class AdminTemplateDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
