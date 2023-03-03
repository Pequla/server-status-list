<template>
  <div class="servers">
    <div v-if="servers && servers.length >0">
      <table class="table table-dark table-striped">
        <thead>
        <tr>
          <th scope="col">ICON</th>
          <th scope="col">ADDRESS</th>
          <th scope="col">ONLINE</th>
          <th scope="col">MAX</th>
          <th scope="col">VERSION</th>
          <th scope="col">MOTD</th>
          <th scope="col">ACTION</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="server in servers">
          <th scope="row">
            <ServerIcon :icon="server.favicon"/>
          </th>
          <td>
            <router-link :to="'/status/'+server.address">{{ server.address }}</router-link>
          </td>
          <td colspan="4" v-if="server.offline">SERVER OFFLINE, OR PING IS DISABLED IN PROPERTIES</td>
          <td v-if="!server.offline">{{ server.players.online }}</td>
          <td v-if="!server.offline">{{ server.players.max }}</td>
          <td v-if="!server.offline">{{ server.version.name }}</td>
          <td v-if="!server.offline">{{ server.description.text }}</td>
          <td>
            <button class="btn btn-danger" type="button" v-on:click="removeToFavourites(server.address)"
                    v-if="isSaved(server.address)">Remove
            </button>
            <button class="btn btn-success" type="button" v-on:click="addToFavourites(server.address)" v-else>Save
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="mx-auto text-center">
      <img src="@/assets/creeper.webp" width="100" alt="Minecraft Creeper"/>
      <p>No servers found</p>
    </div>
  </div>
</template>

<script setup>

import {toRefs} from "vue";
import ServerIcon from "@/components/ServerIcon.vue";
import router from "@/router";

const props = defineProps({
  servers: Array
});
const {servers} = toRefs(props);

const addToFavourites = (addr) => {
  if (isSaved(addr)) return;

  const fav = localStorage.getItem('favourites');
  let arr = []
  if (fav) arr = JSON.parse(fav);

  arr.push(addr);
  localStorage.setItem('favourites', JSON.stringify(arr));

  // Refresh the page
  router.go();
}

const removeToFavourites = (addr) => {
  if (!isSaved(addr)) return;

  const fav = localStorage.getItem('favourites');
  let arr = []
  if (fav) arr = JSON.parse(fav);

  arr = arr.filter(item => item !== addr)
  localStorage.setItem('favourites', JSON.stringify(arr));

  // Refresh the page
  router.go();
}

const isSaved = (addr) => {
  const fav = localStorage.getItem('favourites');
  return !!(fav && JSON.parse(fav).includes(addr));
}
</script>

<style scoped>

</style>