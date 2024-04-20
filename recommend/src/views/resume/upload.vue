<template>
  <div>
    <div class="resume-upload-container">
      <div class="upload-section word-upload">
        <h2>上传 Word 文件</h2>
        <img class="image-container" src="@/assets/resume/word.png">
        <label for="word-file" class="file-label">选择 Word 文件</label>
        <input ref="wordFileInput" id="word-file" type="file" accept=".doc, .docx" style="display: none" @change="uploadWordResume">
        <p v-if="wordUploadStatus">{{ wordUploadStatus }}</p>
      </div>

      <div class="divider" />

      <div class="upload-section pdf-upload">
        <h2>上传 PDF 文件</h2>
        <img class="image-container" src="@/assets/resume/pdf.jpg">
        <label for="pdf-file" class="file-label">选择 PDF 文件</label>
        <input ref="pdfFileInput" id="pdf-file" type="file" accept=".pdf" style="display: none" @change="uploadPdfResume">
        <p v-if="pdfUploadStatus">{{ pdfUploadStatus }}</p>
      </div>
    </div>

    <div class="container">
      <div class="expected-position">
        <label for="expected-position">期望岗位：</label>
        <el-select ref="select" v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <div class="resume-template-button">
        <el-button type="primary" @click="downloadResumeTemplate">简历模板</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Resume',
  data() {
    return {
      wordUploadStatus: '',
      pdfUploadStatus: '',
      dialogTableVisible: false,
      options: [
        { value: '选项1', label: '软件工程师' },
        { value: '选项2', label: '前端' },
        { value: '选项3', label: '网络工程师' },
        { value: '选项4', label: '运维' },
        { value: '选项5', label: '软件实施' },
        { value: '选项6', label: '算法工程师' },
        { value: '选项7', label: '测试工程师' },
        { value: '选项8', label: '计算机老师' },
        { value: '选项9', label: '推广' },
        { value: '选项10', label: '硬件工程师' },
        { value: '选项11', label: '其他' }
      ],
      value: ''
    }
  },
  methods: {
    uploadWordResume(event) {
      this.validateAndUpload(event, 'word', ['.doc', '.docx']);
      event.target.value = null
    },
    uploadPdfResume(event) {
      this.validateAndUpload(event, 'pdf', ['.pdf']);
      event.target.value = null
    },
    validateAndUpload(event, fileType, allowedFormats) {
      const file = event.target.files[0]
      if (file) {
        const fileName = file.name
        const fileExtension = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
        if (allowedFormats.includes(`.${fileExtension}`)) {
          this[`${fileType}UploadStatus`] = '正在上传...'
          const formData = new FormData()
          formData.append('file', file)
          axios.post('/api/algorithm/resumeData/addAndReturnSuggestions', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              this[`${fileType}UploadStatus`] = '上传成功！'
              this.data = JSON.parse(response.data.data)
              // 使用 Vuex action 来更新 store
              this.$store.dispatch('evaluation/updateData', this.data)
              console.log('上传成功', response)
            })
            .catch(error => {
              this[`${fileType}UploadStatus`] = '上传失败，请重试。'
              console.error('上传失败', error)
            })
        } else {
          this[`${fileType}UploadStatus`] = `请使用规定格式上传（${allowedFormats.join(', ')}）`;
        }
      } else {
        this[`${fileType}UploadStatus`] = '请选择文件后再上传'
      }
    },
    downloadResumeTemplate() {
      const resumeTemplatePath = process.env.BASE_URL + '简历模板.doc'
      const link = document.createElement('a')
      link.href = resumeTemplatePath
      link.download = '简历模板.doc'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style scoped>
.resume-upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.upload-section {
  text-align: center;
  margin: 10px;
}

.divider {
  flex: 0 0 1px;
  border-left: 2px dashed #ccc;
  margin: 0 20px;
  align-self: stretch;
}

input[type="file"] {
  font-size: 18px;
  padding: 30px 90px;
  border-radius: 10px;
  outline: none;
  transition: all 0.3s ease;
  text-align: center;
  width: 70%;
}

p {
  margin-top: 10px;
  color: red;
  font-size: 16px;
}

.image-container {
  text-align: center;
}

img {
  max-width: 80%;
  max-height: 80%;
  margin-top: 30px;
}

.file-label {
  cursor: pointer;
  display: inline-block;
  margin: 25px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.file-label:hover {
  background-color: #0056b3;
}

.container {
  display: flex;
  justify-content: space-between;
}

.expected-position,
.resume-template-button {
  flex: 1;
}

.expected-position {
  padding: 0px 100px;
  font-size: 18px;
  margin-right: 20px;
}

.resume-template-button {
  text-align:right;
  font-size: 18px;
  padding: 0px 100px;
}
</style>
