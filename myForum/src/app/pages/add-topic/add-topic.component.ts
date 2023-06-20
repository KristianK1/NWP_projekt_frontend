import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'app/models/forumModels';
import { ForumDataService } from 'app/services/forumDataService/forum-data.service';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent implements OnInit {

  categories: ICategory[] = [];

  selectedCategory: number = 0;

  title = "";
  desc = "";

  constructor(
    private _router: Router,
    private forumDataService: ForumDataService,
  ) {

  }
  async ngOnInit() {
    this.categories = await this.forumDataService.getCategories(false);
  }

  async addTopic() {
  console.log(this.selectedCategory);
  
  let cat: ICategory = this.categories[this.selectedCategory];
  console.log(cat);
  
    if (this.title.length < 10) {
      return;
    }
    if (this.title,length > 50) {
      return;
    }
    if (this.desc.length < 50) {
      return;
    }
    if (this.desc.length > 500) { 
      return;
    }
    await this.forumDataService.addTopic(cat.id, this.title, this.desc);
    await this.forumDataService.getCategories(true);
    this._router.navigate([""]);
    
  }

  selectCategory() {
  }

}
