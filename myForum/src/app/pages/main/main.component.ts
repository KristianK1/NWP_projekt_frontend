import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory, ITopic } from 'app/models/forumModels';
import { ForumDataService } from 'app/services/forumDataService/forum-data.service';
import { UserService } from 'app/services/userService/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loggedIn = false;

  categories: ICategory[] = [];
  selectedCategory = 0;

  topics: ITopic[] = [];

  constructor(
    private _router: Router,
    private forumDataService: ForumDataService,
    private userService: UserService,
  ) {
    this.userService.myself.subscribe((value) => {
      this.loggedIn = !!value;
    });

  }

  async ngOnInit() {
    this.loginByToken();
    this.categories = await this.forumDataService.getCategories(false);
    this.selectedCategory = this.categories[0].id;
    console.log("sel cat: " +this.selectedCategory);
  }

  async loginByToken() {
    await this.userService.loginByToken();
  }

  navigateToLogin() {
    this._router.navigate(['login']);
  }

  logout() {
    this.userService.logout(false);
  }

  navigateToUserSettings(){
    this._router.navigate(["user"]);
  }

  navigateToAddNewTopic(){
    this._router.navigate(["addTopic"]);
  }

  async selectCategory(catId: number){
    console.log(catId);
    this.selectedCategory = catId;
    this.topics = await this.forumDataService.getTopics(catId);
  }

  async selectTopic(topicId: number){
    console.log("click topic: " + topicId);
    
  }

}
