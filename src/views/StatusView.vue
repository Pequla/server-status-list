<template>
  <h3>Server status for {{ addr }}</h3>
  <div v-if="status">
    <table class="table table-dark table-striped">
      <tbody>
      <tr>
        <th>ICON</th>
        <th>
          <ServerIcon :icon="status.favicon"/>
        </th>
      </tr>
      <tr>
        <th>ONLINE</th>
        <th>{{ status.players.online }} / {{ status.players.max }}</th>
      </tr>
      <tr>
        <th>VERSION</th>
        <th>{{ status.version.name }}</th>
      </tr>
      <tr v-if="status.description.text !== ''">
        <th>MOTD</th>
        <th>{{ status.description.text }}</th>
      </tr>
      </tbody>
    </table>
    <table class="table table-dark table-striped" v-if="status.players.sample">
      <thead>
      <tr>
        <th scope="col">AVATAR</th>
        <th scope="col">USERNAME</th>
        <th scope="col">UUID</th>
        <th scope="col">DISCORD TAG</th>
        <th scope="col">DISCORD ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="player in status.players.sample">
        <th scope="row"><img :src="'https://visage.surgeplay.com/face/64/'+player.id"/></th>
        <td>{{ player.name }}</td>
        <td>{{ player.id }}</td>
        <td v-if="player.discord">{{ player.discord }}</td>
        <td v-if="player.discord">{{ player.discordId }}</td>
        <td v-else colspan="2">No data</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

import {useRoute} from "vue-router";
import axios from "axios";
import {ref} from "vue";
import ServerIcon from "@/components/ServerIcon.vue";

const route = useRoute()
const addr = route.params.addr;

const status = ref();

console.log(`Retrieving status for server ${addr}`)
axios.get(`https://link.samifying.com/api/status/${addr}`)
    .then(rsp => {
      if (rsp.status === 200) {
        status.value = rsp.data
        console.log(`Successfully retrieved status for ${addr}`)

        if (rsp.data.players.online >0)
          status.value.players.sample.forEach(p=>{
          axios.get(`https://cache.samifying.com/api/data/uuid/${p.id}`)
              .then(rsp=>{
                // Insert discord field
                    p.discord = rsp.data.tag
                    p.discordId = rsp.data.discordId
              })
        })
      }
    })
    .catch(err => {
      const rsp = err.response.data
      console.log(`Failed retrieving status for ${addr}`)
      console.log(`${rsp.name}: ${rsp.message}`)
    })
</script>

<style scoped>

</style>