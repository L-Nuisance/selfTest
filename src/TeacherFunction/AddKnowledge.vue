<template>
  <div>
    <div
      class="course"
      :class="{ 'collapsed': isCollapsed, 'show-line': isShowLine }"
      :style="{ height: courseHeight + 'px' }"
      id="courseContainer"
    >
      <span class="course-name">{{ content }}</span>
      <span class="add-icon" @click="handleAddClick"><img src="/add.png" alt="Add Item"></span>
      <span class="total-delete-icon" @click="handleDeleteModeClick"><img src="./delete.png" alt="Delete All"></span>
      <span class="Total-Modify-button" @click="handleEditModeClick"><img src="./edit.png" alt="Edit"></span>
      <span class="toggle-btn" @click="toggleText"></span>
      <div id="listContainer" ref="listContainer">
        <div v-for="(item, index) in items" :key="index" class="list-item">
          <span>{{ index + 1 }}. </span>
          <span v-if="!item.isEditing">{{ item }}</span>
          <span v-else>
            <input type="text" v-model="item.editedText">
            <button @click="saveEditedItem(index)">保存</button>
          </span>
          <span class="delete-icon" v-if="!item.isEditing && isDeleteMode" @click="deleteItem(index)">🗑️</span>
          <span v-if="isEditMode && !item.isEditing">
            <span class="edit-icon" @click="openEditAlert(index)">✏️</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store';
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    chapterId:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      teacherId: store.state.user.userId,
      courseId: store.state.course.courseId,
      components:[],
      isShowLine: false,
      isCollapsed: false,
      items: [],
      courseHeight: 50,
      isDeleteMode: false,
      isEditMode: false,
    };
  },
  mounted() {
    // console.log('Chapter ID:', this.chapterId);
    console.log('Chapter ID:', this.chapterId);
    axios.get('http://43.138.136.200:8090/teacher/selectKnowledgePoint', {
  params: {
    courseId: this.courseId,
    chapterId: this.chapterId
  }
})
  .then(response => {
  
  this.items = response.data.list.map(item => item.knowledgePointName);
  this.components= response.data.list;
  this.courseHeight += this.items.length * 35;
  

  })
  .catch(error => {
    console.error('Error fetching chapter names:', error);
  });

	},
  methods: {
    refreshPage() {
		location.reload();
	  },
    deleteKnowledgePointFromBackend(knowledgePointId) {
      const teacherId=this.teacherId;
    // 使用axios或其他HTTP库调用后端API
    axios.post('http://43.138.136.200:8090/teacher/deleteKnowledgePoint',{knowledgePointId,teacherId} )
      .then(response => {
        alert(response.data.prompt);
        console.log('Knowledge point deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting knowledge point:', error);
      });
  },

    sendKnowledgePointToBackend(knowledgePointName) {
    const courseId = this.courseId;
    const chapterId = this.chapterId;
      const teacherId=this.teacherId;
    // 使用axios或其他HTTP库调用后端API
    axios.post('http://43.138.136.200:8090/teacher/insertKnowledgePoint', {
     teacherId,
      courseId,
      chapterId,
      knowledgePointName
    })
      .then(response => {
        alert(response.data.prompt);
        this.refreshPage();
        console.log('Knowledge point added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding knowledge point:', error);
      });
  },

    toggleText() {
      this.isCollapsed = !this.isCollapsed;
    },
    addItem() {
    // 使用 window.prompt 获取用户输入
    const userInput = window.prompt('请输入知识点');

    // 检查用户是否点击了“取消”或输入了空字符串
    if (userInput === null || userInput.trim() === '') {
        return; // 如果输入为空或用户点击了“取消”，则停止执行
    }

    // 检查知识点长度是否超过15个字符
    if (userInput.length > 15) {
        alert('超过最大长度15个字符，请重新输入。');
        return;
    }

    // 检查知识点是否已存在
    if (this.items.includes(userInput)) {
        alert('该知识点已存在，请重新输入。');
        return;
    }

    // 将用户输入添加到 items 列表
    this.sendKnowledgePointToBackend(userInput);

    // 更新列表项编号和课程高度
    this.updateItemNumbers();
    this.courseHeight += 35;
},

    saveEditedItem(index) {
      const currentItem = this.items[index];
      if (currentItem.editedText.trim() === '') {
        alert('输入不能为空，请输入知识点。');
        return; // 如果输入为空，停止执行保存操作
      }
      currentItem.text = currentItem.editedText;
      currentItem.isEditing = false;
      currentItem.editedText = '';
      this.updateItemNumbers();
    },
    deleteItem(index) {
    const deletedItem = this.components[index];
    const knowledgePointId = deletedItem.knowledgePointId;

    // 在删除之前确认
    const isConfirmed = window.confirm('确认要删除这个知识点吗？删除知识点会删除知识点下的所有题目');

    if (isConfirmed) {
        // 从后端删除知识点
        this.deleteKnowledgePointFromBackend(knowledgePointId);

        // 从前端删除知识点
        this.items.splice(index, 1);
        this.updateItemNumbers();
        this.courseHeight -= 35;
        if (this.items.length === 0) {
            this.isShowLine = false;
        }
    }
},


    handleAddClick() {
      if (this.isDeleteMode || this.isEditMode) {
        this.isDeleteMode = false;
        this.isEditMode = false;
        this.$nextTick(() => {
          this.addItem();
        });
      } else {
        this.addItem();
      }
    },
    handleDeleteModeClick() {
      if (this.isEditMode) {
        this.isEditMode = false;
      }
      this.isDeleteMode = !this.isDeleteMode;
      if (this.isDeleteMode) {
        this.$refs.listContainer.classList.add('delete-mode');
      } else {
        this.$refs.listContainer.classList.remove('delete-mode');
      }
    },
    handleEditModeClick() {
      if (this.isDeleteMode) {
        this.isDeleteMode = false;
        this.isEditMode = true;
        this.$refs.listContainer.classList.remove('delete-mode');
      } else {
        this.isEditMode = !this.isEditMode;
      }
    },
    openEditAlert(index) {
    const currentItem = this.items[index];
    const totalItem = this.components[index];
    const userInput = window.prompt('请输入修改后的知识点', currentItem);

    // 检查用户是否点击了“取消”或输入了空字符串
    if (userInput === null || userInput.trim() === '') {
        return; // 如果输入为空或用户点击了“取消”，则停止执行
    }

    // 检查知识点长度是否超过15个字符
    if (userInput.length > 15) {
        alert('超过最大长度15个字符，请重新输入。');
        return;
    }

    // 检查知识点是否已存在
    if (this.items.includes(userInput)) {
        alert('该知识点已存在，请重新输入。');
        return;
    }

    // 获取修改后的知识点名字
    const KnowledgePointName = userInput;

    // 获取修改前的知识点ID
    const KnowledgePointId = totalItem.knowledgePointId;

    // 更新前端数据
    this.items[index] = KnowledgePointName;

    // 向后端发送修改后的知识点信息
    axios.post('http://43.138.136.200:8090/teacher/updateKnowledgePoint', {
        teacher: this.teacherId,
        knowledgePointId: KnowledgePointId,
        knowledgePointName: KnowledgePointName,
        courseId: this.courseId,
        chapterId: this.chapterId
    })
        .then(response => {
            alert(response.data.prompt);
            console.log('Knowledge point edited successfully:', response.data);
        })
        .catch(error => {
            console.error('Error editing knowledge point:', error);
        });
},

    updateItemNumbers() {
      this.$nextTick(() => {
        const items = this.$refs.listContainer.querySelectorAll('.list-item');
        items.forEach((item, index) => {
          const numberSpan = item.querySelector('span');
          numberSpan.textContent = `${index + 1}. `;
        });
      });
    },
  },
};
</script>

<style scoped>
.Total-Modify-button > img {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 11px;
  left: 45%;
}
.course-name {
  display: inline-block;
 
  margin-top: 10px;
 
  margin-left: 20px;
  font-size: 20px;
  line-height: 40px;
}
.course-name::after {
  content: "";
  margin-bottom: 10px;
  width: 100%;
  height: 1px;
  background-color: wheat;
  display: none;
}
.show-line .course-name::after {
  display: block;
}
.collapsed {
  max-height: 50px;
  overflow: hidden;
}
.toggle-btn {
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 90%;
 
  color: blue;
}
.toggle-btn::before {
  content: "▲";
}
.collapsed .toggle-btn::before {
  content: "▼";
}
.course {
  background-color: white;
  width: 70%;
  margin-left: 50px;
  position: relative;
  height: 55px;
  box-shadow:
    5px 5px 5px rgba(0, 0, 0, 0.2),
    -5px -5px 5px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  transition: max-height 0.5s ease;
}
.list-item {
  margin-left: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.edit-icon{
  cursor: pointer;
}
.delete-icon {
  cursor: pointer;
  display: none;
}
.delete-mode .delete-icon {
  display: inline-block;
}
.add-icon > img {
  cursor: pointer;
  position: absolute;
  top: 8px;
  left: 60%;
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
.total-delete-icon > img {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 75%;
  font-size: 20px;
  display: inline-block;
}
</style>
