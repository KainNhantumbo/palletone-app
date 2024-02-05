import type { Option } from '@/types';
import {
  CoffeeIcon,
  GithubIcon,
  MailCheckIcon,
  SquareStackIcon
} from 'lucide-react';
import Package from '../../package.json';

export const metadata = {
  author: Package.author.name,
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  repository: Package.repository,
  websiteName: Package.website_name,
  tags: Package.keywords.join(' '),
  websiteUrl: Package.url,
  description: Package.description,
  copyright: `${new Date().getFullYear()} ${Package.metadata.name}`,
  contacts: [
    {
      name: 'Buy me a coffee',
      icon: CoffeeIcon,
      url: Package.author.donate
    },
    {
      name: 'Github',
      icon: GithubIcon,
      url: Package.author.github
    },
    {
      name: 'Portfolio',
      icon: SquareStackIcon,
      url: Package.author.portfolio
    },
    {
      name: 'E-mail',
      icon: MailCheckIcon,
      url: `mailto:${Package.author.email}`
    }
  ]
};

export const sortOptions: Option[] = [
  { value: 'title', label: 'Title [A-Z]' },
  { value: '-title', label: 'Title [Z-A]' },
  { value: '-createdAt', label: 'Date Created' },
  { value: 'createdAt', label: 'Date Created [Inverted]' },
  { value: '-updatedAt', label: 'Date Updated' },
  { value: 'updatedAt', label: 'Date Updated [Inverted]' }
];

export const SOLID_COLORS_STORAGE_KEY = 'solids-db';

export const MIXED_GRADIENT_STORAGE_KEY = 'gradients-db';

export const HARMONY_COLOR_STORAGE_KEY = 'harmony-colors-db';

export const ALLOWED_MIMETYPES: string[] = ['image/png', 'image/jpeg', 'image/jpg'];
