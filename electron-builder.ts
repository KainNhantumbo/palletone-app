import { Configuration } from 'electron-builder';
import path from 'path';
import pkg from './package.json';

const electronBuilderConfig: Configuration = {
  appId: 'com.palletone.app',
  asar: { smartUnpack: true },
  productName: pkg.productName,
  icon: 'public/icon-512x512.png',
  directories: {
    output: 'dist',
    buildResources: 'build',
    app: process.cwd()
  },
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintcache,eslint.config.mjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}'
  ],
  asarUnpack: ['resources/**'],
  npmRebuild: true,
  executableName: pkg.productName,
  copyright: pkg.metadata.copyright_notice,

  // ---------------- Windows ----------------
  win: {
    executableName: pkg.productName,
    target: 'nsis',
    icon: 'public/icon-512x512.png'
  },
  nsis: {
    artifactName: '${name}-${version}-setup.${ext}',
    shortcutName: '${productName}',
    uninstallDisplayName: '${productName}',
    createDesktopShortcut: true
  },

  // ---------------- macOS ----------------
  mac: {
    category: 'public.app-category.utilities',
    entitlementsInherit: path.join('build', 'entitlements.mac.plist'),
    extendInfo: {
      NSCameraUsageDescription: "Application requests access to the device's camera.",
      NSMicrophoneUsageDescription:
        "Application requests access to the device's microphone.",
      NSDocumentsFolderUsageDescription:
        "Application requests access to the user's Documents folder.",
      NSDownloadsFolderUsageDescription:
        "Application requests access to the user's Downloads folder."
    },
    notarize: false,
    icon: 'public/icon-512x512.png'
  },
  dmg: {
    artifactName: '${name}-${version}.${ext}'
  },

  // ---------------- Linux ----------------
  linux: {
    appId: 'com.palletone.app',
    icon: 'public/icon-512x512.png',
    category: 'Utility',
    compression: null,
    publish: undefined,
    maintainer: 'Ubelloch <nhantumbok@gmail.com>',
    vendor: 'Ubelloch <nhantumbok@gmail.com>',
    asar: true,
    description: pkg.description,
    packageCategory: 'Utility',
    target: ['rpm', 'deb', 'AppImage'],
    defaultArch: 'x64'
  },
  rpm: {
    category: 'Utility',
    icon: 'public/icon-512x512.png',
    packageName: pkg.productName,
    description: pkg.description,
    compression: 'xz',
    packageCategory: 'Utility',
    publish: undefined,
    fpm: ['--rpm-compression', 'gzip'],
    artifactName: '${name}-${version}.${ext}'
  },
  deb: {
    category: 'Utility',
    packageCategory: 'Utility',
    icon: 'public/icon-512x512.png',
    packageName: pkg.productName,
    description: pkg.description,
    compression: null
  },
  appImage: {
    category: 'Utility',
    description: pkg.description
  },
  apk: {
    category: 'Utility',
    icon: 'public/icon-512x512.png',
    description: pkg.description,
    packageName: pkg.productName
  }
};

export default electronBuilderConfig;
