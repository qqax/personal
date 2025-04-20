export const MenuTitles = ['biography', 'concerts', 'records', 'contacts'] as const;
export type MenuTitle = typeof MenuTitles[number];
export type PathsType = Record<MenuTitle, string>;
export const paths = MenuTitles.reduce((acc: PathsType, p, i) => {
    if (i === 0) {
        acc[p] = '/';
    } else {
        acc[p] = '/' + p;
    }

    return acc;
}, {} as PathsType);
export const menuItems = Object.entries(paths).map(([name, href]) => {
    return { name, href };
});