



import { State1Component } from './components/state1/state1.component';
import { State2Component } from './components/state2/state2.component';

export const routes:Array<any> = [
  {path: 'state1', component: State1Component,data: {animation: 'state1'}},
  {path: 'state2', component: State2Component, data: {animation: 'state2'}}
]
