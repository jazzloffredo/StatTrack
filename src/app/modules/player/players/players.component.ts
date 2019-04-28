import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, zip } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { PlayersService } from 'src/app/shared/services/players.service';
import { Player } from 'src/app/shared';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  players: Player[] = [];
  favoritePlayerIDs: string[] = [];
  displayedPlayers: Player[] = [];

  viewAllChecked = true;

  constructor(private spinner: NgxSpinnerService,
              private authService: AuthService,
              private playersService: PlayersService) { }

  ngOnInit() {
    this.spinner.show();

    const username = this.authService.getUsername();

    zip(
      this.playersService.retrieveAllPlayersGivenChar('A'),
      this.playersService.retrieveFavoritePlayersForUser(username)
    )
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(([allPlayers, favoriteIDs]) => {
      for (const curRow of allPlayers) {
        this.players.push(curRow);
      }
      this.displayedPlayers = this.players;

      this.favoritePlayerIDs = favoriteIDs;
      this.markFavoritePlayers();

      this.spinner.hide();
    });
  }

  markFavoritePlayers() {
    for (const favID of this.favoritePlayerIDs) {
      for (const player of this.players) {
        if (player.playerID === favID) {
          player.favorite = true;
          break;
        }
      }
    }
  }

  onSelectChange(lastNameChar: string) {
    this.spinner.show();
    this.players = [];
    this.displayedPlayers = [];
    const username = this.authService.getUsername();
    zip(
      this.playersService.retrieveAllPlayersGivenChar(lastNameChar),
      this.playersService.retrieveFavoritePlayersForUser(username)
    )
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(([allPlayers, favoriteIDs]) => {
      for (const curRow of allPlayers) {
        this.players.push(curRow);
      }
      this.displayedPlayers = this.players;

      this.favoritePlayerIDs = favoriteIDs;
      this.markFavoritePlayers();

      this.spinner.hide();
    });
  }

  favoritePlayer(event: any, player: Player) {
    if (event.target.nodeName === 'BUTTON') {
      event.target.classList.add('is-loading');
    } else if (event.target.nodeName === 'SPAN') {
      event.target.parentElement.classList.add('is-loading');
    } else {
      event.target.parentElement.parentElement.classList.add('is-loading');
    }

    this.playersService.addFavoritePlayerForUser(this.authService.getUsername(), player.playerID)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((success) => {
        if (success) {
          if (event.target.nodeName === 'BUTTON') {
            event.target.classList.remove('is-loading');
          } else if (event.target.nodeName === 'SPAN') {
            event.target.parentElement.classList.remove('is-loading');
          } else {
            event.target.parentElement.parentElement.classList.remove('is-loading');
          }
          player.favorite = true;
        } else {
          console.log('not success');
        }
      });
  }

  unFavoritePlayer(event: any, player: Player) {
    if (event.target.nodeName === 'BUTTON') {
      event.target.classList.add('is-loading');
    } else if (event.target.nodeName === 'SPAN') {
      event.target.parentElement.classList.add('is-loading');
    } else {
      event.target.parentElement.parentElement.classList.add('is-loading');
    }

    this.playersService.deleteFavoritePlayerForUser(this.authService.getUsername(), player.playerID)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((success) => {
        if (success) {
          if (event.target.nodeName === 'BUTTON') {
            event.target.classList.remove('is-loading');
          } else if (event.target.nodeName === 'SPAN') {
            event.target.parentElement.classList.remove('is-loading');
          } else {
            event.target.parentElement.parentElement.classList.remove('is-loading');
          }
          player.favorite = false;
        } else {
          console.log('not success');
        }
      });
  }

  changeViewToAll() {
    this.displayedPlayers = this.players;
    this.viewAllChecked = true;
  }

  changeViewToFavorites() {
    const onlyFavPlayers: Player[] = [];
    for (const player of this.displayedPlayers) {
      if (player.favorite) {
        onlyFavPlayers.push(player);
      }
    }
    this.displayedPlayers = onlyFavPlayers;
    this.viewAllChecked = false;
  }

  sortData(sort: Sort) {
    const data = this.players.slice();
    if (!sort.active || sort.direction === '') {
      this.displayedPlayers = data;
      return;
    }

    this.displayedPlayers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'firstName': return this.compare(a.firstName, b.firstName, !isAsc);
        case 'lastName': return this.compare(a.lastName, b.lastName, !isAsc);
        default: return 0;
      }
    });
  }

  compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? -1 : 1);
  }

  onSearchChange(value: string) {
    const newPlayerDisplay: Player[] = [];
    if (this.viewAllChecked) {
      for (const player of this.players) {
        const playerFullName = player.firstName + player.lastName;
        if (playerFullName.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
          newPlayerDisplay.push(player);
        }
      }
      this.displayedPlayers = newPlayerDisplay;
    } else {
      for (const player of this.players) {
        const playerFullName = player.firstName + player.lastName;
        if (player.favorite && playerFullName.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
          newPlayerDisplay.push(player);
        }
      }
      this.displayedPlayers = newPlayerDisplay;
    }
  }
}
