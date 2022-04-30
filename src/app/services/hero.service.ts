import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {catchError, Observable, of, tap} from 'rxjs'
// import {HEROES} from '../mock-heroes'
import {Hero} from '../models/hero'
import {MessageService} from './message.service'

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  //Modify the constructor with a parameter that declares a private messageService property.
  //Angular will inject the singleton MessageService into that property when it creates
  // the HeroService.
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  //This is a typical "service-in-service" scenario: You inject the MessageService
  //into the HeroService which is injected into the HeroesComponent.

  private heroesUrl = 'http://localhost:3030/api/hero' // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES); //of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  //   this.messageService.add('HeroService: fetched heroes');
  //   return heroes;
  // }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    //You've swapped of() for http.get() and the application keeps working without any other changes
    // because both functions return an Observable<Hero[]>.
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      // RxJS tap() operator, which looks at the observable values,
      // does something with those values, and passes them along.
      // The tap() call back doesn't touch the values themselves.
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
    // const hero = HEROES.find((h) => h.id === id)!;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero._id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    //test in server
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero._id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  /** DELETE: delete the hero from the server */
  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  //Notice that you keep injecting the MessageService but since you'll call it so frequently, wrap it in a private log() method:
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([])
    }
    // query string with the search term
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error) // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T)
    }
  }
}
