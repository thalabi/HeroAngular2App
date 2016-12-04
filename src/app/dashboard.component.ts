import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  //moduleId: 'module.id', // no need to set in ec6
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  hero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes.slice(1, 5);
        console.log("this.heroes.length: ", this.heroes.length);
        });

    this.heroService.getHero(1)
      .subscribe(hero => {
        this.hero = hero;
        console.log("hero.id: ", hero.id);
      });
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/