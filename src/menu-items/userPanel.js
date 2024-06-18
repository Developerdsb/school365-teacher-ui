// assets
import { IconHome, IconPhoto, IconTemplate, IconAlbum, IconSettings, IconPhotoPlus, IconSchool } from '@tabler/icons';

const icons = { IconPhoto, IconTemplate, IconHome, IconAlbum, IconSettings, IconPhotoPlus, IconSchool };
const userPanel = {
  id: 'userPanel',
  // title: 'User Panel',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard ',
      type: 'item',
      url: '/',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    /*   {
      id: 'teachers',
      title: 'Teacher ',
      type: 'item',
      url: '/',
      icon: icons.IconHome,
      breadcrumbs: false
    }, */
    {
      id: 'students',
      title: 'Students',
      type: 'item',
      url: '/students',
      icon: icons.IconSchool,
      breadcrumbs: false
    },
    {
      id: 'Gallery',
      title: 'Gallery ',
      type: 'item',
      url: '/gallery',
      icon: icons.IconPhoto,
      breadcrumbs: false
    },
    {
      id: 'templates',
      title: 'Templates ',
      type: 'item',
      url: '/templates',
      icon: icons.IconTemplate,
      breadcrumbs: false
    },
    {
      id: 'template',
      title: 'Create YearBook ',
      type: 'item',
      url: '/createyearbook',
      icon: icons.IconAlbum,
      breadcrumbs: false
    }
  ]
};

export default userPanel;
