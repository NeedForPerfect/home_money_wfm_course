import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Observable} from 'rxjs/Observable';
import {Bill} from '../shared/models/bill.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit , OnDestroy {

  subscribtion: Subscription;

  constructor(private billService: BillService) { }



  ngOnInit() {
   this.subscribtion = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
          console.log(data);
    });
  }

  ngOnDestroy() {
        this.subscribtion.unsubscribe();
  }

}
