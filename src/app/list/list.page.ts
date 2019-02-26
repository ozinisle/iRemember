import { Component, OnInit } from '@angular/core';
import { ApiInteractionGatewayService } from '../../shared/api-interaction-gateway/api-interaction-gateway.service';
import { NoteItemInterface } from 'src/shared/models/interfaces/note-item.interface';
import { NoteItem } from 'src/shared/models/note-item.model';
import { Router } from '@angular/router';
import { NoteListService } from './note-list.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  // private selectedItem: any;
  // private icons = [
  //   'flask',
  //   'wifi',
  //   'beer',
  //   'football',
  //   'basketball',
  //   'paper-plane',
  //   'american-football',
  //   'boat',
  //   'bluetooth',
  //   'build'
  // ];
  public items: NoteItemInterface[] = [];
  constructor(private apiInteractionGatewayService: ApiInteractionGatewayService, private router: Router,
    private noteListService: NoteListService) {
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  ngOnInit() {
    this.apiInteractionGatewayService.doGet('/assets/data/notes-list.data.json').subscribe(response => {
      this.items = <NoteItem[]>response;
    }, error => {
      throw error;
    });
  }

  openItem(noteItem: NoteItemInterface) {
    this.noteListService.setLastSelectedNote(noteItem);
    this.router.navigate(['/new-note', noteItem]);
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
