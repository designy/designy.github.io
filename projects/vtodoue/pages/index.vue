<template>
  <b-container fluid>
    <b-row class="mt-5">
      <b-col
        v-click-outside="collapseForm"
        md="4"
        offset-md="4"
        :class="['rounded border', { [$style.collapse]: collapse }]"
      >
        <b-input
          v-model="newTodo.title"
          placeholder="عنوان"
          :class="['mb-3 border-0 shadow-none', { 'd-none': collapse }]"
        ></b-input>
        <b-textarea
          ref="newTodoContent"
          v-model="newTodo.content"
          placeholder="یک یادداشت بنویسید ..."
          class="border-0 shadow-none"
          no-resize
          @click="expandForm"
        ></b-textarea>
      </b-col>
    </b-row>
    <b-card-group columns class="mt-4">
      <b-card v-for="todo in todos" :key="todo.id" :title="todo.title">
        <b-card-body>
          <b-card-text>
            {{ todo.content }}
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-card-group>
  </b-container>
</template>
<script lang="ts">
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      collapse: true,
      newTodo: {
        title: '',
        content: '',
      },
      todos: [],
    }
  },
  methods: {
    expandForm() {
      this.collapse = false
      this.$refs.newTodoContent.focus()
    },
    reset() {
      this.newTodo = {
        title: '',
        content: '',
      }
    },
    collapseForm() {
      if (this.newTodo.title && this.newTodo.content) {
        this.saveTodo()
      }
      this.collapse = true
    },
    saveTodo() {
      this.todos = [...this.todos, this.newTodo]
      this.reset()
    },
  },
}
</script>
<style lang="scss" module>
.collapse {
  height: 48px;
  overflow: hidden;
}
</style>
