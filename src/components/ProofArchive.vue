<template>
    <aside>
        <ul class="flex items-center w-full py-px pl-px mb-12 space-x-4 overflow-x-auto md:mb-8">
            <button
                @click="activeCategory = activeCategory == category ? '' : category"
                v-for="[category, proofs] in categories"
                :class="[
                    'shrink-0 rounded-md border px-4 py-3 text-center font-medium shadow-sm',
                    activeCategory == category
                        ? 'border-yellow-500 font-bold ring-1 ring-yellow-500'
                        : 'border-stone-200'
                ]"
            >
                <li>
                    {{ unsluggify(category) }}
                    <span class="text-stone-500">({{ proofs.length }})</span>
                </li>
            </button>
        </ul>
    </aside>

    <main>
        <ul>
            <article v-for="proof in filteredProofs">
                <a :href="proof.url">
                    <li class="mb-10">
                        <header v-if="!activeCategory">
                            <p class="mb-1 font-light text-yellow-600 md:mb-2">
                                {{ unsluggify(proof.category) }}
                            </p>
                        </header>

                        <h3 class="mb-1 text-xl font-medium md:mb-2">
                            {{ proof.title }}
                        </h3>

                        <p class="text-stone-600">{{ proof.description }}</p>
                    </li>
                </a>
            </article>

            <li class="mt-12" v-if="filteredProofs.length == 0">No results found.</li>
        </ul>
    </main>
</template>

<script setup lang="ts">
import { computed, ref } from '@vue/reactivity'
import { onMounted, watch } from 'vue'
import { unsluggify } from '../scripts'

const activeCategory = ref('')

const props = defineProps(['proofs'])

onMounted(() => {
    activeCategory.value = new URLSearchParams(window.location.search).get('category')
})

const filteredProofs = computed(() => {
    let proofs = props.proofs

    if (activeCategory.value !== '') {
        proofs = proofs.filter(proof => proof.category == activeCategory.value)
    }

    return proofs
})

watch(activeCategory, category => {
    const url = new URL(window.location)
    url.searchParams.set('category', category)
    window.history.pushState({}, '', url)
})

const categories = computed(() => {
    return Object.entries(
        props.proofs.reduce((groups, proof) => {
            const group = groups[proof.category] || []
            groups[proof.category] = [...group, proof]
            return groups
        }, {})
    )
})
</script>
