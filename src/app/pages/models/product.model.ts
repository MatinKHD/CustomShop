
export class ProductModel {
  title!: string;
  id!: string;
  price!: number;
  category!: string;
  imageUrl?: string;
  file?: File;
  fileName?: string;

  constructor(file: File) {
    this.file = file
  }
}
