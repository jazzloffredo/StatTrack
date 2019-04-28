import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, zip } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { Team } from 'src/app/shared';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  teams: Team[] = [];
  favoriteTeamIDs: string[] = [];
  displayedTeams: Team[] = [];

  viewAllChecked = true;

  constructor(private spinner: NgxSpinnerService,
              private authService: AuthService,
              private teamsService: TeamsService) { }

  ngOnInit() {
    this.spinner.show();

    const username = this.authService.getUsername();

    zip(
      this.teamsService.retrieveAllTeams(),
      this.teamsService.retrieveFavoriteTeamsForUser(username)
    )
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(([allTeams, favoriteIDs]) => {
      for (const curRow of allTeams) {
        this.teams.push(curRow);
      }
      this.displayedTeams = this.teams;

      this.favoriteTeamIDs = favoriteIDs;
      this.markFavoriteTeams();

      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  markFavoriteTeams() {
    for (const favID of this.favoriteTeamIDs) {
      for (const team of this.teams) {
        if (team.teamID === favID) {
          team.favorite = true;
          break;
        }
      }
    }
  }

  favoriteTeam(event: any, team: Team) {
    if (event.target.nodeName === 'BUTTON') {
      event.target.classList.add('is-loading');
    } else if (event.target.nodeName === 'SPAN') {
      event.target.parentElement.classList.add('is-loading');
    } else {
      event.target.parentElement.parentElement.classList.add('is-loading');
    }

    this.teamsService.addFavoriteTeamForUser(this.authService.getUsername(), team.teamID)
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
          team.favorite = true;
        } else {
          console.log('not success');
        }
      });
  }

  unFavoriteTeam(event: any, team: Team) {
    if (event.target.nodeName === 'BUTTON') {
      event.target.classList.add('is-loading');
    } else if (event.target.nodeName === 'SPAN') {
      event.target.parentElement.classList.add('is-loading');
    } else {
      event.target.parentElement.parentElement.classList.add('is-loading');
    }

    this.teamsService.deleteFavoriteTeamForUser(this.authService.getUsername(), team.teamID)
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
          team.favorite = false;
        } else {
          console.log('not success');
        }
      });
  }

  changeViewToAll() {
    this.displayedTeams = this.teams;
    this.viewAllChecked = true;
  }

  changeViewToFavorites() {
    const onlyFavTeams: Team[] = [];
    for (const team of this.displayedTeams) {
      if (team.favorite) {
        onlyFavTeams.push(team);
      }
    }
    this.displayedTeams = onlyFavTeams;
    this.viewAllChecked = false;
  }

  sortData(sort: Sort) {
    const data = this.teams.slice();
    if (!sort.active || sort.direction === '') {
      this.displayedTeams = data;
      return;
    }

    this.displayedTeams = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.teamID, b.teamID, !isAsc);
        case 'name': return this.compare(a.teamName, b.teamName, !isAsc);
        case 'active': return this.compare(a.isActive, b.isActive, isAsc);
        case 'games': return this.compare(a.totalGames, b.totalGames, isAsc);
        case 'wins': return this.compare(a.totalWins, b.totalWins, isAsc);
        case 'losses': return this.compare(a.totalLosses, b.totalLosses, isAsc);
        case 'ratio': return this.compare(a.winLossRatio, b.winLossRatio, isAsc);
        case 'leagueWins': return this.compare(a.leagueWins, b.leagueWins, isAsc);
        case 'seriesWins': return this.compare(a.worldSeriesWins, b.worldSeriesWins, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? -1 : 1);
  }

  onSearchChange(value: string) {
    const newTeamDisplay: Team[] = [];
    if (this.viewAllChecked) {
      for (const team of this.teams) {
        if (team.teamName.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
          newTeamDisplay.push(team);
        }
      }
      this.displayedTeams = newTeamDisplay;
    } else {
      for (const team of this.teams) {
        if (team.favorite && team.teamName.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
          console.log(team);
          newTeamDisplay.push(team);
        }
      }
      this.displayedTeams = newTeamDisplay;
    }
  }
}
