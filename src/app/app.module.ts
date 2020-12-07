import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EventTypesListComponent } from './components/event-types-list/event-types-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { EventsComponent } from './components/events/events.component';
import { LoginComponent } from './components/login/login.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddEventTypeComponent } from './components/add-event-type/add-event-type.component';
import { EventTypeFilterPipe } from './pipes/event-type-filter.pipe';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { RxStompConfig } from './config/rx-stomp.config';
import { RespondEventComponent } from './components/respond-event/respond-event.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationMessagesComponent } from './components/conversation-messages/conversation-messages.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EventsListComponent,
    NotFoundComponent,
    EventTypesListComponent,
    ChatComponent,
    EventsComponent,
    LoginComponent,
    AddEventComponent,
    AddEventTypeComponent,
    EventTypeFilterPipe,
    RespondEventComponent,
    ConversationListComponent,
    ConversationMessagesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: RxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddEventComponent]
})
export class AppModule { }
