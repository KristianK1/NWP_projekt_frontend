import { Injectable } from '@angular/core';
import { StorageService } from '../storageService/storage.service';
import { OnlineService } from '../onlineService/online.service';
import { ICategory, ITopic } from 'app/models/forumModels';

@Injectable({
  providedIn: 'root'
})
export class ForumDataService {

  categories: ICategory[] = [];

  selectedCategory: number = -1;
  selectedTopic: number = -1;

  localTopicsbyCategories: any = [];

  constructor(
    private storageService: StorageService,
    private onlineService: OnlineService,
  ) { }

  async getCategories(forceOnline: boolean): Promise<ICategory[]> {
    if (forceOnline || !this.categories || this.categories.length == 0) {
      try {
        this.categories = await this.onlineService.getCategories();
        return this.categories;
      } catch { }
    }
    
    return this.categories;
  }

  async addTopic(categoryId: number, title: string, desc: string) {
    try {
      await this.onlineService.addTopic(this.storageService.getAuthToken(), categoryId, title, desc);
    } catch { }
  }

  async getTopics(categoryId: number): Promise<ITopic[]> {
    try {
      let topics = await this.onlineService.getTopics(categoryId);
      this.localTopicsbyCategories[categoryId] = topics;
      for(let topic of topics) {
        topic.timestamp = this.formatTimestamp(topic.timestamp);
      }
      return topics;
    } catch {
      return [];
    }
  }

  async addComment(categoryId: number, topicId: number, text: string) {
    try {
      this.onlineService.addComment(this.storageService.getAuthToken(), categoryId, topicId, text);
    } catch {

    }
  }

  async getComments(categoryId: number, topicId: number) {
    try {
      let x = await this.onlineService.getComments(categoryId, topicId);
      for(let comment of x){
        comment.timestamp = this.formatTimestamp(comment.timestamp);
      }
      return x;
    } catch {
      return [];
    }
  }

  getLocalTopic(catId: number, topicId: number) {
    let topics = this.localTopicsbyCategories[catId] as ITopic[];
    if (!topics) return undefined;
    let topic = topics.find(o => o.id == topicId);
    return topic;
  }

  getLocalCategory(catId: number) {
    let topics = this.localTopicsbyCategories[catId] as ITopic[];
    return topics;
  }

  async getSingleTopic(catId: number, topicId: number): Promise<ITopic> {
    return await this.onlineService.getSingleTopic(catId, topicId);
  }

  async deleteComment(categoryId: number, topicId: number, commentId: number) {
    try {
      return await this.onlineService.deleteComment(this.storageService.getAuthToken(), categoryId, topicId, commentId);
    } catch {

    }
  }

  formatTimestamp(isoTimestamp: string): string {
    const date = new Date(isoTimestamp);
    
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mjeseci su indeksirani od 0, stoga dodajemo +1
    const year = date.getFullYear().toString();
    
    const formattedTimestamp = `${hours}:${minutes} ${day}/${month}/${year}`;
    
    return formattedTimestamp;
  }

}
