export const dashboardItem = {
  key: 'dashboard',
  link: '/api/doc/dashboard',
  icon: `
      <svg
                  xmlns='http://www.w3.org/2000/svg'
                   width='1em'
                   height='1em'
                   viewBox='0 0 24 24'
                 ><g fill='none' stroke='currentColor'><rect
                       width='18.5'
                       height='18.5'
                       x='2.75'
                       y='2.75'
                       stroke-width='1.5'
                       rx='6'
                     /><path
                       stroke-linecap='round'
                       stroke-width='1.6'
                       d='M7.672 16.222v-5.099m4.451 5.099V7.778m4.205 8.444V9.82'
                     /></g></svg>
    `,
  label: 'Dashboard',
  target: '',
};

export const shopItem = {
  key: 'shop',
  link: '/api/doc/shop',
  icon: `
      <svg
                   xmlns='http://www.w3.org/2000/svg'
                   width='1em'
                   height='1em'
                   viewBox='0 0 24 24'
                 ><path
                     fill='none'
                     stroke='currentColor'
                     stroke-linecap='round'
                     stroke-linejoin='round'
                     stroke-width='1.5'
                     d='m19.26 9.696l1.385 9A2 2 0 0 1 18.67 21H5.33a2 2 0 0 1-1.977-2.304l1.385-9A2 2 0 0 1 6.716 8h10.568a2 2 0 0 1 1.977 1.696M14 5a2 2 0 1 0-4 0'
                   /></svg>
    `,
  label: 'Shop',
  target: '',
};

export const allItems = [dashboardItem, shopItem];
