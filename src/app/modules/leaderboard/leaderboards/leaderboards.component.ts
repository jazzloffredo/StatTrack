import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { LeaderboardService } from 'src/app/shared/services/leaderboard.service';
import { LeaderboardPlayer } from 'src/app/shared';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {

  displayedPlayers: LeaderboardPlayer[] = [];

  constructor(private spinner: NgxSpinnerService,
              private leaderboardService: LeaderboardService) { }

  ngOnInit() {
    this.spinner.show();
    this.setButtonPrimary('smallest');
    this.leaderboardService.retrieveSmallestPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        for (const player of this.displayedPlayers) {
          player.stat += ' lbs';
        }
        this.spinner.hide();
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
        this.spinner.hide();
      });
  }

  changeViewToShortest() {
    this.spinner.show();
    this.leaderboardService.retrieveShortestPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Height';
        this.spinner.hide();
      });
  }

  changeViewToTallest() {
    this.spinner.show();
    this.leaderboardService.retrieveTallestPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Height';
        this.spinner.hide();
      });
  }

  changeViewToHBP() {
    this.spinner.show();
    this.leaderboardService.retrieveHBPPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Hit by Pitches';
        this.spinner.hide();
      });
  }

  changeViewToWild() {
    this.spinner.show();
    this.leaderboardService.retrieveWildPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Wild Pitches';
        this.spinner.hide();
      });
  }

  changeViewToStrikeouts() {
    this.spinner.show();
    this.leaderboardService.retrieveStrikeoutsPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Strikeouts';
        this.spinner.hide();
      });
  }

  changeViewToBases() {
    this.spinner.show();
    this.leaderboardService.retrieveBasesPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Bases Stolen';
        this.spinner.hide();
      });
  }

  changeViewToHomeruns() {
    this.spinner.show();
    this.leaderboardService.retrieveHomerunsPlayers()
      .subscribe((data) => {
        this.displayedPlayers = data;
        document.getElementById('stat').innerHTML = 'Homeruns';
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
