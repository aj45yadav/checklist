import { Component, OnInit } from '@angular/core';
import { BuService, BuData } from '../services/bu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  buData: BuData = {} as BuData;
  constructor(public buService: BuService, public router: Router) { }

  ngOnInit() {
  }

  onNext() {
    const id = this.buService.business_id;
    // this.buData = { id: id, businessUnit: '', subBusinessUnit: '', projectName: '' };
    const serialized = JSON.stringify(this.buData);
    localStorage.setItem('bTemp', serialized);
    this.router.navigate(['/questions', id]);
  }
}
