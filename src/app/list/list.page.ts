import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteListService } from './note-list.service';
import { NoteItemInterface } from '../../shared/models/interfaces/note-item.interface';
import { NoteItem } from '../../shared/models/note-item.model';
import { MatrixHttpService } from 'src/shared/services/matrix-http.service';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  // private selectedItem: any;
  // private icons = [
  // 'flask',
  // 'wifi',
  // 'beer',
  // 'football',
  // 'basketball',
  // 'paper-plane',
  // 'american-football',
  // 'boat',
  // 'bluetooth',
  // 'build'
  // ];
  public items: NoteItemInterface[] = [];
  public isDeleteButtonSelected: boolean = false;
  private itemsMarkedForDeletion: string[] = [];
  constructor(private matHttp: MatrixHttpService, private router: Router,
    private noteListService: NoteListService) {
  }
  ngOnInit() {
    this.matHttp.doUnencryptedGet('/assets/data/notes-list.data.json').subscribe(response => {
      this.items = <NoteItem[]>response;
    }, error => {
      throw error;
    });
  }
  openItem(noteItem: NoteItemInterface) {
    this.noteListService.setLastSelectedNote(noteItem);
    this.router.navigate(['/view-note']);
  }
  editItem(noteItem: NoteItemInterface) {
    this.noteListService.setLastSelectedNote(noteItem);
    this.router.navigate(['/edit-note']);
  }
  doDelete() {
    this.isDeleteButtonSelected = !this.isDeleteButtonSelected;
    if (this.isDeleteButtonSelected) {
      console.warn('mark for deletion');
    } else {
      console.warn('will be deleted');
    }
  }
  trackSelection(item) {
    console.warn('item is being tracked for deletion');
  }
}
