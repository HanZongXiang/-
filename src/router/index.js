import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import features from '@/views/features'

Vue.use(Router)

const components = {
  layout:() => import('@/views/Layout/index'),
  index:() => import('@/views/index/index'),
  register: () => import('@/views/register/index'),
  board:() => import('@/views/board/index'),
  music:() => import('@/views/music/index'),
  manage:() => import('@/views/manage/index'),
  backIndex:() => import('@/views/backStage/index'),
  userList:() => import('@/views/backStage/user/userList'),
  userDetails:() => import('@/views/backStage/user/userDetails'),
  addMusic:() => import('@/views/backStage/music/addMusic'),
  addJournalisms:() => import('@/views/backStage/journalism/addJournalisms'),
  order: () => import('@/views/OrderAndPay')
}

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      redirect:'/index',
      children: [
        {
          path:'index',
          name:'index',
          meta: {
            title:'首页'
          },
          component:components.index
        },
        {
          path:'register',
          name:'register',
          meta: {
            title:'新用户注册'
          },
          component: components.register
        },
        {
          path: 'board',
          name: 'board',
          meta: {
            title: '用户留言板'
          },
          component: components.board
        },
        {
          path: 'features',
          name: 'features',
          meta: {
            title: '酒吧特色'
          },
          component: features
        },
        {
          path: 'news',
          name: 'news',
          meta: {
            title: '新闻中心'
          },
          component: () => import('@/views/news/newsCenter')
        },
        {
          path: 'newsDetail/:id',
          name: 'newsDetail',
          meta: {
            title: '新闻详情'
          },
          component: () => import('@/views/news/newsDetail')
        },
        {
          path: 'music',
          name: 'music',
          meta: {
            title: '音乐专栏'
          },
          component: components.music
        },
        {
          path: 'order',
          name: 'order',
          meta: {
            title: '下单/付款'
          },
          component: components.order
        },
        {
          path: 'cart',
          name: 'cart',
          meta: {
            title: '购物车'
          },
          component: () => import('@/views/OrderAndPay/cart')
        },
        {
          path: 'forget',
          name: 'forget',
          meta: {
            title: '重置密码'
          },
          component: () => import('@/views/reset')
        },
        {
          path: '/manage',
          name: 'manage',
          meta: {
            title: '后台管理'
          },
          component: components.manage,
          redirect:'/manage/index',
          children: [
            {
              path:'index',
              name:'backIndex',
              meta: {
                title:'后台管理首页'
              },
              component:components.backIndex
            },
            {
              path: 'users',
              name: 'userList',
              meta: {
                title: '用户列表'
              },
              component: components.userList
            },
            {
              path: 'userDetails',
              name: 'userDetails',
              meta: {
                title: '用户详情'
              },
              component: components.userDetails
            },
            {
              path: 'addMusic',
              name:'addMusic',
              meta: {
                title:'添加音乐'
              },
              component:components.addMusic
            },
            {
              path: 'addJournalisms',
              name: 'addJournalisms',
              meta: {
                title: '添加新闻'
              },
              component: components.addJournalisms
            },
            {
              path: 'journalismsList',
              name: 'journalismsList',
              meta: {
                title: '新闻列表'
              },
              component: () => import('@/views/backStage/journalism/journalismsList')
            },
            {
              path: 'mesList',
              name: 'messageList',
              meta: {
                title: '留言列表'
              },
              component: () => import('@/views/backStage/message/messageList')
            },
            {
              path: 'addGoods',
              name: 'addGoods',
              meta: {
                title: '添加商品'
              },
              component: () => import('@/views/backStage/goods/addGoods')
            },
            {
              path: 'goods',
              name: 'goods',
              meta: {
                title: '商品列表'
              },
              component: () => import('@/views/backStage/goods/goodsList')
            },
          ]
        },
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('@/views/notFound/404')
    }
  ]
})

router.beforeEach((to,from,next) => {
  Nprogress.start()

  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

router.afterEach((to,from) => {
  Nprogress.done()
})

export default router