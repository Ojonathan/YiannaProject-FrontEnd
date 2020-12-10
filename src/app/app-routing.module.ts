import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ConversationMessagesComponent } from './components/conversation-messages/conversation-messages.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsComponent } from './components/events/events.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent,
  children:[
    {path: '', component: EventsListComponent},
    {path: ':idEvent', component: EventsListComponent}
  ]},
  { path: 'chat', component: ChatComponent,
  children:[
    {path: '', component: NotFoundComponent},
    {path: 'conversation/:idConversation', component: ConversationMessagesComponent}
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'profile', component: ProfileComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
