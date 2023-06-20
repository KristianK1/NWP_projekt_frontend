import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularWebStorageModule } from 'angular-web-storage';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { TopicComponent } from './pages/topic/topic.component';
import { AddTopicComponent } from './pages/add-topic/add-topic.component';
import { FormsModule } from '@angular/forms';

const appRoute: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MainComponent },
  { path: 'topic', component: TopicComponent },
  { path: 'addTopic', component: AddTopicComponent },
  { path: 'user', component: UserSettingsComponent },
  { path: 'chPass', component: ChangePasswordComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    UserSettingsComponent,
    ChangePasswordComponent,
    TopicComponent,
    AddTopicComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularWebStorageModule,
    RouterModule.forRoot(appRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
