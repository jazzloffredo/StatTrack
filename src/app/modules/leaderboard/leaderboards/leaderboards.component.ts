import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss']
})
export class LeaderboardsComponent implements OnInit {

  leaderboardButtons: FormGroup;

  constructor(private fb: FormBuilder) {
    this.leaderboardButtons = new FormGroup({
      
    });
  }

  ngOnInit() {
  }

}
