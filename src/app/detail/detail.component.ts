import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  memberData;

  constructor() { }

  ngOnInit(): void {
    this.memberData = JSON.parse(localStorage.getItem('selectedMember'));
  }

}
