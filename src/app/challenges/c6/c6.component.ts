import {Component, OnInit, Renderer2} from '@angular/core';
import {Seat} from "./seat.model";
import {BehaviorSubject} from "rxjs";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-c6',
  templateUrl: './c6.component.html',
  styleUrls: ['./c6.component.scss']
})
export class C6Component implements OnInit {
  seats: Seat[] = [];
  mockTaken = [2, 34 ,35, 68, 69];
  totalPrice: number | undefined;
  readonly onSelect = new BehaviorSubject<Seat[]>(this.seats);
  readonly selectedSeats$ = this.onSelect.pipe(
    map(seats => seats.filter(seat => seat.selected)),
    tap(seats => this.calcPrice(seats))
  );

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    // setup mock seats
    for(let i =1; i<=70; i++) {
      const seat = {
        selected: false,
        taken: this.mockTaken.includes(i),
        price: 12,
        row: Math.trunc(i/10)+1,
        seatNumber: i
      }
      this.seats.push(seat);
    }
  }

  selectSeat(event: Event, seatNum: number) {
    if(this.seats[seatNum-1].taken) {
      return;
    }
    if(this.seats[seatNum-1].selected) {
      this.renderer.removeClass(event.target, 'selected');
    } else {
      this.renderer.addClass(event.target, 'selected');
    }
    this.seats[seatNum-1].selected = !this.seats[seatNum-1].selected
    this.onSelect.next(this.seats);
  }

  calcPrice(seats: Seat[]): void {
    this.totalPrice = seats.reduce((acc, seat) => acc + seat.price, 0);
  }

  onBuy() {
    this.seats = this.seats.map((seat: Seat) => {
      if(seat.selected) {
        seat.taken = true;
        seat.selected = false;
      }
      return seat;
    })

    // remove selection
    const selectedSeats = document.querySelectorAll('.seats-container .selected') as NodeList;
    selectedSeats.forEach(seat => this.renderer.removeClass(seat, 'selected'));

    // reset price and selected seats
    this.onSelect.next([]);
  }
}
