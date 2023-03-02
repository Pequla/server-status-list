<template>
  <div class="home">
    <h3>Favourites</h3>
    <div class="input-group mb-3">
      <input v-model="input" type="text" class="form-control bg-dark text-white">
      <button class="input-group-text btn btn-secondary" type="button" v-on:click="add">Add server</button>
    </div>
    <ServerList :servers="servers"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import ServerList from '@/components/ServerList.vue'
import StorageService from "@/service/StorageService";

const input = ref('37.230.138.224:25577');
const add = () => {
  if (StorageService.isSaved(input.value)) {
    alert(`${input.value} is already in favourites`)
    return;
  }
  StorageService.addToFavourites(input.value);
  retrieveServerStatus(input.value);
}

const servers = ref([])
const fav = JSON.parse(localStorage.getItem('favourites'));
if (fav && fav.length > 0) {
  fav.forEach(addr => retrieveServerStatus(addr));
}

function retrieveServerStatus(addr) {
  console.log(`Retrieving status for server ${addr}`)
  axios.get(`https://link.samifying.com/api/status/${addr}`)
      .then(rsp => {
        if (rsp.status === 200) {
          const status = rsp.data
          status.address = addr
          servers.value.push(status)
          console.log(`Successfully retrieved status for ${addr}`)
        }
      })
      .catch(err => {
        const rsp = err.response.data
        console.log(`Failed retrieving status for ${addr}`)
        console.log(`${rsp.name}: ${rsp.message}`)
      })
}
</script>
