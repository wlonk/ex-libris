<template>
  <div
    id="wrapper"
  >
    <GlobalEvents
      @keydown.space.stop.prevent.exact="togglePreview"
      @keyup.enter.exact="openEdit"
    />
    <PdfPreview
      v-if="Book.previewBook"
      :src="highlightedBookUrl"
    ></PdfPreview>
    <EditModal
      v-if="Book.showEditModal"
    ></EditModal>
    <table
      class="table is-striped is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th>title</th>
          <th>authors</th>
          <th>publisher</th>
          <th>series</th>
          <th>edition</th>
          <th>year</th>
          <th>tags</th>
        </tr>
      </thead>
      <tfoot>
      </tfoot>
      <tbody>
        <BookRow
          v-for="(book, index) in sortedBooks"
          :key="book._id"
          :index="index"
          :book="book"
        ></BookRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BookRow from './BookRow'
import PdfPreview from './PdfPreview'
import EditModal from './EditModal'

export default {
  name: 'BookList',
  components: { BookRow, PdfPreview, EditModal },
  computed: {
    ...mapState(['Book']),
    sortedBooks () {
      // TODO: this will use some sort criterion when set.
      return Object.values(this.Book.books).sort((a, b) => {
        const titleA = a.title.toUpperCase()
        const titleB = b.title.toUpperCase()
        if (titleA < titleB) {
          return -1
        }
        if (titleA > titleB) {
          return 1
        }
        return 0
      })
    },
    highlightedBookUrl () {
      return this.Book.previewBook ? `file://${this.Book.previewBook.fullPath}` : ''
    }
  },
  methods: {
    ...mapActions(['editBook', 'previewBook', 'unpreviewBook']),
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    togglePreview () {
      if (this.Book.previewBook) {
        this.unpreviewBook()
      } else if (this.Book.focusedBooks.length) {
        const book = this.Book.books[this.Book.focusedBooks[0]]
        this.previewBook(book)
      }
    },
    openEdit () {
      if (this.Book.focusedBooks.length) {
        this.editBook()
      }
    }
  }
}
</script>

<style>
</style>
