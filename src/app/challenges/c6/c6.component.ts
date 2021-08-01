import { Component, OnInit } from '@angular/core';
import {Seat} from "./seat.model";

@Component({
  selector: 'app-c6',
  templateUrl: './c6.component.html',
  styleUrls: ['./c6.component.scss']
})
export class C6Component implements OnInit {
  seats: Seat[] = [];
  mockTaken = [2, 34 ,35, 68, 69];
  constructor() { }

  ngOnInit(): void {
    for(let i =1; i<=70; i++) {
      const seat = {
        taken: this.mockTaken.includes(i),
        price: 12,
        row: Math.trunc(i/10)+1,
        seatNumber: i
      }
      this.seats.push(seat);
    }
  }

  selectSeat(seatNum: number) {
    if(this.seats[seatNum-1].taken) {
      return;
    }
    console.log('Selected: ', seatNum);
  }

}
