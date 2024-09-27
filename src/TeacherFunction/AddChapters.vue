<template>
	<div class="OuterBorder">
	  <div class="TotalBorder">
		<!-- 添加按钮 -->
		<span class="AddButton" @click="handleAddClick">
		  <img src="https://th.bing.com/th/id/R.5b1dba59dd53fe67fbaa0ab9480ce097?rik=0p%2bmQHTOf1%2fzow&pid=ImgRaw&r=0" alt="" />
		</span>
  
		<!-- 删除按钮 -->
		<span class="DeleteButton" @click="handleDeleteModeClick">
		  <img src="/DELETEE.png" alt="" />
		</span>
  
		<!-- 编辑按钮 -->
		<span class="EditButton" @click="handleEditModeClick">
		  <img src="/EDITT.png" alt="Edit Icon" />
		</span>
  
		<!-- 渲染已添加的组件A及对应的删除按钮 -->
		<div class="module" v-for="(p, index) in completeChapters" :key="index">
		  <!-- class 通过 props 传递内容给 AddKnowledge 组件 -->
		  <AddKnowledge :content="completeChapters[index].chapterName" :chapterId="completeChapters[index].chapterId" />
		  <!-- 根据 deleteMode 的值决定是否显示删除按钮 -->
		  <button class="action" v-if="deleteMode" @click="deleteComponent(index)">删除</button>
		  <!-- 根据 editMode 的值决定是否显示编辑按钮 -->
		  <button class="action" v-if="editMode" @click="editComponentTitle(index)">修改</button>
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  import AddKnowledge from './AddKnowledge.vue';
  import axios from 'axios';
  import store from '@/store';
  
  export default {
	name: 'AddChapters',
	components: {
	  AddKnowledge,
	},
	data() {
	  return {
		teacherId: store.state.user.userId,
		completeChapters: [],
		courseId: store.state.course.courseId,
		components: [],
		deleteMode: false,
		editMode: false
	  };
	},
	mounted() {
	  axios.get('http://43.138.136.200:8090/teacher/selectChapter?courseId=' + this.courseId)
		.then(response => {
		  this.components = response.data.list.map(chapter => chapter.chapterName);
		  this.completeChapters = response.data.list;
		})
		.catch(error => {
		  console.error('Error fetching chapter names:', error);
		});
	},
	methods: {
	  refreshPage() {
		location.reload();
	  },
  
	  handleAddClick() {
		if (this.deleteMode || this.editMode) {
		  this.deleteMode = false;
		  this.editMode = false;
		  this.$nextTick(() => {
			this.addComponent();
		  });
		} else {
		  this.addComponent();
		}
	  },
  
	  handleDeleteModeClick() {
		if (this.editMode) {
		  this.editMode = false;
		}
		this.deleteMode = !this.deleteMode;
	  },
  
	  handleEditModeClick() {
		if (this.deleteMode) {
		  this.deleteMode = false;
		  this.editMode = true;
		} else {
		  this.editMode = !this.editMode;
		}
	  },
  
	  addComponent() {
    const content = prompt('请输入章节名称：');

    if (content === null) {
      return;
    }

    if (content.trim() === '') {
      alert('输入不能为空，请输入章节名称。');
      return;
    }

    if (content.length > 15) {
      alert('章节名称不能超过15个字符，请重新输入。');
      return;
    }

    const courseId = this.courseId;
    const teacherId = this.teacherId;

    // Check if the chapter name already exists
    if (this.completeChapters.some(chapter => chapter.chapterName === content)) {
      alert('该章节已存在，请重新输入。');
      return;
    }

    axios.post('http://43.138.136.200:8090/teacher/insertChapter', { teacherId, courseId, content })
      .then(response => {
        alert(response.data.prompt);
        this.refreshPage();
      })
      .catch(error => {
        console.error('Error adding chapter:', error);
      });
  },

  
	deleteComponent(index) {
    const deletedChapter = this.completeChapters[index];

    // 在删除前显示确认对话框
    const confirmDelete = window.confirm(`确定要删除章节 ${deletedChapter.chapterName} 吗？删除章节会删除章节下的知识点和题目`);

    if (!confirmDelete) {
        // 用户取消删除操作
        return;
    }

    // 从本地数组中移除章节
    this.completeChapters.splice(index, 1);

    const chapterId = deletedChapter.chapterId;
    const teacherId = this.teacherId;

    // 向后端发送删除请求
    axios.post('http://43.138.136.200:8090/teacher/deleteChapter', { teacherId, chapterId })
        .then(response => {
            alert(response.data.prompt);
            // 退出删除模式
            this.deleteMode = false;
        })
        .catch(error => {
            console.error('删除章节时发生错误:', error);
        });
},

  
editComponentTitle(index) {
    const newTitle = prompt('请输入新的标题：');

    if (newTitle !== null) {
      if (newTitle.trim() === '') {
        alert('输入不能为空，请重新输入。');
        return;
      }

      if (newTitle.length > 15) {
        alert('章节名称不能超过15个字符，请重新输入。');
        return;
      }

      if (this.completeChapters.some(chapter => chapter.chapterName === newTitle)) {
        alert('该章节已存在，请重新输入。');
        return;
      }

      if (typeof this.components[index] === 'string') {
        this.components[index] = newTitle;
        this.completeChapters[index].chapterName = newTitle;
      } else {
        this.components[index].content = newTitle;
        this.completeChapters[index].chapterName.content = newTitle;
      }

      const editedChapter = this.completeChapters[index];

      axios.post('http://43.138.136.200:8090/teacher/updateChapter', {
        courseId: this.courseId,
        chapterId: editedChapter.chapterId,
        chapterName: editedChapter.chapterName,
        teacherId: this.teacherId
      })
        .then(response => {
          alert(response.data.prompt);
          this.editMode = false;
        })
        .catch(error => {
          console.error('Error editing chapter title:', error);
        });
    }
  },
	},
  };
  </script>
<style>
.action {
	cursor: pointer;
	height: 30px;
	width: 80px;
	background-color: blue;
	border-radius: 15px;
	border: none;
	color: white;
	margin-left: 10px;
	margin-top: 10px;
}
  
.OuterBorder {
	/* float: right;
	overflow-y: auto;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2), -5px -5px 5px rgba(0, 0, 0, 0.2);
	width: 1150px;
	height: 600px;
	border-radius: 20px; */
	margin-top: 1.4%;
  background-color: white;
        width: 80%;
        height: 80%;
        border: 1px solid #ccc;
        border-radius: 8px;
		overflow: auto;
}
  
.AddButton>img {
	cursor: pointer;
	height: 50px;
	border: none;
	margin-right: 10%;
	margin-left: 50%;
	margin-bottom: 30px;
}
  
.DeleteButton>img {
	cursor: pointer;
	height: 50px;
	border: none;
	margin-right: 10%;
	margin-bottom: 30px;
}
  
.EditButton>img {
	cursor: pointer;
	height: 47px;
	border: none;
	margin-right: 10%;
	margin-bottom: 30px;
}
  
.module {
	margin-bottom: 10px; /* 调整组件之间的垂直间距 */
}
</style>
  