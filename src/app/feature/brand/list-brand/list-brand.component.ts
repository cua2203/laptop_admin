import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBrand } from 'src/app/shared/models/brand.model';
import { HttpRequestService } from '../../../services/http-request.service';
import { imagePath } from 'src/app/shared/enviroment/enviroment';

@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.css'],
})
export class ListBrandComponent implements OnInit {
  displayedColumns: string[] = ['brand_id', 'brand_name', 'Image', 'Status', 'Action'];
  dataSource!: MatTableDataSource<IBrand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  brands: IBrand[] = [];
  resultsLength =10;
  imagePath: string = imagePath;

  constructor(private httpRequestService: HttpRequestService) {}
  ngOnInit(): void {
    this.getBrand();
  }

  loadData(): void {

  }

  getBrand() {
    const requestUrl = '/brand/getAll';
    this.httpRequestService.get<any>(requestUrl).subscribe((data: any) => {
      this.brands = data;
      console.log(this.brands);
      this.dataSource = new MatTableDataSource(this.brands);
      this.resultsLength = data.length;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
