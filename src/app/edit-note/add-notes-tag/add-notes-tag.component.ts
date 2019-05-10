import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';
import { EditNoteService } from '../edit-note.service';
import { CategoryTagEntity, CategoryTagData, GetNoteCategoryDataResponseModel } from '../model/get-note-category-data-response.model';
import { NoteItemCategory } from 'src/shared/models/note-item.model';
import { GetNoteCategoryIconNamesResponseModel, CategoryIconNames } from '../model/get-note-category-icon-names-response.model';


@Component({
  selector: 'app-add-notes-tag',
  templateUrl: './add-notes-tag.component.html',
  styleUrls: ['./add-notes-tag.component.scss'],
})
export class AddNotesTagComponent implements OnInit {

  public searchQuery: string = '';
  private categoryItems: CategoryTagEntity[];
  public filteredCategoryItems: CategoryTagEntity[];
  private loader: HTMLIonLoadingElement = null;
  public searchedTagText: NoteItemCategory = new NoteItemCategory();
  public newTagIdentified: boolean = false;
  public iconNamesList: string[] = [];

  constructor(public loadingCtrl: LoadingController,
    private editNoteService: EditNoteService,
    private modalCtrl: ModalController,
    private navParams: NavParams) {

  }

  ngOnInit() {

    this.initializeItems();

    this.searchedTagText.setCategoryName('')
      .setCategoryDescription('')
      .setIconName('');



  }

  private async initializeItems() {
    await this.presentLoading();

    await this.editNoteService.getCategoryTagData().subscribe(
      data => {

        const responseData = new GetNoteCategoryDataResponseModel();
        responseData.matchingRecords = Object.assign(new CategoryTagData(), data);

        this.categoryItems = responseData.matchingRecords.getCategoryTagData();

        const existingTags: NoteItemCategory[] = this.navParams.data.existingTags;
        if (existingTags && existingTags.length > 0) {
          this.categoryItems = this.categoryItems.map(_categoryItem => {
            const categoryItem: CategoryTagEntity = Object.assign(new CategoryTagEntity(), _categoryItem);
            categoryItem.setCategoryTags(
              categoryItem.getCategoryTags().map(_categoryTag => {
                const categoryTag = Object.assign(new NoteItemCategory(), _categoryTag);

                existingTags.some(existTag => {
                  existTag = Object.assign(new NoteItemCategory(), existTag);
                  if (categoryTag.getCategoryId() === existTag.getCategoryId() && categoryTag.getCategoryName().toUpperCase() === existTag.getCategoryName().toUpperCase()) {
                    categoryTag.setSelected(true);
                    return true;
                  }
                });

                return categoryTag;
              })
            );
            return categoryItem;
          });
        }

        this.filteredCategoryItems = [...this.categoryItems];

        this.loader.dismiss();
      }
    );
  }

  private async presentLoading() {
    const loadingOption: LoadingOptions = {
      spinner: 'bubbles',
      message: "Please wait...",
      cssClass: '',
      showBackdrop: true,
      duration: 30000,
      translucent: false,
      animated: true,
      backdropDismiss: false,
      mode: 'ios',
      keyboardClose: true,
      id: 'add-tag-loading-option'
      // enterAnimation?: AnimationBuilder;
      // leaveAnimation?: AnimationBuilder;
    }
    this.loader = await this.loadingCtrl.create(loadingOption);
    this.loader.present();

  }

  public async dismiss(buttonType, newTagFlag?: boolean) {

    if (buttonType === 'cancel') {
      this.modalCtrl.dismiss();
    } else if (buttonType === 'ok') {
      const selectedTags: NoteItemCategory[] = [];
      if (newTagFlag) {
        this.searchedTagText.setCategoryId('new')
          .setMarkedForDeletion(false)
          .setSelected(true);
        selectedTags.push(this.searchedTagText);
        this.modalCtrl.dismiss(selectedTags);
      } else {

        this.categoryItems.map((categoryTagItem: CategoryTagEntity) => {
          categoryTagItem = Object.assign(new CategoryTagEntity(), categoryTagItem);
          categoryTagItem.getCategoryTags().map(tag => {
            tag = Object.assign(new NoteItemCategory(), tag);
            if (tag.isSelected()) {
              selectedTags.push(tag);
            }
          });
        });

        if (selectedTags.length === 0 && this.searchedTagText.getCategoryName().trim().length > 0) {
          this.newTagIdentified = true;

          this.loader.present();
          await this.editNoteService.getCategoryIconNames().subscribe(iconNames => {
            const responseData = new GetNoteCategoryIconNamesResponseModel();
            responseData.matchingRecords = Object.assign(new CategoryIconNames(), iconNames);


            this.iconNamesList = responseData.matchingRecords.getCategoryIconNames();
            this.loader.dismiss();
          });

          // with a new tag being created, remove the cached value so as to fetch the latest set of records in the next attempt
          sessionStorage.setItem('irem-category-tag-data', null);

        } else {
          this.modalCtrl.dismiss(selectedTags);
        }
      }

    }
  }

  public trackSelection(event, _selectedTag: NoteItemCategory) {
    const selectedTag = Object.assign(new NoteItemCategory(), _selectedTag);
    selectedTag.setSelected(event.target.checked);

    this.categoryItems = this.categoryItems.map(_categoryItem => {
      const categoryItem: CategoryTagEntity = Object.assign(new CategoryTagEntity(), _categoryItem);
      categoryItem.setCategoryTags(
        categoryItem.getCategoryTags().map(_categoryTag => {
          const categoryTag = Object.assign(new NoteItemCategory(), _categoryTag);
          if (categoryTag.getCategoryId() === selectedTag.getCategoryId() && categoryTag.getCategoryName().toUpperCase() === selectedTag.getCategoryName().toUpperCase()) {
            categoryTag.setSelected(selectedTag.isSelected());
          }
          return categoryTag;
        })
      );

      return categoryItem;
    })
  }

  public getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      let toBefilteredCategories: CategoryTagEntity[] = [...this.categoryItems];
      this.filteredCategoryItems = [];
      toBefilteredCategories.filter((categoryTagItem: CategoryTagEntity, groupIndex) => {
        categoryTagItem = Object.assign(new CategoryTagEntity(), categoryTagItem);
        let categoryTags = categoryTagItem.getCategoryTags();
        categoryTags = categoryTagItem.getCategoryTags().filter(tag => {
          tag = Object.assign(new NoteItemCategory(), tag);
          return tag.getCategoryName().toLowerCase().indexOf(val.toLowerCase()) > -1;
        });

        categoryTagItem = categoryTagItem.setCategoryTags(categoryTags);
        // toBefilteredCategories[groupIndex] = Object.assign(new CategoryTagEntity(), toBefilteredCategories[groupIndex]);
        // toBefilteredCategories[groupIndex].setCategoryTags(categoryTags);

        if (categoryTagItem.getCategoryTags().length > 0) {
          this.filteredCategoryItems.push(categoryTagItem);
        }

      });
    } else {
      this.filteredCategoryItems = [...this.categoryItems];
    }
  }

}
