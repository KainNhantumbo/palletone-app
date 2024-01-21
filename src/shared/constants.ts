import { Option } from '@/types';
import Package from '../../package.json';
import { GithubIcon, MailCheckIcon, SquareStackIcon } from 'lucide-react';

export const metadata = {
  author: Package.author,
  appName: Package.metadata.name,
  version: Package.version,
  license: Package.license,
  repository: Package.repository,
  websiteName: Package.website_name,
  tags: Package.keywords.join(' '),
  websiteUrl: Package.url,
  description: '',
  copyright: `${new Date().getFullYear()} ${Package.metadata.name}`,
  contacts: [
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
      url: Package.author.email
    }
  ]
};

export const nav_anchors = [
  { name: 'Overview', url: '/', alias: 'overview' },
  { name: 'Features', url: '#features', alias: 'features' }
];

export const anchors = [
  { name: 'Donate', anchor: metadata.author.donate },
  { name: 'Github', anchor: metadata.repository },
  { name: 'Portfolio', anchor: metadata.author.portfolio }
].sort((a, b) => (a.name > b.name ? 1 : -1));

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

export const COMPLEMENT_COLOR_STORAGE_KEY = 'complement-colors-db';

export const TRIADIC_COLOR_STORAGE_KEY = 'triadic-colors-db';

export const TETRADIC_COLOR_STORAGE_KEY = 'tetradic-colors-db';

export const ANALOGOUS_COLOR_STORAGE_KEY = 'analogous-colors-db';

export const SPLIT_COMPLEMENT_COLOR_STORAGE_KEY = 'split-complement-colors-db';

export const ALLOWED_MIMETYPES: string[] = [
  'image/png',
  'image/jpeg',
  'image/jpg'
];

