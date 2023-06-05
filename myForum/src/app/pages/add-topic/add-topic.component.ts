import { Component } from '@angular/core';
import { ForumDataService } from 'app/services/forumDataService/forum-data.service';
import { OnlineService } from 'app/services/onlineService/online.service';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.scss']
})
export class AddTopicComponent {

  constructor(
    private forumDataService: ForumDataService,
  ) {

  }
  title = "";
  desc = "";

  addTopic() {
    if (this.title.length < 10) {
      return;
    }
    if(this.desc.length < 50){

      return;
    }
    this.forumDataService.addTopic(this.title, this.desc);
  }

}
