<template>
  <div class="container">
    <h3>List Creator(Todo list) with MongoDB</h3>
    <b-form-group>
      <b-form-input
        v-model="song"
        :song="song"
        placeholder="Enter your name"
      ></b-form-input>
      <b-button
        v-if="this.isEdit == false"
        type="submit"
        @click="onAddSong()"
        class="btn btn-success btn-block mt-3"
      >
        Submit
      </b-button>
      <b-button
        v-else
        variant="danger"
        type="button"
        @click="onUpdateSong()"
        class="btn btn-primary btn-block mt-3"
      >
        Update
      </b-button>
    </b-form-group>
    <b-form-group>
      <b-list-group
        v-for="(word, index) in words"
        :key="word._id"
        :title="word.song"
      >
        <b-list-group-item button>
          <b-row>
            <b-col md="9"> {{ word.song }}</b-col>

            <b-button
              class="mr-1"
              variant="warning"
              @click="editTask(word.song, word._id)"
            >
              update</b-button
            >
            <b-button variant="info" @click="onDeleteSong(word._id, index)"
              >delete</b-button
            >
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.$get('http://localhost:5000/api/words')
      console.log(response)
      return {
        words: response.words,
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      song: '',
      words: [],
      _id: '',

      isEdit: false,
    }
  },
  methods: {
    async onAddSong() {
      try {
        let data = { song: this.song }
        let response = await this.$axios.$post(
          'http://localhost:5000/api/words',
          data
        )

        console.log('success')
        window.location.reload(true)
      } catch (err) {
        console.log(err)
      }
    },
    async onUpdateSong(_id) {
      try {
        let data = { song: this.song }

        let response = await this.$axios.$put(
          `http://localhost:5000/api/words/${this._id}`,
          data
        )
        this.song = ''
        this.isEdit = false
        console.log(response)
        window.location.reload(true)
      } catch (err) {
        console.log(err)
      }
    },
    editTask(title, _id) {
      this._id = _id
      this.song = title
      this.isEdit = true
    },

    async onDeleteSong(_id, index) {
      try {
        let response = await this.$axios.$delete(
          `http://localhost:5000/api/words/${_id}`
        )
        if (response.status) {
          this.words.splice(index, 1)
        }
        window.location.reload(true)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
.container {
  margin-top: 200px;
  max-width: 750px;
}
</style>
