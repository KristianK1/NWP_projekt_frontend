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
  userId: number = -1;

  categories: ICategory[] = [];
  selectedCategory = 0;

  topics: ITopic[] = [];

  constructor(
    private _router: Router,
    private forumDataService: ForumDataService,
    private userService: UserService,
  ) {
    this.userService.myself.subscribe((value) => {
      console.log("eeeeeee" + value)
      this.loggedIn = !!value;
      this.userId = value?.userId || -1;
    });

  }

  async ngOnInit() {
    this.categories = await this.forumDataService.getCategories(false);
    this.selectCategory(this.categories[0].id);
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
    console.log("navigate to new topic");
    
    this._router.navigate(["addTopic"]);
  }

  async selectCategory(catId: number){
    console.log(catId);
    this.selectedCategory = catId;
    this.topics = await this.forumDataService.getTopics(catId);
  }

  async selectTopic(topicId: number){
    console.log("click topic: " + topicId);
    this._router.navigate(["topic"], { queryParams: { category: this.selectedCategory, topic: topicId }});
  }

}
