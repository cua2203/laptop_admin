import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { ICategory } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  displayedColumns: string[] = ['category_id', 'category_name', 'Status', 'Action'];
  dataSource!: MatTableDataSource<ICategory>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categories: ICategory[] = [];
  resultsLength =10;

  constructor(private httpRequestService: HttpRequestService) {}
  ngOnInit(): void {  
    this.getCategory();
   

  }

  getCategory(): void {
    const requestUrl = '/category/getAll'
    this.httpRequestService.get<any>(requestUrl).subscribe((data: any) => {
      this.categories = data;
      this.dataSource = new MatTableDataSource(this.categories);
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  loadData(){

  }

}
