import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartComponent } from '../chart/chart.component';
import { LayoutComponent } from '../layout/layout.component';
import { ChipModule } from 'primeng/chip';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { CardComponent } from '../card/card.component';
import { Cardinfo, ProductServiceService,Cardinfotype } from '../.serive/product-service.service';
import { ApiService } from '../.serive/api.service';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
// import { TagModule } from 'primeng/tag';
import { DWorkCardComponent } from '../d-work-card/d-work-card.component';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { Chart } from 'chart.js';
import { DGridComponent } from "../d-grid/d-grid.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DWorkCardComponent,TooltipModule, RippleModule, ChartComponent, LayoutComponent, ChipModule, TabMenuModule, CardComponent, CommonModule, CalendarModule, TagModule, FormsModule, ReactiveFormsModule, DGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {



date!:Date;

selectdate() {
  const selecteddate=this.dateformat(this.date);
   this.cardinfoapi(selecteddate)
   this.cardinfoworkapi(selecteddate)
}
  // @ViewChild('logoDiv') logoDiv!: ElementRef;


 cards!:Cardinfo[];
 cardtype!:Cardinfotype[];
  newdate!: String;

  constructor(private productServiceService: ProductServiceService,private apiservice :ApiService){}



activeItem: MenuItem = { label: 'Dash Board' };
items: MenuItem[] | undefined;

dateformat(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0'); // Ensure two digits with leading zero
  const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const year: number = date.getFullYear();
  return `${day}-${month}-${year}`;
}


ngOnInit() {
  this.date=new Date();
  const strdate=this.dateformat(this.date);
  this.cardinfoapi(strdate)
  this.cardinfoworkapi(strdate)
  this.items=this.productServiceService.getMenuItem()
  
  
  
  


      

        this.activeItem = this.items[0];
    }

// displaylogo(status:number):void{
//   const div = this.logoDiv.nativeElement as HTMLElement;
//   if(status){
//   div.style.display='block';
// }else{
//   div.style.display='none';

// }

// }

cardinfoapi(date:string):void{
  // this.displaylogo(1)
this.apiservice.getcardinfo(date).subscribe((workdata) => {
 
  console.log(workdata)
  if (workdata) {
    this.cards = workdata.location.map((data :Cardinfo ) => ({
     location:data.location,
pending:data.pending,
completed:data.completed
    }))
    // this.displaylogo(0)


  } else {
    // this.displaylogo(1)
    
    console.error(
      'Received null or undefined data from getWorkerDetails()'
    );
  }
});
}

cardinfoworkapi(date:string):void{
  this.apiservice.getcardtypelog(date).subscribe((workdata) => {
    console.log(workdata)
    if (workdata) {
       this.cardtype = workdata.type.map((data :Cardinfotype ) => ({
       type:data.type,
   pending:data.pending,
  completed:data.completed
       }))
    } else {
      console.error(
        'Received null or undefined data from getWorkerDetails()'
      );
    }
  });
  }

ngAfterViewInit() {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  new Chart(ctx, {
    type: 'doughnut',
    data:  {
      labels: [
        'completed',
        'pending',
        
      ],
      datasets: [{
        label: 'Value ',
        data: [150, 300],
        backgroundColor: [
          '#399918',
          '#ff7777',
          
        ],
        
      }]
    },
 
  });
}


}
