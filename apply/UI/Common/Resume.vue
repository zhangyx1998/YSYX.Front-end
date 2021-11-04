<script setup>
import Responsive from "/components/Responsive.vue";
</script>

<template>
  <div Entry>
    <div EntryVal>
      <div title>
       		<span en-US>{{ formData['resume']["en-US"]}}</span>
			<span zh-CN>{{ formData['resume']["zh-CN"]}}</span>
      </div>
      <div>
        <input type="file"
               accept="application/pdf"
               ref="fileInput"
               style="display:none"
               @input="update(true)">
        <div class="file_message"
             v-if="resumeName !== ''">
          <div class="img"><i class="far fa-file-pdf"></i></div>
          <div class="content">
            <span class="file_name">{{resumeName}}</span>
            <div class="file_size">{{fileSize}}</div>
            <span class="operation">
              <span style="color:var(--accent);padding-right:4em;"
                    @click="uploadFile">
                {{
					intl({
							"en-US": "Reselect",
							"zh-CN": "重新选择",
						})
					}}
              </span>
              <span style="color:var(--red)"
                    @click="deleteFile">
                {{
					intl({
							"en-US": "Delete",
							"zh-CN": "删除",
						})
					}}</span>
            </span>
          </div>
        </div>
        <div class="upload"
             v-else
             @click="uploadFile">
          <i></i>
          <span>
            {{
					intl({
							"en-US": "Select file (maximum 10M)",
							"zh-CN": "选择文件(最大限10M)",
						})
					}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { intl } from '/util/env.js';
import { formData } from '/apply/formData.json';
export default {
  emits: ['update'],
  data() {
    return {
	  formData,
      resumeName: '',
      fileSize: '',
      fileType: '',
    }
  },
  methods: {
    uploadFile() {
      let fileInput = this.$refs.fileInput;
      fileInput.click();
      fileInput.onchange = () => {
        let file = fileInput.files[0];
        let resumeSize = file.size;
        if (resumeSize / (1024 * 1024) > 10) {
          alert('限制10MB以内');
          return false;
        } else {
          if (resumeSize >= 1024 && resumeSize < 1048576) {
            this.fileSize = parseFloat((resumeSize / 1024).toFixed(2)) + 'KB';
          } else if (resumeSize >= 1048576) {
            this.fileSize = parseFloat((resumeSize / 1048576).toFixed(2)) + 'M';
          } else {
            this.fileSize = parseFloat(resumeSize.toFixed(2)) + 'B';
          }
        }
        this.resumeName = file.name;
        console.log(file);
      }
    },
    update(fileInput = false) {
      if (!fileInput) {
        this.$refs.fileInput.blur();
      } else {
        this.$emit('update', this.$refs.fileInput.files[0]);
      }
    },
    deleteFile() {
      this.resumeName = '';
    },
    intl,
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