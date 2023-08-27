<template>

  <div class="common-layout">
    <el-container>
      <el-header>
        <div v-if="editor" class="button-container">
          <div class="column">
          <el-popover
              placement="top-start"
              title="加粗(Ctrl+B)"
              :width="100"
              trigger="hover"
              content="将文本加粗"
          >
            <template #reference>
              <el-button
                  @click="editor.chain().focus().toggleBold().run()"
                  :disabled="!editor.can().chain().focus().toggleBold().run()"
                  :class="{ 'is-active': editor.isActive('bold') }"
              >
                B
              </el-button>
            </template>
          </el-popover>

          <el-popover
              placement="top-start"
              title="倾斜(Ctrl+l)"
              :width="100"
              trigger="hover"
              content="将文字变为斜体"
          >
            <template #reference>
              <el-button
                  @click="editor.chain().focus().toggleItalic().run()"
                  :disabled="!editor.can().chain().focus().toggleItalic().run()"
                  :class="{ 'is-active': editor.isActive('italic') }"
              >
                I
              </el-button>
            </template>
          </el-popover>

          <el-popover
              placement="top-start"
              title="删除线"
              :width="100"
              trigger="hover"
              content="在文本中间画一条线"
          >
            <template #reference>
              <el-button
                  @click="editor.chain().focus().toggleStrike().run()"
                  :disabled="!editor.can().chain().focus().toggleStrike().run()"
                  :class="{ 'is-active': editor.isActive('strike') }"
              >
                S
              </el-button>
            </template>
          </el-popover>

          <el-popover
              placement="top-start"
              title="代码块"
              :width="100"
              trigger="hover"
              content="将文本转换为代码块"
          >
            <template #reference>
              <el-button
                  @click="editor.chain().focus().toggleCode().run()"
                  :disabled="!editor.can().chain().focus().toggleCode().run()"
                  :class="{ 'is-active': editor.isActive('code') }"
              >
                C
              </el-button>
            </template>
          </el-popover>

        </div>

<!--          <el-button @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">-->
<!--            bold-->
<!--&lt;!&ndash;          </el-button>&ndash;&gt;-->
<!--          <el-button @click="editor.chain().focus().toggleItalic().run()" :disabled="!editor.can().chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">-->
<!--            italic-->
<!--          </el-button>-->
<!--          <el-button @click="editor.chain().focus().toggleStrike().run()" :disabled="!editor.can().chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">-->
<!--            strike-->
<!--          </el-button>-->
        <div class="colmn">

<!--          <el-button @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">-->
<!--          code-->
<!--          </el-button>-->
          <el-button @click="editor.chain().focus().unsetAllMarks().run()">
            cm
          </el-button>
          <el-button @click="editor.chain().focus().clearNodes().run()">
            cn
          </el-button>
          </div>

          <div class="column">
          <el-button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
            paragraph
          </el-button>
          <el-button text @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            h1
          </el-button>
          <el-button text @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            h2
          </el-button>
          <el-button text @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
            h3
          </el-button>
          <el-button text @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
            h4
          </el-button>
          <el-button text @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
            h5
          </el-button>
          <el-button text @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
            h6
          </el-button>
            </div>

          <div class="column">
            <div class="buttonSet">
                <el-button style="width: calc(33.33% - 10px);margin-bottom: 10px;" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                  bullet list
                </el-button>
                <el-button style="width: calc(33.33% - 10px);margin-bottom: 10px;" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                  ordered list
                </el-button>
                <el-button style="width: calc(33.33% - 10px);margin-bottom: 10px;" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                  code block
                </el-button>
                <el-button style="width: calc(33.33% - 10px);margin-bottom: 10px;" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                  blockquote
                </el-button>
                <el-button style="width: calc(33.33% - 10px);margin-bottom: 10px;" @click="editor.chain().focus().setHorizontalRule().run()">
                  horizontal rule
                </el-button>
                <el-button style="width: calc(33.33% - 10px);margin-bottom: 10px;" @click="editor.chain().focus().setHardBreak().run()">
                  hard break
                </el-button>
              </div>
            </div>
          <div class="column">
          <el-button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
            undo
          </el-button>
          <el-button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
            redo
          </el-button>
          </div>
        </div>
      </el-header>

      <el-main>
        <div class="editor" v-if="editor">

          <editor-content :editor="editor" />
          <div class="editor__footer">
            <h1>qqqq</h1>
            <div :class="`editor__status editor__status--${status}`">
              <template v-if="status === 'connected'">
                {{ editor.storage.collaborationCursor.users.length }} user{{ editor.storage.collaborationCursor.users.length === 1 ? '' : 's' }} online in {{ room }}
              </template>
              <template v-else>
                offline
              </template>
            </div>
            <div class="editor__name">
              <button @click="setName">
                {{ currentUser.name }}
              </button>
            </div>
          </div>
        </div>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import { HocuspocusProvider } from '@hocuspocus/provider';
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import * as Y from 'yjs'
// import buttonGroup from './buttonGroup.vue'


const getRandomElement = list => {
  return list[Math.floor(Math.random() * list.length)]
}

const getRandomRoom = () => {
  const roomNumbers =  [10, 11, 12]

  return getRandomElement(roomNumbers.map(number => `rooms.${number}`))
}

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
        name: this.getRandomName(),
        color: this.getRandomColor(),
      },
      provider: null,
      editor: null,
      status: 'connecting',
      room: getRandomRoom(),
    }
  },

  mounted() {
    const ydoc = new Y.Doc()

    this.provider = new HocuspocusProvider({
      url: 'ws://10.192.201.181:1234/textcollab/937d259e-a552-43f4-943e-97b9b5219f04',
      document: ydoc,
    })

    this.provider.on('status', event => {
      this.status = event.status
    })

    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        TaskList,
        TaskItem,
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
      ],
    })

    localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
  },

  methods: {
    setName() {
      const name = (window.prompt('Name') || '')
          .trim()
          .substring(0, 32)

      if (name) {
        return this.updateCurrentUser({
          name,
        })
      }
    },

    updateCurrentUser(attributes) {
      this.currentUser = { ...this.currentUser, ...attributes }
      this.editor.chain().focus().updateUser(this.currentUser).run()

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    },

    getRandomColor() {
      return getRandomElement([
        '#958DF1',
        '#F98181',
        '#FBBC88',
        '#FAF594',
        '#70CFF8',
        '#94FADB',
        '#B9F18D',
      ])
    },

    getRandomName() {
      return getRandomElement([
        'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
      ])
    },
  },

  beforeUnmount() {
    this.editor.destroy()
    this.provider.destroy()
  },
}
</script>

<style lang="scss" scoped>
.button-container{
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 2fr 1fr;
  grid-gap: 2px; /* 列之间的间隔 */
}

.column {
  padding: 1px;
}

.buttonSet {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* 每行按钮之间平均分布空间 */
  align-items: flex-start; /* 上对齐 */
}

.editor {
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;
  color: #0D0D0D;
  display: flex;
  flex-direction: column;
  max-height: 26rem;

  &__header {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.25rem 1rem;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    align-items: center;
    border-top: 3px solid #0D0D0D;
    color: #0D0D0D;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  /* Some information about the status */
  &__status {
    align-items: center;
    border-radius: 5px;
    display: flex;

    &::before {
      background: rgba(#0D0D0D, 0.5);
      border-radius: 50%;
      content: ' ';
      display: inline-block;
      flex: 0 0 auto;
      height: 0.5rem;
      margin-right: 0.5rem;
      width: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #B9F18D;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      border-radius: 0.4rem;
      color: #0D0D0D;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 0.25rem 0.5rem;

      &:hover {
        background-color: #0D0D0D;
        color: #FFF;
      }
    }
  }
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0D0D0D;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    border-radius: 0.5rem;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0D0D0D, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>