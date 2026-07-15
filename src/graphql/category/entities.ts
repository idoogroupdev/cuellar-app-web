export interface CategoryNode {
  id: string;
  name: string;
  isActive: boolean;
  sortOrder: number;
  parentId?: string;
  subcategories: CategoryNode[];
}
