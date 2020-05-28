<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit</p>
        <button class="delete" aria-label="close" @click="cancel"></button>
      </header>
      <form @submit.stop="save">
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" name="title" v-model="newBook.title">
            </div>
          </div>
          <div class="field">
            <label class="label">Authors</label>
            <div class="control">
              <input class="input" type="tags" name="authors" v-model="newBook.authors">
            </div>
          </div>
          <div class="field">
            <label class="label">Publisher</label>
            <div class="control">
              <input class="input" type="text" name="publisher" v-model="newBook.publisher">
            </div>
          </div>
          <div class="field">
            <label class="label">Series</label>
            <div class="control">
              <input class="input" type="text" name="series" v-model="newBook.series">
            </div>
          </div>
          <div class="field">
            <label class="label">Edition</label>
            <div class="control">
              <input class="input" type="text" name="edition" v-model="newBook.edition">
            </div>
          </div>
          <div class="field">
            <label class="label">Year</label>
            <div class="control">
              <input class="input" type="text" name="year" v-model="newBook.year">
            </div>
          </div>
          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input class="input" type="tags" name="tags" v-model="newBook.tags">
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="save">Save changes</button>
          <button class="button" @click="cancel">Cancel</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const combinedValueHelper = (books, firstBook, value) => {
  return books.every(book => book[value] === firstBook[value]) ? firstBook[value] : ''
}

export default {
  name: 'EditModal',
  computed: {
    ...mapState(['Book']),
    newBook () {
      const books = this.Book.focusedBooks.map(id => this.Book.books[id])
      if (!books.length) {
        return {
          title: '',
          authors: '',
          publisher: '',
          series: '',
          edition: '',
          year: '',
          tags: ''
        }
      }
      const firstBook = books[0]
      return {
        title: combinedValueHelper(books, firstBook, 'title'),
        authors: combinedValueHelper(books, firstBook, 'authors'),
        publisher: combinedValueHelper(books, firstBook, 'publisher'),
        series: combinedValueHelper(books, firstBook, 'series'),
        edition: combinedValueHelper(books, firstBook, 'edition'),
        year: combinedValueHelper(books, firstBook, 'year'),
        tags: combinedValueHelper(books, firstBook, 'tags')
      }
    }
  },
  methods: {
    ...mapActions(['uneditBook', 'updateBooks']),
    cancel () {
      this.uneditBook()
    },
    valChanged (value, field) {
      const books = this.Book.focusedBooks.map(id => this.Book.books[id])
      const firstBook = books[0]
      return combinedValueHelper(books, firstBook, field) !== value
    },
    save () {
      const fields = [
        'title',
        'publisher',
        'series',
        'edition',
        'year'
      ]
      const listFields = [
        'authors',
        'tags'
      ]
      const updatedFields = {}

      fields.forEach(field => {
        let val = this.newBook[field]
        if (this.valChanged(val, field)) {
          updatedFields[field] = val
        }
      })

      listFields.forEach(field => {
        let vals = this.newBook[field]
        if (vals) {
          let val = vals.toString().split(',').map(val => val.trim()).filter(val => Boolean(val))
          if (this.valChanged(val, field)) {
            updatedFields[field] = val
          }
        }
      })

      const books = this.Book.focusedBooks.map(id => this.Book.books[id])
      const newBooks = books.map(book => ({
        ...book,
        ...updatedFields
      })).reduce((acc, book) => ({
        ...acc,
        [book._id]: book
      }), {})

      this.updateBooks({ bookIds: this.Book.focusedBooks, updatedFields, newBooks })
      this.uneditBook()
    }
  }
}
</script>

<style>
</style>
