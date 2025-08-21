import z from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  inStock: z.number().min(1, 'Quantity must be greater than 0'),
  discountPrice: z.number().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

/* 
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  images?: string[];
  category: {
    _id: string;
    name: string;
  };
  brand: string;
  ratings: {
    average: number;
    count: number;
  };
  description: string;
  sales?: number;
  features: string[];
  inStock: number;
  tag?: string;
  attributes?: {
    colors: string[];
    size?: string[];
  };
*/
