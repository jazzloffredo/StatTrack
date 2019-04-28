import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { zip } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { LeaderboardService } from 'src/app/shared/services/leaderboard.service';
import { PlayersService } from 'src/app/shared/services/players.service';
import { LeaderboardPlayer } from 'src/app/shared';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {

  displayedPlayers: LeaderboardPlayer[] = [];
  favoritePlayerIDs: string[] = [];

  constructor(private spinner: NgxSpinnerService,
              private authService: AuthService,
              private leaderboardService: LeaderboardService,
              private playersService: PlayersService) { }

  ngOnInit() {
    this.spinner.show();
    this.setButtonPrimary('smallest');
    zip(this.leaderboardService.retrieveSmallestPlayers(),
        this.playersService.retrieveFavoritePlayersForUser(this.authService.getUsername()))
      .subscribe(([smallest, favorites]) => {
        this.favoritePlayerIDs = favorites;
        this.displayedPlayers = smallest;
        for (const player of this.displayedPlayers) {
          player.stat += ' lbs';
        }
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  favoritePlayer(event: any, player: LeaderboardPlayer) {
    if (event.target.nodeName === 'BUTTON') {
      event.target.classList.add('is-loading');
    } else if (event.target.nodeName === 'SPAN') {
      event.target.parentElement.classList.add('is-loading');
    } else {
      event.target.parentElement.parentElement.classList.add('is-loading');
    }

    this.playersService.addFavoritePlayerForUser(this.authService.getUsername(), player.playerID)
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
          this.favoritePlayerIDs.push(player.playerID);
        } else {
          console.log('not success');
        }
      });
  }

  markFavoritePlayers() {
    for (const favID of this.favoritePlayerIDs) {
      for (const player of this.displayedPlayers) {
        if (player.playerID === favID) {
          player.favorite = true;
          break;
        }
      }
    }
  }

  unFavoritePlayer(event: any, player: LeaderboardPlayer) {
    if (event.target.nodeName === 'BUTTON') {
      event.target.classList.add('is-loading');
    } else if (event.target.nodeName === 'SPAN') {
      event.target.parentElement.classList.add('is-loading');
    } else {
      event.target.parentElement.parentElement.classList.add('is-loading');
    }

    this.playersService.deleteFavoritePlayerForUser(this.authService.getUsername(), player.playerID)
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
          this.favoritePlayerIDs.splice(this.favoritePlayerIDs.indexOf(player.playerID), 1);
        } else {
          console.log('not success');
        }
      });
  }

  leaderboardChange(event: any) {

    this.clearButtonPrimaryClass();

    switch (event.target.id) {
      case 'smallest':
        this.setButtonPrimary('smallest');
        this.changeViewToSmallest();
        break;
      case 'largest':
        this.setButtonPrimary('largest');
        this.changeViewToLargest();
        break;
      case 'shortest':
        this.setButtonPrimary('shortest');
        this.changeViewToShortest();
        break;
      case 'tallest':
        this.setButtonPrimary('tallest');
        this.changeViewToTallest();
        break;
      case 'hbp':
        this.setButtonPrimary('hbp');
        this.changeViewToHBP();
        break;
      case 'wild':
        this.setButtonPrimary('wild');
        this.changeViewToWild();
        break;
      case 'strikeouts':
        this.setButtonPrimary('strikeouts');
        this.changeViewToStrikeouts();
        break;
      case 'bases':
        this.setButtonPrimary('bases');
        this.changeViewToBases();
        break;
      case 'homeruns':
        this.setButtonPrimary('homeruns');
        this.changeViewToHomeruns();
        break;
    }
  }

  changeViewToSmallest() {
    this.spinner.show();
    document.getElementById('stat').innerHTML = 'Weight';
    this.leaderboardService.retrieveSmallestPlayers()
      .subscribe((data) => {
        for (const player of this.displayedPlayers) {
          player.stat += ' lbs';
        }
        this.displayedPlayers = data;
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToLargest() {
    this.spinner.show();
    this.leaderboardService.retrieveLargestPlayers()
      .subscribe((data) => {
        for (const player of this.displayedPlayers) {
          player.stat += ' lbs';
        }
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Weight';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToShortest() {
    this.spinner.show();
    this.leaderboardService.retrieveShortestPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Height';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToTallest() {
    this.spinner.show();
    this.leaderboardService.retrieveTallestPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Height';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToHBP() {
    this.spinner.show();
    this.leaderboardService.retrieveHBPPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Hit by Pitches';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToWild() {
    this.spinner.show();
    this.leaderboardService.retrieveWildPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Wild Pitches';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToStrikeouts() {
    this.spinner.show();
    this.leaderboardService.retrieveStrikeoutsPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Strikeouts';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToBases() {
    this.spinner.show();
    this.leaderboardService.retrieveBasesPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Bases Stolen';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  changeViewToHomeruns() {
    this.spinner.show();
    this.leaderboardService.retrieveHomerunsPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Homeruns';
        this.markFavoritePlayers();
        this.spinner.hide();
      });
  }

  clearButtonPrimaryClass() {
    if (document.getElementById('smallest').classList.contains('is-primary')) {
      document.getElementById('smallest').classList.remove('is-primary');
    }
    if (document.getElementById('largest').classList.contains('is-primary')) {
      document.getElementById('largest').classList.remove('is-primary');
    }
    if (document.getElementById('shortest').classList.contains('is-primary')) {
      document.getElementById('shortest').classList.remove('is-primary');
    }
    if (document.getElementById('tallest').classList.contains('is-primary')) {
      document.getElementById('tallest').classList.remove('is-primary');
    }
    if (document.getElementById('hbp').classList.contains('is-primary')) {
      document.getElementById('hbp').classList.remove('is-primary');
    }
    if (document.getElementById('wild').classList.contains('is-primary')) {
      document.getElementById('wild').classList.remove('is-primary');
    }
    if (document.getElementById('strikeouts').classList.contains('is-primary')) {
      document.getElementById('strikeouts').classList.remove('is-primary');
    }
    if (document.getElementById('bases').classList.contains('is-primary')) {
      document.getElementById('bases').classList.remove('is-primary');
    }
    if (document.getElementById('homeruns').classList.contains('is-primary')) {
      document.getElementById('homeruns').classList.remove('is-primary');
    }
  }

  setButtonPrimary(id: string) {
    document.getElementById(id).classList.add('is-primary');
  }
}
