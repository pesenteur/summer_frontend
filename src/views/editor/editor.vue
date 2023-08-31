<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="editor__header">
          <div>
            <h1>项目协作</h1>
          </div>
          <div> </div>
          <div :class="`editor__status editor__status--${status}`">
            <template v-if="status === 'connected'">
              {{ editor.storage.collaborationCursor.users.length }} user{{
                editor.storage.collaborationCursor.users.length === 1 ? '' : 's'
              }} online in {{ documentId }}
            </template>
            <template v-else>
              offline
            </template>
            {{ currentUser.name }}
          </div>
          <div class="optionButton">
            <button @click="saveDocument">Save</button>
            <button @click="exportMarkdown">导出为Markdown</button>
            <button @click="exportPDF">导出为PDF</button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location />
                    </el-icon>
                    <span>Navigator One</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>Navigator Four</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <div v-if="editor" class="button-container">
            <div class="column">
              <el-popover placement="top-start" title="加粗(Ctrl+B)" :width="100" trigger="hover" content="将文本加粗">
                <template #reference>
                  <el-button @click="editor.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor.isActive('bold') }">
                    <font-awesome-icon :icon="['fas', 'bold']" />
                  </el-button>
                </template>
              </el-popover>
              <el-popover placement="top-start" title="高亮" :width="100" trigger="hover" content="将文本高亮">
                <template #reference>
                  <el-button @click="editor.chain().focus().toggleHighlight().run()"
                    :class="{ 'is-active': editor.isActive('highlight') }">
                    <font-awesome-icon :icon="['fas', 'highlighter']" />
                  </el-button>
                </template>
              </el-popover>
              <el-popover placement="top-start" title="倾斜(Ctrl+l)" :width="100" trigger="hover" content="将文字变为斜体">
                <template #reference>
                  <el-button @click="editor.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'is-active': editor.isActive('italic') }">
                    <font-awesome-icon :icon="['fas', 'italic']" />
                  </el-button>
                </template>
              </el-popover>

              <el-popover placement="top-start" title="删除线" :width="100" trigger="hover" content="在文本中间画一条线">
                <template #reference>
                  <el-button @click="editor.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'is-active': editor.isActive('strike') }">
                    <font-awesome-icon :icon="['fas', 'strikethrough']" />
                  </el-button>
                </template>
              </el-popover>

              <el-popover placement="top-start" title="代码块" :width="100" trigger="hover" content="将文本转换为代码块">
                <template #reference>
                  <el-button @click="editor.chain().focus().toggleCode().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'is-active': editor.isActive('code') }">
                    <font-awesome-icon :icon="['fas', 'code']" />
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
            <div class="column">
              <el-popover title="段落" content="一段文字">
                <template #reference>
                  <el-button @click="editor.chain().focus().setParagraph().run()"
                    :class="{ 'is-active': editor.isActive('paragraph') }" tooltip="段落">
                    <font-awesome-icon :icon="['fas', 'paragraph']" />
                  </el-button>
                </template>
              </el-popover>

              <el-popover placement="top-start" title="Heading 1" :width="100" trigger="hover" content="设置为一级标题">
                <template #reference>
                  <el-button text @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                    h1
                  </el-button>
                </template>
              </el-popover>

              <!-- 标题按钮 - Heading 2 -->
              <el-popover placement="top-start" title="Heading 2" :width="100" trigger="hover" content="设置为二级标题">
                <template #reference>
                  <el-button text @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                    h2
                  </el-button>
                </template>
              </el-popover>

              <!-- 标题按钮 - Heading 3 -->
              <el-popover placement="top-start" title="Heading 3" :width="100" trigger="hover" content="设置为三级标题">
                <template #reference>
                  <el-button text @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                    h3
                  </el-button>
                </template>
              </el-popover>

              <!-- 标题按钮 - Heading 4 -->
              <el-popover placement="top-start" title="Heading 4" :width="100" trigger="hover" content="设置为四级标题">
                <template #reference>
                  <el-button text @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                    h4
                  </el-button>
                </template>
              </el-popover>

              <!-- 标题按钮 - Heading 5 -->
              <el-popover placement="top-start" title="Heading 5" :width="100" trigger="hover" content="设置为五级标题">
                <template #reference>
                  <el-button text @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                    h5
                  </el-button>
                </template>
              </el-popover>

              <!-- 标题按钮 - Heading 6 -->
              <el-popover placement="top-start" title="Heading 6" :width="100" trigger="hover" content="设置为六级标题">
                <template #reference>
                  <el-button text @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                    h6
                  </el-button>
                </template>
              </el-popover>

            </div>

            <div class="column">
              <div class="buttonSet">
                <el-popover title="无序列表" content="将选中文本转换为无序列表" placement="top-start">
                  <template #reference>
                    <el-button style="margin-bottom: 10px;" @click="editor.chain().focus().toggleBulletList().run()"
                      :class="{ 'is-active': editor.isActive('bulletList') }">
                      <font-awesome-icon :icon="['fas', 'bars-staggered']" />
                    </el-button>
                  </template>
                </el-popover>
                <el-popover title="有序列表" content="将选中文本转换为有序列表" placement="top-start">
                  <template #reference>
                    <el-button style="margin-bottom: 10px;" @click="editor.chain().focus().toggleOrderedList().run()"
                      :class="{ 'is-active': editor.isActive('orderedList') }">
                      <font-awesome-icon :icon="['fas', 'list']" />
                    </el-button>
                  </template>
                </el-popover>
                <el-popover title="引用块" content="将选中文本转换为引用块" placement="top-start">
                  <template #reference>
                    <el-button style="margin-bottom: 10px;" @click="editor.chain().focus().toggleBlockquote().run()"
                      :class="{ 'is-active': editor.isActive('blockquote') }">
                      <font-awesome-icon :icon="['fas', 'quote-left']" />
                    </el-button>
                  </template>
                </el-popover>

                <el-popover title="水平线" content="插入水平分隔线" placement="top-start">
                  <template #reference>
                    <el-button style="margin-bottom: 10px;" @click="editor.chain().focus().setHorizontalRule().run()">
                      <font-awesome-icon :icon="['fas', 'ruler-horizontal']" />
                    </el-button>
                  </template>
                </el-popover>

                <el-popover title="硬换行" content="插入硬换行" placement="top-start">
                  <template #reference>
                    <el-button style="margin-bottom: 10px;" @click="editor.chain().focus().setHardBreak().run()">
                      <font-awesome-icon :icon="['fas', 'bacon']" />
                    </el-button>
                  </template>
                </el-popover>
              </div>
            </div>
            <div class="column">
              <el-popover title="撤销" placement="top-start">
                <template #reference>
                  <el-button @click="editor.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()">
                    <font-awesome-icon :icon="['fas', 'rotate-left']" />
                  </el-button>
                </template>
              </el-popover>

              <el-popover title="重做" placement="top-start">
                <template #reference>
                  <el-button @click="editor.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()">
                    <font-awesome-icon :icon="['fas', 'arrow-rotate-right']" />
                  </el-button>
                </template>
              </el-popover>
            </div>
            <div class="column">
              <el-popover title="清除所有标记" placement="top-start">
                <template #reference>
                  <el-button @click="editor.chain().focus().unsetAllMarks().run()">
                    <font-awesome-icon :icon="['fas', 'broom']" />
                  </el-button>
                </template>
              </el-popover>
            </div>
          </div>
          <div class="editor" v-if="editor">
            <editor-content :editor="editor" id="editor" />
          </div>
          <div class="editor__footer">
            <div class="editor__name">
              <div>
                {{ currentUser.name }}
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { HocuspocusProvider } from '@hocuspocus/provider';
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import Mention from '@tiptap/extension-mention'
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3'
import suggestion from './suggestion.js'
import asideNav from './asideNav.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as Y from 'yjs'
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import documentRequest from '@/api/document';
import { Location } from "@element-plus/icons-vue";
import TurndownService from 'turndown'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const route = useRoute();

const colors = [
  '#958DF1',
  '#F98181',
  '#FBBC88',
  '#FAF594',
  '#70CFF8',
  '#94FADB',
  '#B9F18D',
];
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const currentUser = ref({
  // TODO 获取用户姓名
  name: route.params.documentId || '123',
  color: getRandomColor()
});
const provider = ref();
const editor = ref();
const status = ref('connecting');
const documentId = ref(route.params.documentId || '123');
const editorRef = ref()

onMounted(() => {
  const ydoc = new Y.Doc();

  provider.value = new HocuspocusProvider({
    url: 'ws://127.0.0.1:1234',
    name: documentId.value,
    document: ydoc,
    forceSyncInterval: 200
  });

  provider.value.on('status', event => {
    status.value = event.status;
  });

  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        history: false
      }),
      Highlight,
      TaskList,
      TaskItem,
      Collaboration.configure({
        document: ydoc
      }),
      CollaborationCursor.configure({
        provider: provider.value,
        user: currentUser.value
      }),
      CharacterCount.configure({
        limit: 100000,
      }),
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion
      })
    ]
  });
});

onBeforeUnmount(() => {
  editor.value.destroy();
  provider.value.destroy();
});

async function saveDocument() {
  try {
    const content = editor.value.getHTML();
    await documentRequest.saveDocument(documentId.value, content);
    ElMessage({
      message: '保存成功',
      type: 'success'
    });
  } catch (error) {
    ElMessage({
      message: '保存失败',
      type: 'error'
    });
  }
}

function exportMarkdown() {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*'
  });
  const markdown = turndownService.turndown(editor.value.getHTML());
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });

  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  // TODO 文档名
  downloadLink.download = 'filename.txt';
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
}

function exportPDF() {
  const pdf = new jsPDF();

  pdf.setDocumentProperties({
    title: 'HTML to PDF',
    // subject: 'Generated PDF file using jsPDF library',
    author: 'SE2023',
    // keywords: 'html, pdf, javascript',
    creator: 'SE2023'
  });
  const editor_dom = document.querySelector('#editor');
  // 使用 html2canvas 库将 HTML 页面转换为 canvas 元素
  html2canvas(editor_dom, {
    scale: 2
  }).then(canvas => {
    // 将 canvas 元素转换为图像数据
    const imageData = canvas.toDataURL('image/png', 1.0);
    const imgProps = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 设置边距
    const marginX = 20; // 左右边距
    const marginY = 20; // 上下边距
    const contentWidth = pdfWidth - 2 * marginX;
    const contentHeight = pdfHeight - 2 * marginY;

    pdf.addImage(
      imageData,
      'PNG',
      marginX,
      marginY,
      contentWidth,
      contentHeight
    );
    // 下载 PDF 文件
    pdf.save('filename.pdf');
  });
}
</script>

<style lang="scss">
.el-col-12 {
  /* max-width: 50%; */
  flex: 0 0 100% !important;
}

@font-face {
  font-family: 'element-icons';
  src: url('path/to/element-icons.woff') format('woff'),
    url('path/to/element-icons.ttf') format('truetype');
  /* 其他样式 */
}

.button-container {
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 1fr 1fr;
  grid-gap: 2px;
  /* 列之间的间隔 */
}

.column {
  padding: 1px;
}

.mention {
  border: 1px solid #000;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
  color: black;
  box-decoration-break: clone;
}

.editor {
  min-height: 600px;
  background-color: #FFF;
  border: 1px solid #0D0D0D;
  box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.1);
  color: #0D0D0D;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
  // max-height: 26rem;

  &__header {
    color: #0D0D0D;
    align-items: center;
    justify-content: space-between;
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
  >*+* {
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
      padding: 0;
      font-size: 1.2em;
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

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }
    }
  }
}

.ProseMirror:focus {
  outline: none !important;
}

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

.editor {
  overflow: auto;
}
</style>