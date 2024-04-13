<template>
  <div>
    <div class="resume-upload-container">
      <div class="upload-section word-upload">
        <h2>上传 Word 文件</h2>
        <img class="image-container" src="@/assets/resume/word.png" />
        <label for="word-file" class="file-label">选择 Word 文件</label>
        <input id="word-file" type="file" @change="uploadWordResume" accept=".doc, .docx" style="display: none" />
        <p v-if="wordUploadStatus">{{ wordUploadStatus }}</p>
      </div>


      <div class="divider"></div>

      <div class="upload-section pdf-upload">
        <h2>上传 PDF 文件</h2>
        <img class="image-container" src="@/assets/resume/pdf.jpg" />
        <label for="pdf-file" class="file-label">选择 pdf 文件</label>
        <input id="pdf-file" type="file" @change="uploadPdfResume" accept=".pdf" style="display: none" />
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
export default {
  name: 'resume',
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
      value: '',
    }
  },
  methods: {
    uploadWordResume(event) {
      this.validateAndUpload(event, 'word', ['.doc', '.docx']);
    },
    uploadPdfResume(event) {
      this.validateAndUpload(event, 'pdf', ['.pdf']);
    },
    validateAndUpload(event, fileType, allowedFormats) {
      const file = event.target.files[0];

      if (file) {
        const fileName = file.name;
        const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

        if (allowedFormats.includes(`.${fileExtension}`)) {
          this[`${fileType}UploadStatus`] = '上传成功！';
        } else {
          this[`${fileType}UploadStatus`] = `请使用规定格式上传（${allowedFormats.join(', ')}）`;
        }
      }
    },
    downloadResumeTemplate() {
      // 获取简历模板文件的路径（假设与Vue组件文件在同一目录下）
      const resumeTemplatePath = process.env.BASE_URL + '简历模板.doc'; // 请根据实际情况替换文件名
      // 创建一个链接元素
      const link = document.createElement('a');
      // 设置链接的 href 属性为简历模板文件的路径
      link.href = resumeTemplatePath;
      // 设置链接的下载属性为简历模板文件的文件名
      link.download = '简历模板.doc'; // 请根据实际情况替换文件名
      // 将链接添加到文档中
      document.body.appendChild(link);
      // 触发点击事件
      link.click();
      // 删除链接元素
      document.body.removeChild(link);
    }
  },
};
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
  /* 设置分隔线为固定宽度 */
  border-left: 2px dashed #ccc;
  margin: 0 20px;
  /* 分隔线与上传部分的间距 */
  align-self: stretch;
  /* 使分隔线与上传部分等高 */
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
  /* 使图片在容器中自适应宽度 */
  max-height: 80%;
  /* 使图片在容器中自适应高度 */
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
  /* 将空间分配给两个元素 */
}

.expected-position {
  padding: 0px 100px;
  font-size: 18px;
  margin-right: 20px;
}

.resume-template-button {
  text-align: right;
  font-size: 18px;
  padding: 0px 100px;

}
</style>
