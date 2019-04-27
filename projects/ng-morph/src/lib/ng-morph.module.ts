import { NgModule } from "@angular/core";
import { MorphOutlet } from "./morph-outlet.directive";
import {EditorComponent} from './editor/editor.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [ MorphOutlet, EditorComponent],
  imports: [BrowserModule],
  exports: [MorphOutlet, EditorComponent],
  entryComponents: [EditorComponent]
})
export class NgMorphModule {}
