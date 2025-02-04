import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IBrand} from "../../../shared/models/brand.model";
import {ICategory} from "../../../shared/models/category.model";
import {HttpRequestService} from "../../../services/http-request.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ILaptop} from "../../../shared/models/laptop.model";

@Component({
  selector: 'app-edit-laptop',
  templateUrl: './edit-laptop.component.html',
  styleUrls: ['./edit-laptop.component.css']
})

export class EditLaptopComponent implements OnInit {

  form!: FormGroup;
  brands: IBrand[] = [];
  categories: ICategory[] = [];
  fileName: string = '';
  file!: File;
  laptopId: number | null = null;
  laptopData!: ILaptop;

  constructor(private fb: FormBuilder, private httpRequestService: HttpRequestService, private toastr: ToastrService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.laptopId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.laptopId) {
      console.log(this.laptopId);
      this.getLaptopData(this.laptopId);
    }

    this.form = this.fb.group({
      laptop_name: ['', Validators.required],
      brand_id: ['', Validators.required],
      category_id: ['', Validators.required],
      image: ['', Validators.required],
      status: [true,],
      ram: ['', Validators.required],
      storage: ['', Validators.required],
      pin: ['3 cells 72wh ', Validators.required],
      cpu: ['', Validators.required],
      id: ['', Validators.required],
    });

    this.getBrand();
    this.getCategory();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.info("Chưa nhập đủ thông tin");
      return;
    }
    if(this.form.get('image')?.value === this.laptopData.image){
      this.updateLaptop()
      return;

    }

    let formData = new FormData();
    formData.append('image', this.file);
    this.httpRequestService.post<any>('upload/cloudinary', formData).subscribe({
      next: (data: any) => {
        this.updateLaptop()
      },
      error: (error) => {
        console.log(error);
        this.toastr.error("Upload thất bại");
      }
    })
  }

  updateLaptop(){
    this.httpRequestService.put<any>('product/update', this.form.value).subscribe({
        next: (data: any) => {
          this.toastr.success("Cập nhật thành công")
        },
        error: (err: any) => {
          this.toastr.error("Thất bại");
        },
      }
    )
  }



  getBrand(): void {
    const requestUrl = '/brand/getAll'
    this.httpRequestService.get<any>(requestUrl).subscribe((data: any) => {
      this.brands = data;
    })
  }

  getCategory(): void {
    const requestUrl = '/category/getAll'
    this.httpRequestService.get<any>(requestUrl).subscribe((data: any) => {
      this.categories = data;
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;
      this.form.get('image')?.setValue(this.file.name);

    }
  }

  getLaptopData(id: number|null|string) {
    this.httpRequestService.get<ILaptop>(`product/getById/${id}`).subscribe({
      next: (data) => {
        this.laptopData = data;
        this.form.patchValue(data);
        // Populate form with laptopData if you have a form
      },
      error: (error) => console.error('Failed to fetch laptop data', error),
    });
  }


}

