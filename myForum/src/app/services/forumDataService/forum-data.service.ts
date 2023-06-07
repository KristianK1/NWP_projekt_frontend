import { Injectable } from '@angular/core';
import { StorageService } from '../storageService/storage.service';
import { OnlineService } from '../onlineService/online.service';
import { IAddTopicRequest } from 'app/models/backendRequests';
import { ICategory, ITopic } from 'app/models/forumModels';

@Injectable({
  providedIn: 'root'
})
export class ForumDataService {

  categories: ICategory[] = [];

  selectedCategory: number = -1;
  selectedTopic: number = -1;

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
      return await this.onlineService.getTopics(categoryId);
    } catch {
      return [];
    }
  }

  async addComment(categoryId: number, topicId: number, text: string) {

  }

  async getComments(categoryId: number, topicId: number) {
    try {
      return await this.onlineService.getComments(categoryId, topicId);
    } catch {
      return [];
    }
  }

}
