import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/products',
    component: Layout,
    // redirect: '/products/agency',
    alwaysShow: true, // will always show the root menu
    name: 'products',
    meta: {
      title: '订单',
      icon: 'clipboard'
    },
    children: [
      {
        path: 'proList',
        name: 'productList',
        component: () => import('@/views/chunyi/product/product-list'),
        meta: { title: '订单录入' }
      },
      {
        path: 'proEntry',
        name: 'productEntry',
        component: () => import('@/views/chunyi/product/product-entry'),
        meta: { title: '订单出库' }
      },
      {
        path: 'proSurplus',
        name: 'productSurplus',
        component: () => import('@/views/chunyi/product/product-surplus'),
        meta: { title: '订单剩余' }
      }
    ]
  },
  {
    path: '/material',
    component: Layout,
    redirect: '/material/library',
    alwaysShow: true, // will always show the root menu
    name: 'material',
    meta: {
      title: '材料库',
      icon: 'component',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'dictionaries',
        component: () => import('@/views/chunyi/material/dictionaries'),
        name: 'materialDictionaries',
        meta: {
          title: '材料字典',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'supplier',
        component: () => import('@/views/chunyi/material/supplier'),
        name: 'supplier',
        meta: {
          title: '供应商'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'apply',
        component: () => import('@/views/chunyi/material/apply'),
        name: 'apply',
        meta: {
          title: '材料申请',
          roles: ['admin']
        }
      },
      {
        path: 'auditRecord',
        component: () => import('@/views/chunyi/material/audit-record'),
        name: 'auditRecord',
        meta: {
          title: '审核记录',
          roles: ['admin']
        }
      },
    ]
  },
  {
    path: '/materialExamine',
    component: Layout,
    redirect: '/material/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/chunyi/material/examine'),
        name: 'materialExamine',
        meta: {
          title: '材料审核',
          icon: 'edit',
          roles: ['admin', 'editor']
        },
      },
    ]
  },
  {
    path: '/materialGem',
    component: Layout,
    redirect: '/materialGem/library',
    alwaysShow: true, // will always show the root menu
    name: 'materialGem',
    meta: {
      title: '材料相关',
      icon: 'component',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'library',
        component: () => import('@/views/chunyi/material/material-entry'),
        name: 'materialLibrary',
        meta: {
          title: '材料入库',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'list',
        component: () => import('@/views/chunyi/material/material-list'),
        name: 'materialList',
        meta: {
          title: '材料清单',
          roles: ['admin']
        }
      },
      {
        path: 'consume',
        component: () => import('@/views/chunyi/material/metarial-consume'),
        name: 'materialConsume',
        meta: {
          title: '材料消耗'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'consumeSys',
        component: () => import('@/views/chunyi/material/consume-system'),
        name: 'consumeSystem',
        meta: {
          title: '消耗系统图',
          roles: ['admin']
        }
      },
    ]
  },
  // {
  //   path: '/products',
  //   component: Layout,
  //   // redirect: '/products/agency',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'products',
  //   meta: {
  //     title: '生产计划',
  //     icon: 'clipboard'
  //   },
  //   children: [
  //     {
  //       path: 'proMaterial',
  //       component: () => import('@/views/chunyi/product/product-material'), // Parent router-view
  //       name: 'proMaterial',
  //       meta: { title: '材料' },
  //       redirect: '/products/proMaterial/mateReceive',
  //       children: [
  //         {
  //           path: 'mateReceive',
  //           component: () => import('@/views/chunyi/product/product-material/material-receive'),
  //           name: 'mateReceive',
  //           meta: { title: '材料领取' }
  //         },
  //         {
  //           path: 'proProgress',
  //           component: () => import('@/views/chunyi/product/product-material/production-progress'),
  //           name: 'proProgress',
  //           meta: { title: '生产进度' },
  //         },
  //       ]
  //     },
  //     {
  //       path: 'proList',
  //       name: 'productList',
  //       component: () => import('@/views/chunyi/product/product-list'),
  //       meta: { title: '生产订单' }
  //     },
  //     {
  //       path: 'proEntry',
  //       name: 'productEntry',
  //       component: () => import('@/views/chunyi/product/product-entry'),
  //       meta: { title: '产品出库' }
  //     }
  //   ]
  // },
  // {
  //   path: '/purchasing',
  //   component: Layout,
  //   redirect: '/purchasing/agency',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'purchasing',
  //   meta: {
  //     title: '采购',
  //     icon: 'table',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'agency',
  //       component: () => import('@/views/chunyi/purchasing-process/agency-process'),
  //       name: 'purAgency',
  //       meta: {
  //         title: '采购代办流程',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       },
  //     },
  //     {
  //       path: 'purProcess',
  //       component: () => import('@/views/chunyi/purchasing-process/purchase-process'),
  //       name: 'purProcess',
  //       meta: {
  //         title: '采购流程',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       },
  //     },
  //   ]
  // },
  // {
  //   path: '/production',
  //   component: Layout,
  //   redirect: '/production/matAgency',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'production',
  //   meta: {
  //     title: '生产材料领取',
  //     icon: 'shopping',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'matAgency',
  //       component: () => import('@/views/chunyi/production-material/material-agency'),
  //       name: 'materialAgency',
  //       meta: {
  //         title: '材料领取代办',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       },
  //       children: [
  //         {
  //           path: 'page',
  //           component: () => import('@/views/chunyi/purchasing-process/agency-process'),
  //           name: 'PagePermission',
  //           meta: {
  //             title: '材料领取流程',
  //             roles: ['admin'] // or you can only set roles in sub nav
  //           }
  //         },
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: '/libWarn',
  //   component: Layout,
  //   redirect: '/libWarn/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/chunyi/material/library-warning'),
  //       name: 'libWarning',
  //       meta: { title: '库存预警', icon: 'bug' }
  //     }
  //   ]
  // },
  // {
  //   path: '/supplier',
  //   component: Layout,
  //   redirect: '/supplier/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/chunyi/supplier'),
  //       name: 'libWarning',
  //       meta: { title: '供应商信息维护', icon: 'peoples' }
  //     }
  //   ]
  // },
  {
    path: '/systemcheck',
    component: Layout,
    redirect: '/systemcheck/page',
    alwaysShow: true, // will always show the root menu
    name: 'systemcheck',
    meta: {
      title: '系统检测',
      icon: 'search',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'adminLogin',
        component: () => import('@/views/chunyi/system-check/admin-login-check'),
        name: 'adminLogin',
        meta: {
          title: '登录监测',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'operation',
        component: () => import('@/views/chunyi/system-check/operation-check'),
        name: 'operationCheck',
        meta: {
          title: '请求监测',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/systemconfig',
    component: Layout,
    redirect: '/systemconfig/permission',
    alwaysShow: true, // will always show the root menu
    name: 'systemconfig',
    meta: {
      title: '系统配置',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'userMana',
        component: () => import('@/views/chunyi/system-config/user-manager'),
        name: 'userMana',
        meta: {
          title: '用户管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'permission',
        component: () => import('@/views/chunyi/system-config/rights-manager'),
        name: 'permissionMan',
        meta: {
          title: '权限管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: '权限管理',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  //
  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  //
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
