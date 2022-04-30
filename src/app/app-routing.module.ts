import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './cmps/dashboard/dashboard.component';
import { HeroDetailComponent } from './cmps/hero-detail/hero-detail.component';
import { HeroesComponent } from './cmps/heroes/heroes.component';

const routes: Routes = [
  //This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // The colon (:) character in the path indicates that :id is a placeholder for a specific hero id.
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
