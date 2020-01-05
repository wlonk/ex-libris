<template>
  <div id="wrapper">
    <PdfPreview
      v-if="Book.previewBook"
      :src="highlightedBookUrl"
    ></PdfPreview>
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
          v-for="(book, bookId, index) in Book.books"
          :key="book.id"
          :index="index"
          :book="book"
        ></BookRow>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookRow from './BookRow'
import PdfPreview from './PdfPreview'

export default {
  name: 'BookList',
  components: { BookRow, PdfPreview },
  computed: {
    ...mapState(['Book']),
    highlightedBookUrl () {
      return this.Book.previewBook ? `file://${this.Book.previewBook.fullPath}` : ''
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style>
</style>
