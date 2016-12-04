import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from '@angular/core';

import { Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HeroService {

  private heroeServiceUrl = 'http://localhost:8080/HeroService/hero';  // URL to web api
  private jsonHeaders = new Headers({'Content-Type': 'application/json'});

  constructor (
    private http: Http) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get(this.heroeServiceUrl+"/all")
               .map(response => response.json() as Hero[])
               .catch(this.handleError);
    }

  getHero(id: number): Observable<Hero> {
    return this.http.get(this.heroeServiceUrl+"/"+id)
               .map(response => response.json() as Hero)
               .catch(this.handleError);
    }

  update(hero: Hero): Observable<Hero> {
    const url = `${this.heroeServiceUrl}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.jsonHeaders})
      .do(() => hero)
      .catch(this.handleError);
  }

  create(name: string): Observable<Hero> {
    return this.http
      .post(this.heroeServiceUrl, JSON.stringify({name: name}), {headers: this.jsonHeaders})
      .map(res => res.json())
      .catch(this.handleError);
  }

  delete(id: number): Observable<void> {
    const url = `${this.heroeServiceUrl}/${id}`;
    return this.http.delete(url, {headers: this.jsonHeaders})
      .map(() => null)
      .catch(this.handleError);
  }


  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/