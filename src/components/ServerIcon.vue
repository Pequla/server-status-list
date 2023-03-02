<template>
<div class="icon">
  <img :src="icon" v-if="icon" alt="Server icon"/>
  <img src="@/assets/noicon.png" width="64" v-else alt="Default server icon"/>
</div>
</template>

<script setup>
import {toRefs} from "vue";

const props = defineProps({
  icon: String
});
const {icon} = toRefs(props);
</script>