import {Location} from '@angular/common'
import {Component, Input, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Hero} from 'src/app/models/hero'
import {HeroService} from 'src/app/services/hero.service'

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero()
  }

  //The route.snapshot is a static image of the route information shortly after the component was created.
  //The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch.
  //Route parameters are always strings. The JavaScript Number function converts the string to a number,
  //which is what a hero id should be.

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) this.heroService.getHero(id).subscribe((hero) => (this.hero = hero))
  }

  save(): void {
    if (this.hero) {
      console.log('here')

      this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
    }
  }

  goBack(): void {
    this.location.back()
  }
}
