import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { RespondEventComponent } from './components/respond-event/respond-event.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationMessagesComponent } from './components/conversation-messages/conversation-messages.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

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
    FooterComponent,
    ProfileComponent,
    SignupComponent,
    EditProfileComponent
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
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddEventComponent]
})
export class AppModule { }
