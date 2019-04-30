import { Component, OnInit, Input } from '@angular/core';
import { NoteItemInterface, NoteItemCategoryInterface, NoteDescriptionItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { EditNoteResolverDataInterface } from '../../shared/models/interfaces/resolver-data.interface';
import { NoteItem, NoteItemCategory, NoteDescriptionItem } from '../../shared/models/note-item.model';
import { EditNoteService } from './edit-note.service';
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
    private alertController: AlertController,
    private toasController: ToastController,
    private editNoteService: EditNoteService) { }

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
      // this.noteEntryForm.controls.description.setValue(this.note.getNoteDescription());
      this.noteEntryForm.controls.tags.setValue(this.note.getCategoryTags().join(', '));
    }
  }
  onSubmit() {
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
            //console.warn('following form data to be save >>>', this.noteEntryForm.value);
            this.editNoteService.updateNode(this.getNoteDetails()).subscribe(
              updateNoteResponse => {
                const toast = this.toasController.create({
                  message: 'The note has been saved.',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.then(done => done.present());
              },
              error => {
                const toast = this.toasController.create({
                  message: 'Services are down temporarily. Data not saved',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.then(done => done.present());
                throw new Error(error);
              }
            );

          }
        },
        { text: 'No' }
      ],
      // backdropDismiss?: boolean;
      // translucent?: boolean;
    };
    const confirm = this.alertController.create(options);
    confirm.then(confirm => confirm.present());
  }

  private getNoteDetails(): NoteItemInterface {
    const noteDetails: NoteItemInterface = new NoteItem();

    const tags = this.noteEntryForm.controls['tags'].value;
    const categoryTags: NoteItemCategoryInterface[] = [];
    if (tags && tags.trim && tags.trim()) {
      const tagArr = tags.trim().split(',');
      tagArr.map((tagItem) => {
        const categoryTag: NoteItemCategory = new NoteItemCategory();
        categoryTag.categoryName = tagItem;
        categoryTags.push(categoryTag);
      });
    }

    const descriptionItm: string = this.noteEntryForm.controls['description'].value;

    noteDetails
      .setNoteTitle(this.noteEntryForm.controls['title'].value)
      .setCategoryTags(categoryTags)
      .setNoteDescriptionItems(descriptionItm);


    return noteDetails;
  }
}
