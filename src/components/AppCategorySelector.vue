<script>
export default {
  props: ["categories"],
  data() {
    return {
      selectedCategories: [],
    };
  },
  methods: {
    toggleCategory(category) {
      const index = this.selectedCategories.indexOf(category);
      if (index === -1) {
        this.selectedCategories.push(category);
      } else {
        this.selectedCategories.splice(index, 1);
      }
    },
    isSelected(category) {
      return this.selectedCategories.includes(category);
    },
    filterRestaurants() {
      this.$emit(
        "filtered",
        this.selectedCategories.map((category) => category.id)
      );
    },
  },
};
</script>

<template>
  <div>
    <div>
      <form @submit.prevent="filterRestaurants" class="px-8 mt-9">
        <div class="flex flex-wrap justify-center mb-5 gap-4">
          <div
            class="category-button px-3 py-1 bg-secondary rounded-md shadow-md"
            v-for="category in categories"
            :key="category.id"
          >
            <button
              type="button"
              class="category-button text-sm md:text-md"
              :class="{ 'text-primary': isSelected(category) }"
              @click="toggleCategory(category)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        <div class="mt-6">
          <button
            @click="$emit('resetFilter')"
            type="submit"
            class="filter-button px-5 py-2 bg-primary_hover hover:bg-primary rounded-md shadow-md"
          >
            Filtra
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
