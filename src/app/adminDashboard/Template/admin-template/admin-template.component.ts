import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Type, Input, ViewChild, OnDestroy } from '@angular/core';
import { ViewFormContentComponent } from '../../view-form-content/view-form-content.component';
import { ActivatedRoute } from '@angular/router';

import { AdminItem } from '../admin-item';
import { AdminTemplateDirective } from '../admin-template.directive';
import { AdminComponent } from '../admin/admin.component';
@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.less']
})
export class AdminTemplateComponent implements OnInit, OnDestroy {
  @Input() ads: AdminItem[];
  @ViewChild(AdminTemplateDirective, { static: true }) adHost: AdminTemplateDirective;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  compo: Promise<Type<ViewFormContentComponent>>;
  dynamicComponent: any;
  fragment: string;
  interval: any;
  currentAdIndex = -1;
  ngOnInit(): void {

    this.loadComponent();
  }
  // async load() {
  //   this.viewContainerRef.clear();
  //   const { TemplateOneComponent } = await import('./../template-one/template-one.component');
  //   this.viewContainerRef.createComponent(this.cfr.resolveComponentFactory(TemplateOneComponent));
  // }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdminComponent>(componentFactory);
    componentRef.instance.data = adItem.data;
  }
}
