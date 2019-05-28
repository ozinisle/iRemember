import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteListService } from './note-list.service';
import { NoteItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { NoteItem } from '../../shared/models/note-item.model';
import { ApiInteractionGatewayService } from '../../shared/api-interaction-gateway/api-interaction-gateway.service';
import { GetNotesListResolverDataInterface } from 'src/shared/models/interfaces/resolver-data.interface';
import { ToastController } from '@ionic/angular';
import { IRemember } from 'src/shared/constants/i-remember.constants';
import { MatrixErrorHandlerService } from 'src/shared/services/matrix-error-handler.service';
import { GetNotesListResolverData } from 'src/shared/models/resolver-data.model';
import { Observable } from 'rxjs';
import { GenericResponseModelInterface } from 'src/shared/models/interfaces/generic-items.interface';
import { NotesListSearchQueryInterface } from './model/interface/notes-list.interface';
import { NotesListSearchQueryModel } from './model/notes-list.model';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public items: NoteItemInterface[] = [];
  private itemsMarkedForDeletion: NoteItemInterface[] = [];
  public notesExist: boolean = false;
  public isTrashFolderFlag: boolean = false;
  public searchQuery: NotesListSearchQueryInterface = new NotesListSearchQueryModel();
  public showAdvancedSearchOptions: boolean = false;

  //private onInitTriggered = false;
  constructor(private router: Router,
    private noteListService: NoteListService,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private errorHandler: MatrixErrorHandlerService) {
  }
  ngOnInit() {

  }

  ionViewWillEnter() {
    try {
      this.triggerBeforPageLoad();
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  toggleAdvancedSearchOptions() {
    this.showAdvancedSearchOptions = !this.showAdvancedSearchOptions;
  }

  openItem(noteItem: NoteItemInterface) {
    try {
      this.noteListService.setLastSelectedNote(noteItem);
      this.router.navigate(['/view-note']);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  editItem(noteItem: NoteItemInterface) {
    try {
      this.noteListService.setLastSelectedNote(noteItem);
      this.router.navigate(['/edit-note']);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  doDelete() {
    try {
      let toast: Promise<HTMLIonToastElement> = null;
      const idsMarkedForDeletion: string[] = this.itemsMarkedForDeletion.map(noteItem => {
        noteItem = Object.assign(new NoteItem(), noteItem);
        return noteItem.getNoteId();
      })

      if (idsMarkedForDeletion.length > 0) {
        let deleteApiEndPoint: Observable<GenericResponseModelInterface>;
        if (this.isTrashFolderFlag) {
          deleteApiEndPoint = this.noteListService.hardDeleteNotes(idsMarkedForDeletion)
        } else {
          deleteApiEndPoint = this.noteListService.softDeleteNotes(idsMarkedForDeletion)
        }
        deleteApiEndPoint.subscribe(deletionResponse => {

          if (deletionResponse.status === "SUCCESS") {

            toast = this.toastController.create({
              message: IRemember.messages.noteDataDeletionSuccessMessage,
              duration: 3000,
              position: 'bottom'
            });

            this.itemsMarkedForDeletion = [];
            this.items = deletionResponse.matchingRecords.notesList;
          } else {

            toast = this.toastController.create({
              message: IRemember.messages.noteDataDeletionFailureMessage,
              duration: 3000,
              position: 'bottom'
            });
          }

          toast.then(done => done.present());

        }, error => {
          toast = this.toastController.create({
            message: IRemember.messages.noteDataDeletionFailureMessage,
            duration: 3000,
            position: 'bottom'
          });
          toast.then(done => done.present());
        });
      }
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
  trackSelection(event, noteItem: NoteItemInterface) {
    try {
      noteItem = Object.assign(new NoteItem(), noteItem);
      noteItem.setMarkedForDeletion(event.target.checked);
      if (noteItem.isMarkedForDeletion()) {
        this.itemsMarkedForDeletion.push(noteItem);
      } else {
        const noteIds = this.itemsMarkedForDeletion.map((note) => {
          note = Object.assign(new NoteItem(), note);
          return note.getNoteId();
        });
        this.itemsMarkedForDeletion.splice(noteIds.indexOf(noteItem.getNoteId()), 1);
      }
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  openNewNote() {
    try {
      this.noteListService.setLastSelectedNote(new NoteItem());
      this.router.navigate(['/edit-note']);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

  getItems(event) {
    this.triggerBeforPageLoad(true);
  }

  private async triggerBeforPageLoad(searchResultsOnlyFlag?: boolean) {
    try {
      // if (this.onInitTriggered) {
      //   return;
      // }



      const locationFrags = window.location.href.split('/');
      this.isTrashFolderFlag = locationFrags[locationFrags.length - 1].toLowerCase() === "trash";
      if (!this.isTrashFolderFlag) {
        const getNotesListResolverData: GetNotesListResolverData = new GetNotesListResolverData();
        if (searchResultsOnlyFlag) {
          getNotesListResolverData.notesList = await this.noteListService.getMatchingNotesList(this.searchQuery).toPromise();
        } else {
          getNotesListResolverData.notesList = await this.noteListService.getNotesList().toPromise();
        }
        if (getNotesListResolverData && getNotesListResolverData.notesList && getNotesListResolverData.notesList.matchingRecords
          && getNotesListResolverData.notesList.matchingRecords.notesList) {
          this.items = <NoteItem[]>getNotesListResolverData.notesList.matchingRecords.notesList;
        }

      } else {
        const trashResolverData: GetNotesListResolverData = new GetNotesListResolverData();

        const request = { "softDeletedDataOnly": true };
        if (searchResultsOnlyFlag) {
          this.searchQuery.softDeletedDataOnly = true;
          trashResolverData.notesList = await this.noteListService.getMatchingNotesList(this.searchQuery).toPromise();
        } else {
          trashResolverData.notesList = await this.noteListService.getNotesList(request).toPromise();
        }
        if (trashResolverData && trashResolverData.notesList && trashResolverData.notesList.matchingRecords
          && trashResolverData.notesList.matchingRecords.notesList) {
          this.items = <NoteItem[]>trashResolverData.notesList.matchingRecords.notesList;
        }
      }

      if (this.items.length > 0) {
        this.notesExist = true;
      }
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }

}
