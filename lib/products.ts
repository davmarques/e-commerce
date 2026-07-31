import { Product } from "@/app/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Classic White",
    price: 89.90,
    category: "Roupas",
    slug: "camiseta-classic-white",
    description: "Uma camiseta essencial de algodão premium com corte moderno.",
    image: "/products/tshirt.jpg",
    images: ["/products/tshirt.jpg", "/products/tshirt-back.jpg"],
    variants: {
      label: "Tamanho",
      options: ["P", "M", "G", "GG"]
    },
    details: ["100% Algodão Premium", "Costura reforçada", "Lavável à máquina"]
  },
  {
    id: "2",
    name: "Calça Jeans Slim",
    price: 199.00,
    category: "Roupas",
    slug: "calca-jeans-slim",
    description: "Jeans com elastano para máximo conforto e durabilidade.",
    image: "/products/jeans.jpg",
    images: ["/products/jeans.jpg"],
    variants: {
      label: "Tamanho",
      options: ["38", "40", "42", "44"]
    },
    details: ["Denim de alta qualidade", "Modelagem slim fit"]
  }
  // Adicione mais produtos conforme sua necessidade...
];