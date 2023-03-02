<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">ServerList</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/status/37.230.138.224:25577">Status</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/scan?addr=37.230.138.224&end=25605">Scan</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view/>
  </div>
  <footer class="footer mt-auto text-center bg-dark">
    <p class="m-0 p-0 text-muted">&copy; {{ year }} <a href="https://github.com/Pequla">Pequla</a> | Powered by <a
        href="https://getbootstrap.com/">Boostrap 5</a> &amp; <a href="https://vuejs.org/">Vue 3</a></p>
    <p class="m-0 p-0 text-muted">Source code available on <a href="https://github.com/Pequla/data-vue">GitHub</a></p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style>
p {
  color: white;
}

h3 {
  color: white;
}
</style>
