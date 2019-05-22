import { Component, OnInit } from '@angular/core';
import { NoteItemInterface, NoteItemCategoryInterface } from '../../shared/models/interfaces/note-item.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteItem, NoteItemCategory } from '../../shared/models/note-item.model';
import { EditNoteService } from './edit-note.service';
import { AddNotesTagComponent } from './add-notes-tag/add-notes-tag.component';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { MatrixErrorHandlerService } from 'src/shared/services/matrix-error-handler.service';
import { NoteListService } from '../list/note-list.service';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.page.html',
  styleUrls: ['./edit-note.page.scss'],
})
export class EditNotePage implements OnInit {
  public note: NoteItemInterface = new NoteItem();
  public isNewDoc: boolean = false;
  public noteEntryForm: FormGroup;
  public noTagFound: boolean = true;
  public validation_messages = {
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
    private errorHandler: MatrixErrorHandlerService,
    private route: Router,
    private noteListService: NoteListService
  ) { }

  ngOnInit() {
    console.log('oninit fired');
    this.noteEntryForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4)])
    });
  }

  ionViewWillEnter() {
    try {
      console.log('ionViewWillEnter fired');
      // const editNoteResolverData: EditNoteResolverDataInterface = this.activatedRoute.snapshot.data.editNoteResolverData;
      // this.note = Object.assign(Object.create(new NoteItem()), editNoteResolverData.getNote());

      this.note = this.noteListService.getLastSelectedNote();
      if (!this.note) {
        this.note = new NoteItem();
      }

      if (!this.isNewDoc) {
        this.noteEntryForm.controls.title.setValue(this.note.noteTitle);
        this.noteEntryForm.controls.description.setValue(this.note.noteDescription);
      }

      this.noTagFound = this.note.categoryTags ? this.note.categoryTags.length === 0 : true;
      console.log('noTagFound is >>> ' + this.noTagFound);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  public onSubmit() {
    try {
      const options: AlertOptions = {
        header: 'Save?',
        subHeader: 'save the changes made to the note',
        message: 'Are you sure you want to save the note?',
        buttons: [
          {
            text: 'Yes',
            handler: async () => {
              try {
                this.editNoteService.updateNode(this.getNoteDetails()).subscribe(
                  updateNoteResponse => {
                    try {
                      let toast: Promise<HTMLIonToastElement> = null;
                      const responseNote = <NoteItemInterface>updateNoteResponse.matchingRecords;

                      if (responseNote === null) {

                        toast = this.toasController.create({
                          message: IRemember.messages.noteDataSaveFailedMessage,
                          duration: 3000,
                          position: 'bottom'
                        });
                      } else {
                        this.note = Object.assign(new NoteItem(), responseNote);
                        toast = this.toasController.create({
                          message: IRemember.messages.noteDataSaveSuccessMessage,
                          duration: 3000,
                          position: 'bottom'
                        });

                        this.route.navigateByUrl("/list");
                      }

                      toast.then(done => done.present());
                    } catch (error) {
                      this.errorHandler.handleError(error);
                    }

                  },
                  error => {
                    const toast = this.toasController.create({
                      message: IRemember.messages.noteDataSaveFailedMessage,
                      duration: 3000,
                      position: 'bottom'
                    });
                    toast.then(done => done.present());
                    throw new Error(error);
                  }
                );
              } catch (error) {
                this.errorHandler.handleError(error);
              }
            }
          },
          { text: 'No' }
        ]
      };
      const confirm = this.alertController.create(options);
      confirm.then(confirm => confirm.present());
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  public removeTag(selectedTag) {
    try {
      // console.log(selectedTag);
      selectedTag = Object.assign(new NoteItemCategory(), selectedTag);
      let catTags: NoteItemCategoryInterface[] = this.note.categoryTags;
      let matchedIndex = -1;
      catTags.some((tag, index) => {
        tag = Object.assign(new NoteItemCategory(), tag);
        if (tag.categoryName === selectedTag.categoryName && tag.categoryId === selectedTag.categoryId) {
          matchedIndex = index;
          return true
        }
      });
      catTags.splice(matchedIndex, 1);
      this.noTagFound = (catTags.length === 0);
      this.note.setCategoryTags(catTags);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  public goBack() {
    try {
      //this.navController.back();
      this.route.navigateByUrl("/list");
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  public presentAddTagModal() {
    try {
      let addTagModal: Promise<HTMLIonModalElement> = this.modalCtrl.create({
        component: AddNotesTagComponent,
        componentProps: { "existingTags": this.note.categoryTags },
        cssClass: ''
      });

      addTagModal.then(addTagModal => {

        addTagModal.present();

        addTagModal.onDidDismiss().then(selectedTags => {
          //OverlayEventDetail<NoteItemCategoryInterface[]>
          //console.log(data);
          //this.note.setCategoryTags(<NoteItemCategoryInterface[]>selectedTags.data);
          if (selectedTags.data) {
            this.note.categoryTags = <NoteItemCategoryInterface[]>selectedTags.data;
          }
          this.noTagFound = this.note.categoryTags ? (this.note.categoryTags.length === 0) : true;
        });
      });
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  private getNoteDetails(): NoteItemInterface {
    try {
      const descriptionItm: string = this.noteEntryForm.controls['description'].value;

      this.note.noteTitle = this.noteEntryForm.controls['title'].value;
      this.note.noteDescription = descriptionItm;
    } catch (error) {
      this.errorHandler.handleError(error);
    }

    return this.note;
  }
}
