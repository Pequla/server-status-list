<template>
  <h3 class="text-center">Server status for {{ addr }}</h3>
  <div v-if="status" class="mx-auto text-center">
    <p><ServerIcon :icon="status.favicon"/><br>
      Online players: {{ status.players.online }} / {{ status.players.max }}<br>
      Server version: {{ status.version.name }}<br>
      <span v-if="status.description.text !== ''">MOTD: {{ status.description.text }}</span>
    </p>
    <p v-if="status.players.sample" v-for="player in status.players.sample"><img
        :src="'https://visage.surgeplay.com/face/64/'+player.id" class="m-1"><strong>{{ player.name }}</strong>
      ({{ player.id }})</p>
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