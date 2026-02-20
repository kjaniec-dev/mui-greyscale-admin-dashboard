export interface Taxonomy {
    id: string;
    name: string;
    slug: string;
    count: number;
    description: string;
}

export const mockCategories: Taxonomy[] = [
    { id: 'cat-1', name: 'Technology', slug: 'technology', count: 42, description: 'Latest news and trends in tech.' },
    { id: 'cat-2', name: 'Business', slug: 'business', count: 28, description: 'Business strategy and market analysis.' },
    { id: 'cat-3', name: 'Design', slug: 'design', count: 15, description: 'UX/UI design and creative inspiration.' },
    { id: 'cat-4', name: 'Marketing', slug: 'marketing', count: 34, description: 'Digital marketing and SEO tips.' },
    { id: 'cat-5', name: 'Development', slug: 'development', count: 56, description: 'Software engineering and programming tutorials.' },
];

export const mockTags: Taxonomy[] = [
    { id: 'tag-1', name: 'React', slug: 'react', count: 24, description: 'React library and ecosystem.' },
    { id: 'tag-2', name: 'TypeScript', slug: 'typescript', count: 18, description: 'TypeScript language features.' },
    { id: 'tag-3', name: 'Vite', slug: 'vite', count: 9, description: 'Vite build tool.' },
    { id: 'tag-4', name: 'Design System', slug: 'design-system', count: 12, description: 'Design systems and UI kits.' },
    { id: 'tag-5', name: 'SaaS', slug: 'saas', count: 31, description: 'Software as a Service products.' },
    { id: 'tag-6', name: 'B2B', slug: 'b2b', count: 14, description: 'Business to Business.' },
    { id: 'tag-7', name: 'Web', slug: 'web', count: 67, description: 'General web development.' },
];
