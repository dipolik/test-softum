<template>
  <div>
    <select class="form-control" id="custom-select" v-model="selectedOption" @click="selectOption(selectedOption)">
      <option hidden disabled selected value> -- select an option --</option>
      <option v-for="option in options"
              v-bind:key="option.index"
      >{{ option.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',

  props: {
    options: {
      type: Array,
    }
  },

  data() {
    return {
      selectedOption: false,
    }
  },

  methods: {
    selectOption() {
      this.$emit('select', this.selectedOption);
    }
  }
}
</script>

<style scoped>

</style>