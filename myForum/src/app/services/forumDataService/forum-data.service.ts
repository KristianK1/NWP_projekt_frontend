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
      return await this.onlineService.getComments(categoryId, topicId);
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
}
