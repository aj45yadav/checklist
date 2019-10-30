import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuService {
  business_id: number;
  constructor() {
    this.business_id = this.generateId();
   }

   generateId(): number {
     return Math.floor(Math.random() * Math.floor(99999999));
   }
}

export interface BuData {
  id: number;
  businessUnit: string;
  subBusinessUnit: string;
  projectName: string;
}
