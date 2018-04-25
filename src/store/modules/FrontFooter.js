const state = {
  authorName: 'Hive',
  authorUrl: 'https://github.com/hive-apps',
  companyAddress: '81/268 Chiang Rak, Khlong Nueng<br>Khlong Luang, PathumThani 12120<br><abbr title="Phone"><i class="fa fa-phone"></i>:</abbr> +66 92 589 8870',
  companyName: 'Hive',
  display: true,
  name: 'Hive',
  navigation: false,
  navigationLeft: [
    {
      name: 'Hive',
      children: [
        {
          name: 'link #1',
          link: 'javascript:void(0)'
        },
        {
          name: 'link #2',
          link: 'javascript:void(0)'
        },
        {
          name: 'link #3',
          link: 'javascript:void(0)'
        }
      ]
    },
    {
      name: 'Open Source Licences',
      children: [
        {
          name: 'link #1',
          link: 'javascript:void(0)'
        },
        {
          name: 'link #2',
          link: 'javascript:void(0)'
        }
      ]
    }
  ],
  navigationRight: [
    {
      name: 'Development',
      children: [
        {
          name: 'link #1',
          link: 'javascript:void(0)'
        },
        {
          name: 'link #2',
          link: 'javascript:void(0)'
        },
        {
          name: 'link #3',
          link: 'javascript:void(0)'
        },
        {
          name: 'link #4',
          link: 'javascript:void(0)'
        }
      ]
    }
  ]
}

const getters = {
  getFrontAuthorName (state) {
    return state.authorName
  },
  getFrontAuthorUrl (state) {
    return state.authorUrl
  },
  getFrontCompanyAddress (state) {
    return state.companyAddress
  },
  getFrontCompanyName (state) {
    return state.companyName
  },
  getFrontFooterDisplay (state) {
    return state.display
  },
  getFrontFooterName (state) {
    return state.name
  },
  getFrontFooterNavigation (state) {
    return state.navigation
  },
  getFrontFooterNavigationLeft (state) {
    return state.navigationLeft
  },
  getFrontFooterNavigationRight (state) {
    return state.navigationRight
  }
}

const mutations = {}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
