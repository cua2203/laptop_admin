import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpRequestService} from "../../../services/http-request.service";
import {ToastrService} from "ngx-toastr";
import {IBrand} from "../../../shared/models/brand.model";
import {ICategory} from "../../../shared/models/category.model";


@Component({
  selector: 'app-add-laptop',
  templateUrl: './add-laptop.component.html',
  styleUrls: ['./add-laptop.component.css']
})
export class AddLaptopComponent implements OnInit {

  form!: FormGroup;
  brands: IBrand[] = [];
  categories: ICategory[] = [];
  fileName: string = '';
  file!: File;

  constructor(private fb: FormBuilder, private httpRequestService: HttpRequestService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
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

    });

    this.getBrand();
    this.getCategory();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
    let formData = new FormData();
    formData.append('image', this.file);
    this.httpRequestService.post<any>('upload/cloudinary', formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.httpRequestService.post<any>('product/add', this.form.value).subscribe({
            next: (data: any) => {
                this.toastr.success("Thêm mới thành công")
            },
            error: (err: any) => {
                this.toastr.error("Thất bại");
            },
          }
        )
      },
      error: (error) => {
        console.log(error);
        this.toastr.error("Upload thất bại");
      }
    })

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
      this.form.patchValue({image: this.file.name});

    }
  }


}
