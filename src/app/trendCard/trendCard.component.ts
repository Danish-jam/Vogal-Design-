import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-TrendCard',

  templateUrl: './trendCard.component.html',
  styleUrls: ['./trendCard.component.css']
})
export class TrendCardComponent {
 @Input() product : any;
}
