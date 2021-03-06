import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {HeroesComponent} from './cmps/heroes/heroes.component'
import {HeroDetailComponent} from './cmps/hero-detail/hero-detail.component'
import {MessagesComponent} from './cmps/messages/messages.component'
import {DashboardComponent} from './cmps/dashboard/dashboard.component'
import {HttpClientModule} from '@angular/common/http'
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './services/in-memory-data.service';
import {HeroSearchComponent} from './cmps/hero-search/hero-search.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component'

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
