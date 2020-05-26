<template>
  <div
    id="wrapper"
  >
    <GlobalEvents
      @keydown.space="togglePreview"
      @keyup.enter.exact="openEdit"
    />
    <PdfPreview
      v-if="Book.previewBook"
      :src="highlightedBookUrl"
    ></PdfPreview>
    <EditModal
      v-if="Book.showEditModal"
    ></EditModal>
    <div class="field">
      <input v-model="searchFilter" placeholder="Search" class="input" />
      <p class="help has-text-centered">{{ sortedFilteredBooks.length }} books</p>
    </div>
    <table
      class="table is-striped is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th @click="sortBy('title')">title</th>
          <th @click="sortBy('authors')">authors</th>
          <th @click="sortBy('publisher')">publisher</th>
          <th @click="sortBy('series')">series</th>
          <th @click="sortBy('edition')">edition</th>
          <th @click="sortBy('year')">year</th>
          <th @click="sortBy('tags')">tags</th>
        </tr>
      </thead>
      <tfoot>
      </tfoot>
      <tbody>
        <BookRow
          v-for="(book, index) in sortedFilteredBooks"
          :key="book._id"
          :index="index"
          :book="book"
          :sortedFilteredBooks="sortedFilteredBooks"
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
  data () {
    return {searchFilter: ''}
  },
  computed: {
    ...mapState(['Book']),
    sortedFilteredBooks () {
      return Object
        .values(this.Book.books)
        .filter((book) => {
          if (!this.searchFilter.length) {
            return true
          } else {
            const fields = ['title', 'publisher', 'series', 'edition', 'year']
            const arrayFields = ['authors', 'tags']
            const filter = this.searchFilter.toLowerCase()
            return fields.some((field) => {
              return book[field].toLowerCase().includes(filter)
            }) || arrayFields.some((field) => {
              return book[field].some((val) => {
                return val.toLowerCase().includes(filter)
              })
            })
          }
        })
        .sort((a, b) => {
          const { key, ascending } = this.Book.sortKey
          const flip = ascending ? 1 : -1
          let keyA
          let keyB
          if (key === 'tags' || key === 'authors') {
            keyA = (a[key] || []).join('|').toUpperCase()
            keyB = (b[key] || []).join('|').toUpperCase()
          } else {
            keyA = (a[key] || '').toUpperCase()
            keyB = (b[key] || '').toUpperCase()
          }
          if (keyA < keyB) {
            return -1 * flip
          }
          if (keyA > keyB) {
            return 1 * flip
          }
          return 0
        })
    },
    highlightedBookUrl () {
      return this.Book.previewBook ? `file://${this.Book.previewBook.fullPath}` : ''
    }
  },
  methods: {
    ...mapActions(['setSortKey', 'uneditBook', 'editBook', 'previewBook', 'unpreviewBook']),
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    togglePreview (evt) {
      // If we're in an input right now, just let it be a space.
      if (document.querySelectorAll('input:focus').length > 0) {
        return
      }
      event.preventDefault()
      event.stopPropagation()
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
    },
    sortBy (key) {
      let ascending
      if (this.Book.sortKey.key === key) {
        ascending = !this.Book.sortKey.ascending
      } else {
        ascending = true
      }
      const compoundKey = { key, ascending }
      this.setSortKey(compoundKey)
    }
  }
}
</script>

<style>
tr {
  cursor: pointer;
}
</style>
