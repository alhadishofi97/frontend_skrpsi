import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, pages, utilities, other]
};

// const allowedMenus = ['dashboard', 'default', 'pages', 'authentication', 'register3'];
// localStorage.setItem('menu-items', JSON.stringify(allowedMenus));

const storedAllowedMenus = localStorage.getItem('menu-items');
let allowedMenus = [];
if (storedAllowedMenus && storedAllowedMenus.length > 2) {
  allowedMenus = storedAllowedMenus;
} else {
  // Jika localStorage kosong, gunakan default atau tampilkan pesan kesalahan
  allowedMenus = ['utilities']; // Default value
}

function filterMenuRecursive(menu, allowedIds) {
  // Base case: jika menu tidak memiliki children, kembalikan menu kosong
  if (!menu || !menu.items) return { items: [] };

  // Iterasi melalui setiap item dalam menu
  return {
    items: menu.items
      .map((item) => {
        // Jika item ada dalam allowedIds, sertakan item tersebut
        if (allowedIds.includes(item.id)) {
          // Jika item memiliki children, lakukan filtering rekursif pada children
          if (item.children) {
            const filteredChildren = filterMenuRecursive({ items: item.children }, allowedIds);
            // Hanya sertakan item jika ada children yang lolos filter
            if (filteredChildren.items.length > 0) {
              return { ...item, children: filteredChildren.items };
            }
          }
          return { ...item }; // Sertakan item jika tidak ada children
        } else if (item.children) {
          // Jika item tidak diizinkan, cek apakah ada children yang diizinkan
          const filteredChildren = filterMenuRecursive({ items: item.children }, allowedIds);
          // Sertakan item hanya jika ada children yang diizinkan
          if (filteredChildren.items.length > 0) {
            return { ...item, children: filteredChildren.items };
          }
        }
        return null; // Hapus item yang tidak ada di allowedIds
      })
      .filter(Boolean) // Hapus null dari hasil
  };
}

const filteredMenu = filterMenuRecursive(menuItems, allowedMenus);
console.log(filteredMenu, 'filteredMenu');

console.log(menuItems, 'menuItems');
export { menuItems };
export default filteredMenu;
