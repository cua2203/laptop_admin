export interface ILaptop {
  id:string;
  brand_name: string;
  category_name: string;
  laptop_name: string;
  image: string;
  status: number;
}

export interface IGetLaptop {
  data:ILaptop[];
  totalPage: number;
  total_count: number;
}
