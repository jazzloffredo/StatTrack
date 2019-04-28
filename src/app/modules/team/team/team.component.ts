import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';

import { TeamSeason } from '../../../shared/models/team/team-season';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<boolean> = new Subject<boolean>();

  teamSeasons: TeamSeason[] = [];
  displayedTeamSeasons: TeamSeason[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teamsService: TeamsService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    const id = this.route.snapshot.paramMap.get('id');
    this.teamsService.retrieveAllTeamSeasons(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        for (const row of data) {
          row.winLossRatio = Number(row.winLossRatio).toFixed(3);
        }
        this.teamSeasons = data;
        this.displayedTeamSeasons = data;
        this.spinner.hide();
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  sortData(sort: Sort) {
    const data = this.teamSeasons.slice();
    if (!sort.active || sort.direction === '') {
      this.displayedTeamSeasons = data;
      return;
    }

    this.displayedTeamSeasons = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'year': return this.compare(a.year, b.year, isAsc);
        case 'wins': return this.compare(a.wins, b.wins, isAsc);
        case 'losses': return this.compare(a.losses, b.losses, isAsc);
        case 'ratio': return this.compare(a.winLossRatio, b.winLossRatio, isAsc);
        case 'pennant': return this.compare(a.wsWinner, b.wsWinner, isAsc);
        case 'scored': return this.compare(a.runsScored, b.runsScored, isAsc);
        case 'against': return this.compare(a.runsAgainst, b.runsAgainst, isAsc);
        case 'allowed': return this.compare(a.hitsAllowed, b.hitsAllowed, isAsc);
        case 'errors': return this.compare(a.errors, b.errors, isAsc);
        case 'attendance': return this.compare(a.homeAttendance, b.homeAttendance, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? -1 : 1);
  }

  gotoTeams() {
    this.router.navigate(['/teams']);
  }
}
