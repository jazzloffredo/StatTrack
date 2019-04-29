import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PlayersService } from '../../../shared/services/players.service';

import { PlayerBattingSeason } from 'src/app/shared/models/player/player-batting-season';
import { PlayerFieldingSeason } from 'src/app/shared/models/player/player-fielding-season';
import { PlayerPitchingSeason } from 'src/app/shared/models/player/player-pitching-season';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  playerName = '';

  battingSeasons: PlayerBattingSeason[] = [];
  fieldingSeasons: PlayerFieldingSeason[] = [];
  pitchingSeasons: PlayerPitchingSeason[] = [];

  isDisplayBatting = true;
  isDisplayFielding = false;
  isDisplayPitching = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playersService: PlayersService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.playersService.mapPlayerIdToName(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((name) => {
        this.playerName = name[0];
      });
    this.playersService.retrievePlayerBattingSeasons(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        for (const row of data) {
          row.battingAverage = Number(row.battingAverage).toFixed(3);
        }
        this.battingSeasons = data;
        this.spinner.hide();
      });
  }

  statTypeChange(event: any) {

    this.clearButtonPrimaryClass();
    this.isDisplayBatting = false;
    this.isDisplayFielding = false;
    this.isDisplayPitching = false;

    switch (event.target.id) {
      case 'batting':
        this.setButtonPrimary('batting');
        this.changeViewToBatting();
        break;
      case 'fielding':
        this.setButtonPrimary('fielding');
        this.changeViewToFielding();
        break;
      case 'pitching':
        this.setButtonPrimary('pitching');
        this.changeViewToPitching();
        break;
    }
  }

  changeViewToBatting() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.fieldingSeasons = [];
    this.pitchingSeasons = [];
    this.playersService.retrievePlayerBattingSeasons(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        for (const row of data) {
          row.battingAverage = Number(row.battingAverage).toFixed(3);
        }
        this.battingSeasons = data;
        this.isDisplayBatting = true;
        this.spinner.hide();
      });
  }

  changeViewToFielding() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.battingSeasons = [];
    this.pitchingSeasons = [];
    this.playersService.retrievePlayerFieldingSeasons(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.fieldingSeasons = data;
        this.isDisplayFielding = true;
        this.spinner.hide();
      });
  }

  changeViewToPitching() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.battingSeasons = [];
    this.fieldingSeasons = [];
    this.playersService.retrievePlayerPitchingSeasons(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        for (const row of data) {
          if (row.ERA !== 'No data.') {
            row.ERA = Number(row.ERA).toFixed(3);
          }
          if (row.opponentAverage === 0) {
            row.opponentAverage = 'No data.';
          }
        }
        this.pitchingSeasons = data;
        this.isDisplayPitching = true;
        this.spinner.hide();
      });
  }

  clearButtonPrimaryClass() {
    if (document.getElementById('batting').classList.contains('is-primary')) {
      document.getElementById('batting').classList.remove('is-primary');
    }
    if (document.getElementById('fielding').classList.contains('is-primary')) {
      document.getElementById('fielding').classList.remove('is-primary');
    }
    if (document.getElementById('pitching').classList.contains('is-primary')) {
      document.getElementById('pitching').classList.remove('is-primary');
    }
  }

  setButtonPrimary(id: string) {
    document.getElementById(id).classList.add('is-primary');
  }

  gotoPlayers() {
    this.router.navigate(['/players']);
  }
}
