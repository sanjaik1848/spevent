
import data from './menu-data.json';

export type MenuItem = {
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type MenuData = {
    starters: MenuItem[];
    mainCourses: MenuItem[];
    desserts: MenuItem[];
    veg: MenuItem[];
    organic: MenuItem[];
}

export const menuData: MenuData = data;
