import {Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ToastComponent} from "./toast/toast.component";

@Component({
  selector: 'app-c11',
  templateUrl: './c11.component.html',
  styleUrls: ['./c11.component.scss']
})

export class C11Component {
  message = 'Hey Joe!';
  toastId = 0;
  @ViewChild("viewContainerRef", { read: ViewContainerRef }) VCR: ViewContainerRef | undefined;
  toastsRef = Array<ComponentRef<ToastComponent>>();

  constructor(private CFR: ComponentFactoryResolver) {}

  createToast() {
    if(!this.VCR) {
      return;
    }
    let componentFactory = this.CFR.resolveComponentFactory(ToastComponent);
    let toastComponentRef = this.VCR.createComponent(componentFactory);
    let toastComponent = toastComponentRef.instance;
    toastComponent.id = ++this.toastId;
    toastComponent.message = this.message;
    toastComponent.parentRef = this;
    this.toastsRef.push(toastComponentRef);
  }

  removeToast(id: number) {
    if (!this.VCR || this.VCR.length < 1) return;

    let componentRef = this.toastsRef.find(
      x => x.instance.id === id
    );
    let vcrIndex: number = this.toastsRef.indexOf(componentRef as any);
    this.VCR.remove(vcrIndex);
    this.toastsRef = this.toastsRef.filter(x => x.instance.id !== id);
  }
}
