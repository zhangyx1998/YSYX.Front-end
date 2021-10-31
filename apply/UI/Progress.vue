<template>
  <div Progress
	   style="padding:var(--padding);">
	<span>
	  <span class="number"
			:class="this.$parent.step===1 || this.$parent.step===2 || this.$parent.step===3 || this.$parent.step===4?'bgc':''">
		<span class="num">1</span>
	  </span>
	  <span class="description"
			:style="'color:'+(this.$parent.step===1 || this.$parent.step===2 || this.$parent.step===3 || this.$parent.step===4?'black':'')">
		基本信息
	  </span>
	</span>
	<span>
	  <span class="number"
			:class="this.$parent.step===2 || this.$parent.step===3 || this.$parent.step===4?'bgc':''">
		<span class="num">2</span>
	  </span>
	  <span class="description"
			:style="'color:'+(this.$parent.step===2 || this.$parent.step===3 || this.$parent.step===4?'black':'')">
		选择身份
	  </span>
	</span>
	<span>
	  <span class="number"
			:class="this.$parent.step===3 || this.$parent.step===4?'bgc':''">
		<span class="num">3</span>
	  </span>
	  <span class="description"
			:style="'color:'+(this.$parent.step===3 || this.$parent.step===4?'black':'')">
		上传简历
	  </span>
	</span>
	<span>
	  <span class="number last"
			:class="this.$parent.step===4?'bgc':''">
		<span class="num">4</span>
	  </span>
	  <span class="description"
			:style="'color:'+(this.$parent.step===4?'black':'')">
		确认提交
	  </span>
	</span>
  </div>
</template>
<script>
export default {
  props: ['step'],
}
</script>
<style scoped>
[Progress] {
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: var(--mobile-titlebar-height);
  left: 0;
  right: 0;
  background-color: var(--accent-light);
}
.number {
  display: inline-block;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  background-color: var(--gray-bright);
  line-height: 2.2em;
  text-align: center;
  vertical-align: middle;
  margin-left:0.4em;
  color: var(--white);
  /* 让子元素 呈现3D转换 */
  transform-style: preserve-3d;
}
.number::after {
  content: '';
  height: 1px;
  width: 6em;
  background-color: var(--gray-bright);
  position: absolute;
  top: 1.1em;
  left: 1.1em;
  /* 使用Z轴进行3D 转换  */
  transform: translateZ(-10px);
}
.number .num {
  font-size: 1.6em;
}
.last {
  margin-right: 0;
}
.last::after {
  content: '';
  width: 0px;
  height: 0;
}
.description {
  display: block;
  font-size: 0.6em;
  color: var(--gray-bright);
}
.bgc,
.bgc::after {
  background-color: var(--green);
}
</style>