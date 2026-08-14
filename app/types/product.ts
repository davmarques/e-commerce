export interface Product {
    id: string;
    name: string;
    price: number;
    category: {
        id: string;
        name: string;
        slug: string;
        tenantId?: string;
        createdAt?: string;
    } | string | undefined;
    slug: string;
    image: string; // Imagem principal
    images?: string[]; // Galeria
    description?: string;
    isFeatured?: boolean;
    variants?: {
        label: string;
        options: string[];
    };
    details?: string[];
}

export function getCategoryName(category: Product['category']) {
    if (!category) return 'Sem categoria';
    if (typeof category === 'string') return category;
    return category.name || 'Sem categoria';
}

function normalizeImages(images: unknown): string[] {
    if (Array.isArray(images)) {
        return images.flatMap((image) => {
            if (typeof image === 'string') return [image];
            if (image && typeof image === 'object' && 'url' in image && typeof (image as { url?: unknown }).url === 'string') {
                return [(image as { url: string }).url];
            }
            return [];
        });
    }

    if (typeof images === 'string') return [images];
    return [];
}

function normalizeVariants(variants: unknown) {
    if (Array.isArray(variants)) {
        const options = variants
            .map((variant) => {
                if (variant && typeof variant === 'object') {
                    const candidate = variant as { size?: string | null; color?: string | null; sku?: string | null };
                    return candidate.size || candidate.color || candidate.sku || '';
                }
                return '';
            })
            .filter(Boolean);

        return { label: 'Tamanho', options };
    }

    if (variants && typeof variants === 'object' && 'options' in variants) {
        const obj = variants as { label?: string; options?: string[] };
        return {
            label: obj.label || 'Tamanho',
            options: Array.isArray(obj.options) ? obj.options : [],
        };
    }

    return { label: 'Tamanho', options: [] };
}

export function normalizeProduct(product: any): Product {
    const images = normalizeImages(product?.images || product?.image);

    return {
        id: product?.id || product?.slug || `${product?.name}-${Math.random()}`,
        name: product?.name || 'Produto sem nome',
        price: Number(product?.price || 0),
        category: product?.category
            ? (typeof product.category === 'string'
                ? product.category
                : {
                    id: product.category.id,
                    name: product.category.name,
                    slug: product.category.slug,
                    tenantId: product.category.tenantId,
                    createdAt: product.category.createdAt,
                })
            : undefined,
        slug: product?.slug || '',
        image: images[0] || '/products/tshirt.jpg',
        images,
        description: product?.description || '',
        isFeatured: Boolean(product?.isFeatured),
        variants: normalizeVariants(product?.variants),
        details: Array.isArray(product?.details) ? product.details : [],
    };
}

export function normalizeProducts(products: any[]): Product[] {
    return products.map(normalizeProduct);
}