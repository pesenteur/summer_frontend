<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="editor__header">
          <div>
            <span class="title" v-if="!isEditingTitle">{{ currentDocumentName }}</span>
            <input v-else v-model="newTitle" class="edit-title-input" />
            <button class="changeName" @click="toggleEditTitle">
              <font-awesome-icon :icon="['fas', isEditingTitle ? 'save' : 'pen-to-square']" />
            </button>
          </div>
          <div :class="`editor__status editor__status--${status}`">
            <template v-if="status === 'connected'">
              {{ editor.storage.collaborationCursor.users.length }} user{{
                editor.storage.collaborationCursor.users.length === 1 ? '' : 's'
              }} online in {{ currentUser.name }}
            </template>
            <template v-else>
              offline
            </template>
          </div>
          <div class="optionButton">
            <button @click="saveDocument">Save</button>
            <button @click="exportMarkdown">导出为Markdown</button>
            <button @click="exportPDF">导出为PDF</button>
            <button @click="exportWord">导出为Word</button>
            <button @click="openDialog">共享</button>
            <el-diglog v-if="isDialogVisible" class="dialog">
              <h2>生成共享链接</h2>
              <label for="editable">是否可编辑：</label>
              <input type="checkbox" id="editable" v-model="isEditable">
              <button @click="generateLink">生成链接</button>
              <button @click="closeDialog">关闭</button>
              <p v-if="sharedLink">
                生成的链接：<a :href="sharedLink" target="_blank">{{ sharedLink }}</a>
                <button @click="copyToClipboard">复制链接</button>
              </p>
            </el-diglog>
          </div>
        </div>
      </el-header>
      <el-affix>
        <el-container>
          <el-affix :offset="120">
            <el-aside width="230px">
              <el-row class="tac">
                <el-col :span="24">
                  <el-menu>
                    <el-sub-menu index="1">
                      <template #title>
                        <font-awesome-icon :icon="['fas', 'folder']" /><span class="item">{{ projectName }}</span>
                        <button class="transparent-button-1" @click.stop="showAddFolderDialog">
                          <font-awesome-icon :icon="['fas', 'folder-plus']" /></button>
                        <button class="transparent-button-2" @click.stop="showAddDocumentDialog('')"><font-awesome-icon
                            :icon="['fas', 'file-circle-plus']" />
                        </button>
                      </template>
                      <div class="button-container">
                      </div>
                      <div v-for="folder in folders" :key="folder.id">
                        <el-sub-menu :index="folder.id">
                          <template #title>
                            <font-awesome-icon :icon="['fas', 'folder']" /><span class="item">{{ folder.name }}</span>
                            <button class="transparent-button-2"
                              @click.stop="showAddDocumentDialog(folder.id)"><font-awesome-icon
                                :icon="['fas', 'file-circle-plus']" />
                            </button>
                            <button class="transparent-button-2"
                              @click.stop="showDeleteFolderDialog(folder.id)"><font-awesome-icon
                                :icon="['fas', 'trash']" />
                            </button>
                          </template>
                          <el-menu-item-group>
                            <el-menu-item v-for="d in folder.documents" :key="d.id" :index="d.id"
                              @click="getDocumentContent(d.id, d.title)">
                              <font-awesome-icon :icon="['fas', 'file']" /><span class="item">{{ d.title }}</span>
                              <button class="transparent-button-2"
                                @click.stop="showDeleteDocumentDialog(d.id)"><font-awesome-icon
                                  :icon="['fas', 'trash']" />
                              </button>
                            </el-menu-item>
                          </el-menu-item-group>
                        </el-sub-menu>
                      </div>
                      <el-menu-item v-for="document in rootDocuments" :key="document.id" :index="document.id"
                        @click="changeDocument(document.id, document.title)">
                        <font-awesome-icon :icon="['fas', 'file']" /><span class="item">{{ document.title }}</span>
                        <button class="transparent-button-2"
                          @click.stop="showDeleteDocumentDialog(document.id)"><font-awesome-icon
                            :icon="['fas', 'trash']" />
                        </button>
                      </el-menu-item>
                    </el-sub-menu>
                  </el-menu>
                </el-col>
              </el-row>
            </el-aside>
          </el-affix>
          <el-dialog v-model="addFolderDialogVisible" title="添加文件夹" @close="closeDialog">
            <el-input v-model="newFolderName" placeholder="文件夹名..."></el-input>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addFolder">添加</el-button>
              <el-button @click="closeDialog">取消</el-button>
            </div>
          </el-dialog>
          <!-- Add Document Dialog -->
          <el-dialog v-model="addDocumentDialogVisible" title="添加文档" @close="closeDialog">
            <el-input v-model="newDocumentName" placeholder="文档名..."></el-input>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addDocument(foldername)">添加</el-button>
              <el-button @click="closeDialog">取消</el-button>
            </div>
          </el-dialog>
          <el-dialog v-model="centerDialogVisible" title="删除" width="30%" center>
            <span>
              确认删除？
            </span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="deleteDocument">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
          <el-dialog v-model="deleteFolderDialogVisible" title="删除" width="30%" center>
            <span>
              确认删除？
            </span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="deleteFolderDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="deleteFolder">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>
          <el-main>
            <el-affix>
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
                      <el-button text @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                        h1
                      </el-button>
                    </template>
                  </el-popover>

                  <!-- 标题按钮 - Heading 2 -->
                  <el-popover placement="top-start" title="Heading 2" :width="100" trigger="hover" content="设置为二级标题">
                    <template #reference>
                      <el-button text @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
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
            </el-affix>

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
      </el-affix>
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
import { saveAs } from 'file-saver';
import { ElMessage } from 'element-plus';
import { getProjId, getName, setDocumentId, getProjectName } from "@/utils/token";
import Clipboard from 'clipboard';
import router from '../../router';
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
const isDialogVisible = ref(false);
const isEditable = ref(false);
const sharedLink = ref('');
const openDialog = () => {
  isDialogVisible.value = true;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(sharedLink.value).then(
    () => {
      console.log('Link copied to clipboard');
      ElMessage({
        message: '复制成功',
        type: 'success'
      })
    },
    (error) => {
      console.error('Failed to copy link', error);
    }
  );
};
const addFolderDialogVisible = ref(false);
const addDocumentDialogVisible = ref(false);
const newFolderName = ref('');
const newDocumentName = ref('');
const deleteFolderDialogVisible = ref(false)
const deleteDocumentId = ref('')
const deleteFolderId = ref('')
const centerDialogVisible = ref(false)
const provider = ref();
const editor = ref();
const status = ref('connecting');
const folderId = ref('')
const documentId = ref(route.params.documentId);
const title = ref('');
const isEditingTitle = ref(false);
const folders = ref([]);
const rootDocuments = ref([])
const projectName = getProjectName()
const currentDocumentName = ref('')
const newTitle = ref(currentDocumentName.value);
const Editable = ref(true)
const showAddFolderDialog = () => {
  addFolderDialogVisible.value = true;
};
const showDeleteDocumentDialog = (dId) => {
  centerDialogVisible.value = true;
  deleteDocumentId.value = dId
}
const showDeleteFolderDialog = (fId) => {
  deleteFolderDialogVisible.value = true;
  deleteFolderId.value = fId
}
const showAddDocumentDialog = (folder) => {
  console.log(folder)
  folderId.value = folder
  addDocumentDialogVisible.value = true;
};

const closeDialog = () => {
  isDialogVisible.value = false;
  addFolderDialogVisible.value = false;
  addDocumentDialogVisible.value = false;
};

const share = () => {

}

const currentUser = ref({
  name: getName(),
  color: getRandomColor()
});
const toggleEditTitle = () => {
  if (isEditingTitle.value) {
    changeDocumentName()
    // 保存标题修改
    currentDocumentName.value = newTitle.value;
  } else {
    // 进入编辑模式时，将原始标题备份到newTitle
    newTitle.value = currentDocumentName.value;
  }
  isEditingTitle.value = !isEditingTitle.value;
};

const wordCss = `
.title {
  height: 64px;
  width: 800px;
  text-align: center;
  line-height: 64px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 500;
  color: rgba(0, 11, 46, 0.85);
}
.all-box {
  position: relative;
}
.all-topic {
  padding: 24px;
}
`

onMounted(async () => {
  await getAllDocuments();
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
    editable: Editable,
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
async function changeDocumentName() {
  try {
    await documentRequest.updateDocument(newTitle.value, getProjId(), documentId)
    currentDocumentName.value = newTitle.value
    getAllDocuments()
    ElMessage({
      message: '保存成功',
      type: 'success'
    })
  }
  catch (error) {
    ElMessage({
      message: '修改失败',
      type: 'error'
    })
  }
}
const getAllDocuments = async () => {
  const result = await documentRequest.getAllDocuments(getProjId())
  // Simulating the API response
  const response = result.data
  console.log(response)
  // Process the response to generate folder/document structure
  processDocuments(response);
};


const processDocuments = (data) => {
  rootDocuments.value = []
  folders.value = []
  data.forEach(item => {
    if (item.folder === null) {
      rootDocuments.value.push(item)
    } else {
      folders.value.push(item)
    }
  });

};
async function generateLink() {
  // 在这里生成共享链接，可以根据 isEditable 的值来决定是否允许编辑
  const baseUrl = window.location.host + 'shared/';
  console.log(documentId.value, isEditable.value)
  await documentRequest.createShareLink(documentId.value, isEditable.value)
  sharedLink.value = baseUrl + documentId.value;
};
async function saveDocument() {
  try {
    const content = editor.value.getHTML();
    console.log(content)
    console.log(documentId)
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
async function deleteFolder() {
  try {
    deleteFolderDialogVisible.value = false;
    console.log(deleteFolderId.value)
    await documentRequest.deleteFolder(getProjId(), deleteFolderId.value)
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    getAllDocuments()
  } catch (error) {
    ElMessage({
      message: '删除失败',
      type: 'error'
    });
  }
}
async function deleteDocument() {
  try {
    centerDialogVisible.value = false
    await documentRequest.deleteDocument(getProjId(), deleteDocumentId.value)
    ElMessage({
      message: '删除成功',
      type: 'success'
    })
    getAllDocuments()
  }
  catch (error) {
    ElMessage({
      message: '删除失败',
      type: 'error'
    });
  }
}
async function addFolder() {
  try {
    await documentRequest.createFolder(newFolderName.value, getProjId());
    await getAllDocuments();
    ElMessage({
      message: '创建成功',
      type: 'success'
    })
  }
  catch (error) {
    ElMessage({
      message: '创建失败',
      type: 'error'
    })
  }
  // Implement logic to add a new folder using newFolderName.value
  closeDialog();
};
async function changeDocument(document, documentName) {
  try {
    router.push(`/document/${document}`)
    documentId.value = document
    currentDocumentName.value = documentName
    // const response = await documentRequest.getDocumentContent(document)
    // console.log("content:", response.data.content)
    // if (response.data.detail === "已授权阅读") {
    //   editor.value.commands.setContent(response.data.content)
    //   if (response.data.editable === false) {
    //     editor.value.setEditable(false)
    //   }
    //   else {
    //     editor.value.setEditable(true)
    //   }
    // } else {
    //   ElMessage({
    //     message: '你没有权限阅读',
    //     type: 'error'
    //   })
    // }
  }
  catch (error) {
    ElMessage({
      message: '文档获取失败',
      type: 'error'
    })
  }
}
async function addDocument() {
  try {
    await documentRequest.createDocument(getProjId(), newDocumentName.value, folderId.value);
    await getAllDocuments();
    ElMessage({
      message: '创建成功',
      type: 'success'
    })
  }
  catch (error) {
    ElMessage({
      message: '创建失败',
      type: 'error'
    })
  }
  // Implement logic to add a new document using newDocumentName.value
  closeDialog();
};
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
  downloadLink.download = currentDocumentName.value + '.md';
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
    pdf.save(currentDocumentName.value + '.pdf');
  });
}

function getModelHtml(mhtml) {
  return `<!DOCTYPE html>
                <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"
                  xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
                  xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                  <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val="Cambria Math"/><m:brkBin m:val="before"/><m:brkBinSub m:val="--"/><m:smallFrac m:val="off"/><m:dispDef/><m:lMargin m:val="0"/> <m:rMargin m:val="0"/><m:defJc m:val="centerGroup"/><m:wrapIndent m:val="1440"/><m:intLim m:val="subSup"/><m:naryLim m:val="undOvr"/></m:mathPr></w:WordDocument></xml><![endif]-->

                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width,initial-scale=1.0">
                    <title>{{title}}</title>
                    <style>${wordCss}</style>
                </head>
                <body>
                    <div style="display: flex;justify-content: center;">
                      ${mhtml}
                    </div>
                </body>
                </html>`
}

function exportWord() {
  const html = getModelHtml(editor.value.getHTML())
  const blob = new Blob([html], { type: 'application/msword;charset=utf-8' })
  //调用file-saver插件的saveAs方法导出
  saveAs(blob, currentDocumentName.value + '.docx')
}
</script>

<style lang="scss">
.el-col-12 {
  /* max-width: 50%; */
  flex: 0 0 100% !important;
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
    margin-top: 10px;
    justify-content: space-between;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;

    button {
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
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

.title {
  margin-right: 5px;
  font-size: 20px;
  /* Adjust the font size as needed */
  /* other styling properties if necessary */
}

.editor {
  overflow: auto;
}

.edit-title-input {
  font-size: 20px;
}

.changeName {
  background-color: #FFF;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.transparent-button-1 {
  border: none;
  background-color: transparent;
  padding-left: 20px;
  /* Optional: Remove padding if needed */
  cursor: pointer;
}

.transparent-button-2 {
  border: none;
  background-color: transparent;
  /* Optional: Remove padding if needed */
  cursor: pointer;
}

.el-menu-item-group__title {
  padding: 0px;
  /* padding: 7px 0 7px var(--el-menu-base-level-padding); */
  /* line-height: normal; */
  /* font-size: 12px; */
  /* color: var(--el-text-color-secondary); */
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>