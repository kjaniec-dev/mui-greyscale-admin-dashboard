import type { NavItem } from './navConfig';

export const getSidebarNavigationTarget = (
    item: Pick<NavItem, 'path' | 'children'>,
    collapsed: boolean,
): string => {
    if (!collapsed || !item.children?.length) {
        return item.path;
    }

    return item.children[0]?.path ?? item.path;
};
