import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'app/models/forumModels';
import { ForumDataService } from 'app/services/forumDataService/forum-data.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit, OnDestroy {

  private catId: number = -1;
  private topicId: number = -1;

  comments: IComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private forumDataService: ForumDataService,
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (value) => {
      this.catId = value["category"];
      this.topicId = value["topic"];
      
      this.comments = await this.forumDataService.getComments(this.catId, this.topicId);
      console.log(this.comments)
    })
  }

  ngOnDestroy(): void {
    this.comments = [];

  }

}
