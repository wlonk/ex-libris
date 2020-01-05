<template>
  <tr
    @click="toggleFocus"
    :class="{ focused: isFocused }"
  >
    <td>{{ book.title }}</td>
    <td>{{ book.authors.join(', ') }}</td>
    <td>{{ book.publisher }}</td>
    <td>{{ book.series }}</td>
    <td>{{ book.edition }}</td>
    <td>{{ book.year }}</td>
    <td>{{ book.tags.join(', ') }}</td>
  </tr>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BookRow',
  props: {
    book: {
      type: Object
    }
  },
  computed: {
    ...mapState(['Book']),
    isFocused () {
      return this.Book.focusedBooks.includes(this.book.id)
    }
  },
  methods: {
    ...mapActions(['focusBook', 'unfocusBook']),
    toggleFocus () {
      if (this.isFocused) {
        this.unfocusBook(this.book)
      } else {
        this.focusBook(this.book)
      }
    }
  }
}
</script>

<style>
.focused {
  background-color: #1b758a !important;
}
</style>
