<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import SiteHeader from '@shared/SiteHeader/SiteHeader.vue'
import SiteFooter from '@shared/SiteFooter/SiteFooter.vue'

const route = useRoute()

const showShell = computed(() => route.name === 'home' || route.name === 'category')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
    <SiteHeader v-if="showShell" />
    <main class="flex-1">
      <RouterView />
    </main>
    <SiteFooter v-if="showShell" />
  </div>
</template>
