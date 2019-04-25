import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material';

import { TeamsService } from 'src/app/shared/services/teams.service';
import { Team } from 'src/app/shared';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  displayedTeams: Team[] = [];

  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.teamsService.retrieveAllTeams()
      .subscribe((data) => {
        for (const curRow of data) {
          this.teams.push(curRow);
        }
      });
    this.displayedTeams = this.teams;
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
        case 'id': return this.compare(a.teamID, b.teamID, isAsc);
        case 'name': return this.compare(a.teamName, b.teamName, isAsc);
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
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
