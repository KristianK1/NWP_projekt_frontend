import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'app/models/forumModels';
import { ForumDataService } from 'app/services/forumDataService/forum-data.service';
import { UserService } from 'app/services/userService/user.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy {

  loggedIn = false;

  private catId: number = -1;
  private topicId: number = -1;

  comments: IComment[] = [];
  topicText: string = "";
  topicTitle: string = "";

  commentText: string = "";

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private forumDataService: ForumDataService,
    private userService: UserService,
  ) {
    this.userService.myself.subscribe((value) => {
      console.log("eeeeeee" + value)
      this.loggedIn = !!value;
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (value) => {
      this.catId = value["category"];
      this.topicId = value["topic"];

      this.comments = await this.forumDataService.getComments(this.catId, this.topicId);

      let topicData = this.forumDataService.getLocalTopic(this.catId, this.topicId);
      if (!topicData) {
        topicData = await this.forumDataService.getSingleTopic(this.catId, this.topicId);
      };
      this.topicText = topicData.text;
      this.topicTitle = topicData.title;

    })
  }

  ngOnDestroy(): void {
    this.comments = [];
  }

  navigateToLogin() {
    this._router.navigate(['login']);
  }

  logout() {
    this.userService.logout(false);
  }

  navigateToUserSettings() {
    this._router.navigate(["user"]);
  }

  navigateToAddNewTopic() {
    this._router.navigate(["addTopic"]);
  }

  async addComment() {
    if (this.commentText.length > 5) {
      await this.forumDataService.addComment(this.catId, this.topicId, this.commentText);
      this.commentText = "";
      setTimeout(async () => {
        this.comments = await this.forumDataService.getComments(this.catId, this.topicId);
      }, 500);
    }
  }
}
