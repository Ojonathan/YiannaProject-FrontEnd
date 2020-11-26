import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventsComponent } from './components/events/events.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: EventsComponent,
  children:[
    {path: '', redirectTo: 'events', pathMatch: 'full'},
    {path: 'events', component: EventsListComponent}
  ]},
  { path: 'chat', component: ChatComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
