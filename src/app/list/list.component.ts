import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CongressService } from '../services/congress.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  members = [];
  values = '';

  currentList = [];
  membersList = [];
  pagination = [];


  constructor(private congressService: CongressService, private router: Router) { }

  ngOnInit(): void {
    this.congressService.getAllMembers().subscribe(
      (res: any) => {
        res.results.forEach(congress => congress.members.forEach(member => this.members.push(member)));
        this.paginate(0, 10, this.members),
          this.currentList = this.members
      }
    );
  }

  search(searchValue) {
    let result = this.members.filter((member => Object.values(member).includes(searchValue) === true));
    if (searchValue == '') {
      this.paginate(0, 10, this.members);
    } else {
      this.paginate(0, 10, result);
    }
  }

  onKey(event: any) {
    this.values = event.target.value;
    this.search(this.values);
  }

  selectMember(member) {
    localStorage.setItem('selectedMember', JSON.stringify(member));
    this.router.navigate(['/member-detail']);
  }

  paginate(selectedPage, elementsPerPage, arrayToFilter) {
    const totalPages = Math.floor(arrayToFilter.length / elementsPerPage);
    const pagination = []
    const indexMin = selectedPage * elementsPerPage;
    const indexMax = indexMin + elementsPerPage;
    const filteredArray = arrayToFilter.filter(
      (x, index) => index >= indexMin && index < indexMax
    );
    for (let i = 0; i <= totalPages; i++) {
      pagination.push(i);
    }

    this.pagination = pagination;
    this.membersList = filteredArray;
  }
}
