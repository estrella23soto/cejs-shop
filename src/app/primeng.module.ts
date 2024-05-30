import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToolbarModule} from 'primeng/toolbar';
import {MenubarModule} from 'primeng/menubar';
import { ButtonModule} from 'primeng/button';
import { AvatarModule} from 'primeng/avatar';
import { TooltipModule} from 'primeng/tooltip';
import { MenuModule} from 'primeng/menu';
//modulos primehg

const modPrime: any = [
  ToolbarModule,
  MenubarModule,
  ButtonModule,
  AvatarModule,
  TooltipModule,
  MenuModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modPrime
  ], exports : [
    modPrime
  ]
})
export class PrimengModule { }
