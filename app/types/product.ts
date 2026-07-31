export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    slug: string;
    image: string; // Imagem principal
    images?: string[]; // Galeria
    description?: string;
    variants?: {
        label: string;
        options: string[];
    };
    details?: string[];
}