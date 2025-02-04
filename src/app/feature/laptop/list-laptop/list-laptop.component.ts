import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpRequestService } from '../../../services/http-request.service';
import { ILaptop, IGetLaptop } from '../../../shared/models/laptop.model';
import { imagePath } from 'src/app/shared/enviroment/enviroment';

@Component({
  selector: 'app-list-laptop',
  templateUrl: './list-laptop.component.html',
  styleUrls: ['./list-laptop.component.css'],
})
export class ListLaptopComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'Brand',
    'Category',
    'Name',
    'Image',
    'Status',
    'Action',
  ];
  dataSource!: MatTableDataSource<ILaptop>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data: ILaptop[] = [];
  resultsLength = 0;
  imagePath: string = imagePath;

  constructor(private httpRequestService: HttpRequestService) {}
  ngAfterViewInit() {
    this.loadData();
   
  }

  loadData() {
    this.getLaptop(
      this.sort?.active || 'created',
      this.sort?.direction || 'desc',
      this.paginator.pageIndex,
      this.paginator.pageSize
    ).subscribe((data: any) => {
      if (data) {
        this.resultsLength = data.total_count;
        this.data = data.data;
        this.dataSource = new MatTableDataSource(this.data);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getLaptop(
    sort: string,
    order: string,
    page: number,
    pageSize: number
  ): Observable<IGetLaptop | null> {
    const href = 'product/getAll';
    const requestUrl = `${href}?sort=${sort}&order=${order}&pageIndex=${
      page + 1
    }&isActive=3&pageSize=${pageSize}`;

    return this.httpRequestService.get<IGetLaptop>(requestUrl).pipe(
      catchError(() => {
        return of(null);
      })
    );
  }


  deleteIssue(issue: any) {
    console.log(issue);
  }
}
