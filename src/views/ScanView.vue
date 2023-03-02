<template>
  <div class="scan">
    <h3>Servers on {{address}}</h3>
    <ServerList :servers="servers"/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import ServerList from '@/components/ServerList.vue'

import {useRoute} from 'vue-router'

const route = useRoute()
const end = route.query.end;
const address = route.query.addr;

let servers = ref([]);
for (let i = 25565; i < end; i++) {
  // const addr = `37.230.138.224:${i}`;
  // const addr = `142.44.255.50:${i}`;
  retrieveServerStatus(`${address}:${i}`);
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