import { Component, OnInit } from '@angular/core';
import { NoteItemInterface, NoteItemCategoryInterface } from '../../shared/models/interfaces/note-item.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController, NavController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ActivatedRoute } from '@angular/router';
import { EditNoteResolverDataInterface } from '../../shared/models/interfaces/resolver-data.interface';
import { NoteItem, NoteItemCategory } from '../../shared/models/note-item.model';
import { EditNoteService } from './edit-note.service';
import { AddNotesTagComponent } from './add-notes-tag/add-notes-tag.component';
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
    ]
  };

  constructor(private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toasController: ToastController,
    private editNoteService: EditNoteService,
    private modalCtrl: ModalController,
    private navController: NavController) { }

  ngOnInit() {
    const editNoteResolverData: EditNoteResolverDataInterface = this.activatedRoute.snapshot.data.editNoteResolverData;
    this.note = Object.assign(Object.create(new NoteItem()), editNoteResolverData.getNote());
    this.noteEntryForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4)])
    });
    if (!this.isNewDoc) {
      this.noteEntryForm.controls.title.setValue(this.note.getNoteTitle());
      this.noteEntryForm.controls.description.setValue(this.note.getNoteDescription());
    }
  }

  public onSubmit() {
    const options: AlertOptions = {
      header: 'Save?',
      subHeader: 'save the changes made to the note',
      message: 'Are you sure you want to save the note?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            this.editNoteService.updateNode(this.getNoteDetails()).subscribe(
              updateNoteResponse => {
                const toast = this.toasController.create({
                  message: 'The note has been saved.',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.then(done => done.present());

                this.note = <NoteItemInterface>updateNoteResponse.matchingRecords;
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
      ]
    };
    const confirm = this.alertController.create(options);
    confirm.then(confirm => confirm.present());
  }

  public removeTag(selectedTag) {
    // console.log(selectedTag);
    selectedTag = Object.assign(new NoteItemCategory(), selectedTag);
    let catTags: NoteItemCategoryInterface[] = this.note.getCategoryTags();
    let matchedIndex = -1;
    catTags.some((tag, index) => {
      if (tag.getCategoryName() === selectedTag.getCategoryName() && tag.getCategoryId() === selectedTag.getCategoryId()) {
        matchedIndex = index;
        return true
      }
    });
    catTags.splice(matchedIndex, 1);
    this.note.setCategoryTags(catTags);
  }
  public goBack() {
    this.navController.back();
  }

  public presentAddTagModal() {
    let addTagModal: Promise<HTMLIonModalElement> = this.modalCtrl.create({
      component: AddNotesTagComponent,
      componentProps: { "existingTags": this.note.getCategoryTags() },
      cssClass: ''
    });

    addTagModal.then(addTagModal => {

      addTagModal.present();

      addTagModal.onDidDismiss().then(selectedTags => {
        //OverlayEventDetail<NoteItemCategoryInterface[]>
        //console.log(data);
        this.note.setCategoryTags(<NoteItemCategoryInterface[]>selectedTags.data);
      });

    });







  }

  private getNoteDetails(): NoteItemInterface {

    const descriptionItm: string = this.noteEntryForm.controls['description'].value;

    this.note
      .setNoteTitle(this.noteEntryForm.controls['title'].value)
      .setNoteDescription(descriptionItm);

    return this.note;
  }
}
