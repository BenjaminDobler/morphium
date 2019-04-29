import {NgModule} from '@angular/core';
import {EditorComponent} from './editor/editor.component';
import {BrowserModule} from '@angular/platform-browser';
import {MorphiumOutletDirective} from './morph-outlet.directive';

@NgModule({
  declarations: [MorphiumOutletDirective, EditorComponent],
  imports: [BrowserModule],
  exports: [MorphiumOutletDirective, EditorComponent, MorphiumOutletDirective],
  entryComponents: [EditorComponent]
})
export class MorphiumModule {
}
