<template>
  <tr
    @click="togglePreview"
    @dblclick="editThis"
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
import { shell } from 'electron'
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
      return this.Book.previewBook && this.Book.previewBook.id === this.book.id
    }
  },
  methods: {
    ...mapActions(['previewBook', 'unpreviewBook']),
    openThis () {
      shell.openItem(this.book.fullPath)
    },
    togglePreview () {
      if (this.Book.previewBook && this.Book.previewBook.id === this.book.id) {
        this.unpreviewBook()
      } else {
        this.previewBook(this.book)
      }
    },
    editThis () {
      // TODO
    }
  }
}
</script>

<style>
.focused {
  background-color: #1b758a !important;
}
</style>
