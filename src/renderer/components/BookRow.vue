<template>
  <tr
    @click="handleClick"
    :class="{ focused: isFocused }"
  >
    <td>{{ book.title }}</td>
    <td>
      <span class="tag" v-for="(author, index) in book.authors" :key="index">{{ author }}</span>
    </td>
    <td>{{ book.publisher }}</td>
    <td>{{ book.series }}</td>
    <td>{{ book.edition }}</td>
    <td>{{ book.year }}</td>
    <td>
      <span class="tag" v-for="(tag, index) in book.tags" :key="index">{{ tag }}</span>
    </td>
  </tr>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BookRow',
  props: {
    book: {
      type: Object
    },
    sortedFilteredBooks: {
      type: Array
    }
  },
  computed: {
    ...mapState(['Book']),
    isFocused () {
      return this.Book.focusedBooks.includes(this.book._id)
    },
    bookAuthors () {
      return this.book.authors ? this.book.authors.join(', ') : ''
    },
    bookTags () {
      return this.book.tags ? this.book.tags.join(', ') : ''
    }
  },
  methods: {
    ...mapActions(['focusBook', 'unfocusBook', 'setFocus', 'addFocus']),
    handleClick (evt) {
      const {
        metaKey,
        ctrlKey,
        shiftKey
      } = evt
      let modifiers = ''
      if (metaKey || ctrlKey) {
        modifiers = 'cmd'
      } else if (shiftKey) {
        modifiers = 'shift'
      }
      switch (modifiers) {
        case 'cmd':
          this.cmdClick()
          break
        case 'shift':
          this.shiftClick()
          break
        default:
          this.bareClick()
          break
      }
    },
    bareClick () {
      this.setFocus([this.book._id])
    },
    cmdClick () {
      if (this.Book.focusedBooks.includes(this.book._id)) {
        this.unfocusBook(this.book)
      } else {
        this.focusBook(this.book)
      }
    },
    shiftClick () {
      const { focusedBooks } = this.Book
      if (focusedBooks.includes(this.book._id)) {
        // pass
      } else if (focusedBooks.length > 0) {
        const bookIds = this.sortedFilteredBooks.map(book => book._id)
        // TODO: this isn't _quite_ the last click; it's the last click that
        // caused a select. Good enough for now, but subtle bug.
        const lastClick = focusedBooks[focusedBooks.length - 1]
        const thisSortedIndex = bookIds.indexOf(this.book._id)
        const lastSortedIndex = bookIds.indexOf(lastClick)
        const firstIndex = Math.min(thisSortedIndex, lastSortedIndex)
        const lastIndex = Math.max(thisSortedIndex, lastSortedIndex)
        const newBooks = bookIds.slice(firstIndex, lastIndex + 1).filter(
          id => !focusedBooks.includes(id)
        )
        this.addFocus(newBooks)
      } else {
        this.focusBook(this.book)
      }
    }
  }
}
</script>

<style>
.focused {
  background-color: rgb(0, 99, 225) !important;
}
</style>
