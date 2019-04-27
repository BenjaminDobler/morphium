/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  ApplicationRef,
  Attribute,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive, EmbeddedViewRef,
  EventEmitter, HostListener,
  Injector,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef
} from '@angular/core';

import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SharedElementTransitionManager} from './sharedelementtransitionmanager';
import {EditorComponent} from './editor/editor.component';

/**
 * @whatItDoes Acts as a placeholder that Angular dynamically fills based on the current router
 * state.
 *
 * @howToUse
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name='left'></router-outlet>
 * <router-outlet name='right'></router-outlet>
 * ```
 *
 * A router outlet will emit an activate event any time a new component is being instantiated,
 * and a deactivate event when it is being destroyed.
 *
 * ```
 * <router-outlet
 *   (activate)='onActivate($event)'
 *   (deactivate)='onDeactivate($event)'></router-outlet>
 * ```
 * @ngModule RouterModule
 *
 * @stable
 */
@Directive({selector: 'morph-outlet', exportAs: 'outlet'})
export class MorphOutlet implements OnDestroy, OnInit {
  private activated: ComponentRef<any> | null = null;
  private _activatedRoute: ActivatedRoute | null = null;
  private name: string;
  public editorOpen = false;
  private editorRef:ComponentRef<EditorComponent>;

  public sharedTransitionManager: SharedElementTransitionManager;

  @Output('activate') activateEvents = new EventEmitter<any>();
  @Output('deactivate') deactivateEvents = new EventEmitter<any>();

  @Output('activate2') activateEvents2 = new EventEmitter<any>();

  constructor(private parentContexts: ChildrenOutletContexts,
              private location: ViewContainerRef,
              private resolver: ComponentFactoryResolver,
              @Attribute('name') name: string,
              private changeDetector: ChangeDetectorRef,
              private appRef: ApplicationRef,
              private injector: Injector) {
    this.name = name || 'primary';
    let t: any = this;
    this.sharedTransitionManager = new SharedElementTransitionManager(this);
    parentContexts.onChildOutletCreated(this.name, t);
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'a') {
      this.toggleEditor();
    }
  }

  toggleEditor() {
    if (this.editorOpen) {
      this.removeEditor();
    } else {
      this.editorRef = this.attachEditor();
    }
    this.editorOpen = !this.editorOpen;
  }

  removeEditor() {
    this.appRef.detachView(this.editorRef.hostView);
    this.editorRef.destroy();
  }

  attachEditor(): ComponentRef<EditorComponent> {
    // 1. Create a component reference from the component
    const componentRef = this.resolver
      .resolveComponentFactory(EditorComponent)
      .create(this.injector);

    componentRef.instance.transitionManager = this.sharedTransitionManager;

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);

    /*
    // 5. Wait some time and remove it from the component tree and from the DOM
    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 3000);
    */
    return componentRef;
  }

  ngOnDestroy(): void {
    this.parentContexts.onChildOutletDestroyed(this.name);
  }

  ngOnInit(): void {
    if (!this.activated) {
      // If the outlet was not instantiated at the time the route got activated we need to populate
      // the outlet when it is initialized (ie inside a NgIf)
      const context = this.parentContexts.getContext(this.name);
      if (context && context.route) {
        if (context.attachRef) {
          // `attachRef` is populated when there is an existing component to mount
          this.attach(context.attachRef, context.route);
        } else {
          // otherwise the component defined in the configuration is created
          this.activateWith(context.route, context.resolver || null);
        }
      }
    }
  }

  get isActivated(): boolean {
    return !!this.activated;
  }

  get component(): Object {
    if (!this.activated) {
      throw new Error('Outlet is not activated');
    }
    return this.activated.instance;
  }

  get activatedRoute(): ActivatedRoute {
    if (!this.activated) {
      throw new Error('Outlet is not activated');
    }
    return this._activatedRoute as ActivatedRoute;
  }

  get activatedRouteData() {
    if (this._activatedRoute) {
      return this._activatedRoute.snapshot.data;
    }
    return {};
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree
   */
  detach(): ComponentRef<any> {
    if (!this.activated) {
      throw new Error('Outlet is not activated');
    }
    this.location.detach();
    const cmp = this.activated;
    this.activated = null;
    this._activatedRoute = null;
    return cmp;
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
   */
  attach(ref: ComponentRef<any>, activatedRoute: ActivatedRoute) {
    this.activated = ref;
    this._activatedRoute = activatedRoute;
    this.location.insert(ref.hostView);
  }

  deactivate(): void {
    if (this.activated) {
      const c = this.component;
      this.activated.destroy();
      this.activated = null;
      this._activatedRoute = null;
      this.deactivateEvents.emit(c);
    }
  }

  currentComponent: any;

  activateWith(activatedRoute: any, resolver: ComponentFactoryResolver | null) {
    if (this.isActivated) {
      throw new Error('Cannot activate an already activated outlet');
    }
    this._activatedRoute = activatedRoute;
    const snapshot = activatedRoute._futureSnapshot;
    const component = <any>snapshot.routeConfig!.component;
    resolver = resolver || this.resolver;
    const factory = resolver.resolveComponentFactory(component);
    const childContexts = this.parentContexts.getOrCreateContext(this.name).children;
    const injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);

    this.activated = this.location.createComponent(factory, this.location.length, injector);
    // Calling `markForCheck` to make sure we will run the change detection when the
    // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
    this.changeDetector.markForCheck();
    this.activateEvents2.emit({new: this.activated, old: this.currentComponent});
    this.activateEvents.emit(this.activated.instance);
    this.currentComponent = this.activated;
  }
}

class OutletInjector implements Injector {
  constructor(private route: ActivatedRoute, private childContexts: ChildrenOutletContexts, private parent: Injector) {
  }

  get(token: any, notFoundValue?: any): any {
    if (token === ActivatedRoute) {
      return this.route;
    }

    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }

    return this.parent.get(token, notFoundValue);
  }
}
