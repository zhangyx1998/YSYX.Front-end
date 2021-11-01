<template>
  <div Entry>
    <div EntryVal>
      <div title>
        <slot></slot>
      </div>
      <div>
        <input type="file"
               ref="fileInput"
               style="display:none">
        <div class="file_message"
             v-if="resumeName !== ''">
          <div class="img"
               v-if="fileType==='pdf'"><i class="far fa-file-pdf"></i></div>
          <div class="img"
               v-else-if="fileType==='doc'"><i class="far fa-file-word"></i></div>
          <div class="img"
               v-else><i class="far fa-file"></i></div>
          <div class="content">
            <span class="file_name">{{resumeName}}</span>
            <div class="file_size">{{fileSize}}</div>
            <span class="operation">
              <span style="color:var(--accent);padding-right:3em;"
                    @click="uploadFile">重新选择</span>
              <span style="color:var(--red)"
                    @click="deleteFile">删除</span>
            </span>
          </div>
        </div>
        <div class="upload"
             v-else
             @click="uploadFile">
          <i></i>
          <span>选择文件(最大限10M)</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resumeName: '',
      fileSize: '',
      fileType: '',
    }
  },
  methods: {
    uploadFile() {
      let fileInput = this.$refs.fileInput
      fileInput.click()
      fileInput.onchange = () => {
        let file = fileInput.files[0]
        this.resumeName = file.name
        if (file.size >= 1000 && file.size < 1000000) {
          this.fileSize = parseFloat((file.size / 1000).toFixed(2)) + 'KB'
        } else if (file.size >= 1000000) {
          this.fileSize = parseFloat((file.size / 1000000).toFixed(2)) + 'M'
        } else {
          this.fileSize = 'file size is not correct'
        }
        let index = file.name.lastIndexOf('.')
        let ext = file.name.substr(index + 1)
        if (ext == 'pdf') {
          this.fileType = 'pdf'
        } else if (ext == 'doc' || ext == 'docx') {
          this.fileType = 'doc'
        } else {
          this.fileType = 'txt'
        }
        console.log(file)
        this.$emit('update', 'resume', file)
      }
    },
    deleteFile() {
      this.resumeName = ''
    },
  },
}
</script>
<style scoped>
.upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7em;
  padding: 0;
  border-radius: 5px;
  background-color: var(--gray-background);
  color: var(--gray-bright);
}
.upload i {
  width: 2.5em;
  height: 2.5em;
  margin: 0.5em auto 0.3em;
  background: url(../../../res/upload-pc.svg) no-repeat;
}
.upload span {
  font-size: 0.8em;
  color: var(--gray);
  opacity: 0.5;
}
.file_message {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--gray-background);
  padding: 1em;
  border: 1px solid var(--gray-border);
  border-radius: 5px;
}
.file_message .img {
  font-size: 2.8em;
  color: var(--gray);
  padding-right: 0.5em;
}
.file_name {
  font-size: 1.2em;
  color: var(--gray);
}
.file_size {
  margin-top: 0.5em;
  font-size: 0.8em;
  color: var(--gray);
  opacity: 0.6;
}
.operation > * {
  position: absolute;
  right: 1em;
  bottom: 0.5em;
  font-size: 0.8em;
}
</style>