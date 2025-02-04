import {Component, OnInit} from '@angular/core';
import {ChartConfiguration, ChartData, ChartOptions, ChartType} from "chart.js";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpRequestService} from "../../services/http-request.service";
import {format} from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalOrder: number = 0;
  sales: number = 0;

  // Biểu đồ thanh (bar chart)
  public barChartType: 'bar' = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {data: [], label: 'Top Laptop Sales'}
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: {beginAtZero: true}
    }
  };

  // Biểu đồ quạt (pie chart)
  public pieChartType: 'pie' = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',

        ],
        borderWidth: 1
      }
    ]
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {position: 'top'}
    }
  };

  range = new FormGroup({
    start: new FormControl<Date | null>(new Date(2024, 4, 1)),
    end: new FormControl<Date | null>(new Date()),
  });

  constructor(private httpRequestService: HttpRequestService) {
  }

  ngOnInit(): void {
    const startDate = this.range.get('start')?.value || new Date(2024, 4, 1);
    const endDate = this.range.get('end')?.value || new Date();
    this.loadData(format(startDate, 'yyyy/MM/dd'), format(endDate, 'yyyy/MM/dd'))

    this.range.valueChanges.subscribe(value => {
      const start = value.start;
      const end = value.end;

      // Only make API calls if both start and end dates are selected
      if (start && end) {
        const formattedStartDate = format(start, 'yyyy/MM/dd');
        const formattedEndDate = format(end, 'yyyy/MM/dd');
        this.loadData(formattedStartDate, formattedEndDate);

      }
    });
  }

  loadData(startDate: string, endDate: string): void {
    this.getTotalOrder(startDate, endDate);
    this.getTotalPrice(startDate, endDate);
    this.getListProductSaled(startDate, endDate);
    this.getDistinctOrderStatus(startDate, endDate);
  }

  getTotalOrder(fromDate: string, toDate: string): void {
    this.httpRequestService.post<any>('order/count', {fromDate, toDate}).subscribe(data => {
      this.totalOrder = data.data.count;
    });
  }

  getTotalPrice(fromDate: string, toDate: string): void {
    this.httpRequestService.post<any>('order/total', {fromDate, toDate}).subscribe(data => {
      this.sales = data.data[0].total;
    });
  }

  getListProductSaled(fromDate: string, toDate: string): void {
    this.httpRequestService.post<any>('order/countProductSaled', {fromDate, toDate}).subscribe(data => {
      const result: any[] = data.data;
      this.barChartData = {  // Cập nhật lại barChartData
        ...this.barChartData,
        labels: result.map(item => item.laptop_name.slice(0,20)),
        datasets: [
          {
            ...this.barChartData.datasets[0],
            data: result.map(item => item.count)
          }
        ]
      };
    });
  }

  getDistinctOrderStatus(fromDate: string, toDate: string): void {
    this.httpRequestService.post<any>('order/getDistinctOrderStatus', {fromDate, toDate}).subscribe(data => {
      const result: any[] = data.data;
      this.pieChartData = {  // Cập nhật lại pieChartData
        ...this.pieChartData,
        labels: result.map(item => item.status),
        datasets: [
          {
            ...this.pieChartData.datasets[0],
            data: result.map(item => item.count)
          }
        ]
      };
    });
  }

}
