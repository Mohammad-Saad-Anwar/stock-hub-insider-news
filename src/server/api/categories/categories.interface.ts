
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryCreate {
  name: string;
  description?: string;
}

export interface ICategoryUpdate {
  name?: string;
  description?: string;
}
