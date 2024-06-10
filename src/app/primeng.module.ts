import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple'; // Importa RippleModule
import { TagModule } from 'primeng/tag'; // Importa TagModule
import { RatingModule } from 'primeng/rating'; // Importa RatingModule
import { PaginatorModule } from 'primeng/paginator'; // Importa PaginatorModule

const modPrime: any = [
  AvatarModule,
  ButtonModule,
  MenubarModule,
  ToolbarModule,
  TooltipModule,
  MenuModule,
  CardModule,
  InputTextModule,
  ToastModule,
  InputTextareaModule,
  ConfirmPopupModule,
  DialogModule,
  ImageModule,
  FileUploadModule,
  TableModule,
  RippleModule, // Añade RippleModule
  TagModule, // Añade TagModule
  RatingModule, // Añade RatingModule
  PaginatorModule // Añade PaginatorModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modPrime
  ],
  exports: [
    ...modPrime
  ]
})
export class PrimengModule { }
