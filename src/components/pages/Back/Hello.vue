<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="http://chat.vuejs.org/" target="_blank" rel="noopener">Vue Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank" rel="noopener">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <b-card title="Card Title"
              img-src="https://lorempixel.com/600/300/food/5/"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2">
        <p class="card-text">
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    <div class="row">
      <div class="col-md-5">
        <div class="block">
          <div class="block-header block-header-default">
            <h3 class="block-title">Navigation</h3>
            <div class="block-options">
              <b-dropdown id="ddown1" class="m-md-2" right no-caret variant="link">
                <template slot="button-content">
                  <i class="fa fa-fw fa-ellipsis-v"></i>
                </template>
                <b-dropdown-item><i class="fa fa-fw fa-flask mr-5"></i>Filter</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item><i class="fa fa-fw fa-cogs mr-5"></i>Manage</b-dropdown-item>
                <b-dropdown-item disabled><i class="fa fa-fw fa-cogs mr-5"></i>Manage Disabled</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
          <div class="block-content">
            <ul class="nav nav-pills flex-column push">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center justify-content-between active" href="javascript:void(0)">
                  <span><i class="fa fa-fw fa-inbox mr-5"></i> Inbox</span>
                  <span class="badge badge-pill badge-secondary">23</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center justify-content-between" href="javascript:void(0)">
                  <span><i class="fa fa-fw fa-star mr-5"></i> Starred</span>
                  <span class="badge badge-pill badge-secondary">30</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center justify-content-between" href="javascript:void(0)">
                  <span><i class="fa fa-fw fa-send mr-5"></i> Sent</span>
                  <span class="badge badge-pill badge-secondary">79</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center justify-content-between" href="javascript:void(0)">
                  <span><i class="fa fa-fw fa-pencil mr-5"></i> Draft</span>
                  <span class="badge badge-pill badge-secondary">10</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center justify-content-between" href="javascript:void(0)">
                  <span><i class="fa fa-fw fa-folder mr-5"></i> Archive</span>
                  <span class="badge badge-pill badge-secondary">99</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center justify-content-between" href="javascript:void(0)">
                  <span><i class="fa fa-fw fa-trash mr-5"></i> Trash</span>
                  <span class="badge badge-pill badge-secondary">13</span>
                </a>
              </li>
              <li class="nav-item">
                <hr class="my-5">
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0)">
                  <i class="fa fa-fw fa-plus mr-5"></i> Create label
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>
