<template>
  <div id="wrapper">
    <table
      class="table is-striped is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>publisher</th>
          <th>series</th>
          <th>edition</th>
          <th>year</th>
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
    <webview
      v-if="Book.previewBook"
      :src="highlightedBookUrl"
      plugins=true
    ></webview>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookRow from './BookRow'

export default {
  name: 'BookList',
  components: { BookRow },
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
#wrapper {
  display: flex;
}
table {
  flex-shrink: 2;
}
webview {
  flex-shrink: 1;
  flex-basis: 750px;
}
</style>
