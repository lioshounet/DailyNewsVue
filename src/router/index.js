/*
 * @author: Lan_
 * @create: 2021-06-26 13:52 PM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-06-29 19:55 PM
 * @desc:
 */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'
import Create from '@/components/content/create.vue'
import Edit from '@/components/content/edit.vue'
import TeamView from '@/components/content/team_view.vue'
import Login from '@/components/user/login.vue'
import Profile from '@/components/user/profile.vue'
import PersonalView from '@/components/content/personal_view.vue'
import BookmarksList from '@/components/bookmarks/list.vue'
import BookmarksAdd from '@/components/bookmarks/add.vue'
Vue.use(Router)
export default new Router(
  {
    base: '/blade/',
    mode: 'hash',
    routes: [
      {
        path: '/daily',
        component: Layout,
        meta: {
          isLogin: true
        },
        children: [
          {
            path: 'teamview',
            name: 'TeamView',
            meta: {
              isLogin: true
            },
            component: TeamView
          },
          {
            path: 'personalview',
            name: 'PersonalView',
            meta: {
              isLogin: true
            },
            component: PersonalView
          },
          {
            path: 'create',
            name: 'Create',
            meta: {
              isLogin: true
            },
            component: Create
          },
          {
            path: 'edit',
            name: 'Edit',
            meta: {
              isLogin: true
            },
            component: Edit
          },
          {
            path: 'profile',
            name: 'Profile',
            meta: {
              isLogin: true
            },
            component: Profile
          }
        ]
      },
      {
        path: '/bookmarks',
        component: Layout,
        meta: {
          isLogin: true
        }, children: [
          {
            path: 'list',
            name: 'List',
            meta: {
              isLogin: true
            },
            component: BookmarksList
          },
          {
            path: 'add',
            name: 'Add',
            meta: {
              isLogin: true
            },
            component: BookmarksAdd
          },
        ]
      },
      {
        path: '/login',
        component: Login,
        name: "Login"
      },
      {
        path: '*',
        redirect: '/daily/personalview',
        hidden: true
      },
    ]
  }
)
