<script setup>
import { ref } from 'vue';
import axios from 'axios';

const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        let result = await axios.get(`http://localhost:3001/places`);
        result = result.data.filter((el) => {
          return el.name.toLowerCase().includes(searchQuery.value.toLocaleLowerCase())
        })

        searchResults.value = result;
        return;

      } catch {

        searchError.result = true;
      }

    }

    searchResults.value = null;

  }, 300);
}
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" placeholder="Search for a city or state" name="" id=""
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
        v-model="searchQuery" @input="getSearchResults">
      <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="searchResults">
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong!!
        </p>
        <p v-if="!searchError && searchResults.length === 0">
          Nothing found.
        </p>
        <template v-else>
          <li v-for="searchResult in searchResults" :key="searchResult.id" class="py-2 cursor-pointer"
            @click="previewCity(searchResult)">
            {{ searchResult.name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
