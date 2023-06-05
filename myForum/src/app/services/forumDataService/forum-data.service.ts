import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumDataService {

  constructor() { }

  async addTopic(title: string, desc: string){

  }

  async getTopics(categoryId: number){

  }

  async addComment(categoryId: number, topicId: number, text: string){

  }

  async getComments(categoryId: number, topicId: number){

  }


}
