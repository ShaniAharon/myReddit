import {Component, OnInit} from '@angular/core'
import {Hero} from 'src/app/models/hero'
import {HeroService} from 'src/app/services/hero.service'

//@Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  selector: 'app-heroes', //The component's CSS element selector.
  templateUrl: './heroes.component.html', //The location of the component's template file.
  styleUrls: ['./heroes.component.scss'], //The location of the component's private CSS styles.
})
export class HeroesComponent implements OnInit {
  // The parameter simultaneously defines a private heroService property and identifies it
  // as a HeroService injection site.
  // When Angular creates a HeroesComponent,
  // the Dependency Injection system sets the heroService parameter to the singleton instance
  // of HeroService.

  selectedHero?: Hero = {
    _id: 'qwer',
    name: 'Windstorm',
  }

  heroes: Hero[] = []

  constructor(private heroService: HeroService) {}

  //The ngOnInit() is a lifecycle hook.
  // Angular calls ngOnInit() shortly after creating a component.
  // It's a good place to put initialization logic.
  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    // The new version waits for the Observable to emit the array
    // of heroes —which could happen now or several minutes from now.
    //The subscribe() method passes the emitted array to the callback,
    // which sets the component's heroes property.
    // This asynchronous approach will work when the HeroService requests heroes
    // from the server.
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes))
    // this.heroes = this.heroService.getHeroes();
  }

  add(name: string): void {
    // creates a Hero-like object from the name (it's only missing the id) and passes it to the services addHero() method.
    // When addHero() saves successfully,
    //the subscribe() callback receives the new hero and pushes it into to the heroes list for display.
    name = name.trim()
    if (!name) return
    this.heroService.addHero({name} as Hero).subscribe((hero) => {
      this.heroes.push(hero)
    })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero)
    this.heroService.deleteHero(hero._id).subscribe() //As a rule, an Observable does nothing until something subscribes.
  }
}
