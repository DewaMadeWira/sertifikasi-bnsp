/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CreatepdfImport } from './routes/create_pdf'
import { Route as IndexImport } from './routes/index'
import { Route as PdfIdImport } from './routes/pdf/$id'

// Create Virtual Routes

const KategoriLazyImport = createFileRoute('/kategori')()
const AboutLazyImport = createFileRoute('/about')()

// Create/Update Routes

const KategoriLazyRoute = KategoriLazyImport.update({
  id: '/kategori',
  path: '/kategori',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/kategori.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const CreatepdfRoute = CreatepdfImport.update({
  id: '/create_pdf',
  path: '/create_pdf',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PdfIdRoute = PdfIdImport.update({
  id: '/pdf/$id',
  path: '/pdf/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/create_pdf': {
      id: '/create_pdf'
      path: '/create_pdf'
      fullPath: '/create_pdf'
      preLoaderRoute: typeof CreatepdfImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/kategori': {
      id: '/kategori'
      path: '/kategori'
      fullPath: '/kategori'
      preLoaderRoute: typeof KategoriLazyImport
      parentRoute: typeof rootRoute
    }
    '/pdf/$id': {
      id: '/pdf/$id'
      path: '/pdf/$id'
      fullPath: '/pdf/$id'
      preLoaderRoute: typeof PdfIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/create_pdf': typeof CreatepdfRoute
  '/about': typeof AboutLazyRoute
  '/kategori': typeof KategoriLazyRoute
  '/pdf/$id': typeof PdfIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/create_pdf': typeof CreatepdfRoute
  '/about': typeof AboutLazyRoute
  '/kategori': typeof KategoriLazyRoute
  '/pdf/$id': typeof PdfIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/create_pdf': typeof CreatepdfRoute
  '/about': typeof AboutLazyRoute
  '/kategori': typeof KategoriLazyRoute
  '/pdf/$id': typeof PdfIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/create_pdf' | '/about' | '/kategori' | '/pdf/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/create_pdf' | '/about' | '/kategori' | '/pdf/$id'
  id: '__root__' | '/' | '/create_pdf' | '/about' | '/kategori' | '/pdf/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CreatepdfRoute: typeof CreatepdfRoute
  AboutLazyRoute: typeof AboutLazyRoute
  KategoriLazyRoute: typeof KategoriLazyRoute
  PdfIdRoute: typeof PdfIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CreatepdfRoute: CreatepdfRoute,
  AboutLazyRoute: AboutLazyRoute,
  KategoriLazyRoute: KategoriLazyRoute,
  PdfIdRoute: PdfIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/create_pdf",
        "/about",
        "/kategori",
        "/pdf/$id"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/create_pdf": {
      "filePath": "create_pdf.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/kategori": {
      "filePath": "kategori.lazy.tsx"
    },
    "/pdf/$id": {
      "filePath": "pdf/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
