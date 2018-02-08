import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
            this.categories = categories;
            this.isLoaded = true;
      }); /*на этапе инициализации подгружаем список категорий и заносим в массив категорий
          из далее примет в себя edit.component через Input и [categories]="categories" в теге*/
  }


  newCategoryAdded(category: Category) {
            this.categories.push(category); // Тут правильнее подгрузить новый список из сервера
  }


  categoryWasEdited(category: Category) {
    const idx = this.categories
      .findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

}
