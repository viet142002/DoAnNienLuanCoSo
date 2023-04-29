import { Home, Profile, Message } from '../Pages';

const routes = [
  {
    path: '/',
    component: Home,
    layout: 'DefaultLayout',
  },
  {
    path: '/profile/:id',
    component: Profile,
    layout: 'DefaultLayout',
  },
  {
    path: '/message/:id',
    component: Message,
    layout: 'DefaultLayout',
  },
];

export { routes };
