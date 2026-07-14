export interface CategoryNode {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
  subcategories: CategoryNode[];
}
