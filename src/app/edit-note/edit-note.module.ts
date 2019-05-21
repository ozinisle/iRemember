import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditNotePage } from './edit-note.page';
import { BrowserModule } from '@angular/platform-browser';
import { AddNotesTagComponent } from './add-notes-tag/add-notes-tag.component';

const routes: Routes = [
  {
    path: '',
    component: EditNotePage
  }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    EditNotePage,
    AddNotesTagComponent
  ],
  entryComponents: [
    AddNotesTagComponent
  ],
  exports: [
    AddNotesTagComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EditNotePageModule { }