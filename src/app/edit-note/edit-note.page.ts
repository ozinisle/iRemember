import { Component, OnInit, Input } from '@angular/core';
import { NoteItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { EditNoteResolverDataInterface } from '../../shared/models/interfaces/resolver-data.interface';
import { NoteItem } from '../../shared/models/note-item.model';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
  public note: NoteItemInterface;
  public isNewDoc: boolean = false;
  public noteEntryForm: FormGroup;
  validation_messages = {
    'title': [
      { type: 'required', message: 'title is required.' },
      { type: 'minlength', message: 'title must be at least 4 characters long.' }
    ],
    'description': [
      { type: 'required', message: 'description is required.' },
      { type: 'minlength', message: 'description must be at least 4 characters long.' }
    ],
    'tags': [
      { type: 'required', message: 'tags are required.' }
    ]
  };
  constructor(private activatedRoute: ActivatedRoute,
    private alertController: AlertController, private toasController: ToastController) { }
  ngOnInit() {
    const editNoteResolverData: EditNoteResolverDataInterface = this.activatedRoute.snapshot.data.editNoteResolverData;
    // this.note = editNoteResolverData.getNote();
    this.note = Object.assign(Object.create(new NoteItem()), editNoteResolverData.getNote());
    this.noteEntryForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4)]),
      tags: new FormControl('', Validators.required)
    });
    if (!this.isNewDoc) {
      this.noteEntryForm.controls.title.setValue(this.note.getNoteTitle());
      this.noteEntryForm.controls.description.setValue(this.note.getNoteDescription());
      this.noteEntryForm.controls.tags.setValue(this.note.getCategoryTags().join(', '));
    }
  }
  async onSubmit() {
    const options: AlertOptions = {
      header: 'Save?',
      subHeader: 'save the changes made to the note',
      message: 'Are you sure you want to save the note?',
      // cssClass?: string | string[];
      // inputs?: AlertInput[];
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            console.warn('following form data to be save >>>', this.noteEntryForm.value);
            const toast = await this.toasController.create({
              message: 'The note has been saved.',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        { text: 'No' }
      ],
      // backdropDismiss?: boolean;
      // translucent?: boolean;
    };
    const confirm = await this.alertController.create(options);
    confirm.present();
  }
}
