<template>
  <div Entry>
    <div EntryVal>
      <div title>
        <slot></slot>
      </div>
      <div>
        <div v-if="resumeName !== ''">{{resumeName}}</div>
        <div class="upload"
             v-else
             @click="uploadFile">
          <input type="file"
                 ref="fileInput"
                 style="display:none">
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
    }
  },
  methods: {
    uploadFile() {
      let fileInput = this.$refs.fileInput
      fileInput.click()
      fileInput.onchange = () => {
        let file = fileInput.files[0]
        this.resumeName = file.name
        console.log(file)
        this.$emit('update', 'resume', file)
      }
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
  /* border: 1px solid var(--gray-bright); */
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
  color: #aaa;
}
</style>