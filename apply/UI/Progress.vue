<template>
	<div Progress style="width:100%;height:3em;"> 
		<span class="number">1</span>
		<span class="number">2</span>
		<span class="number">3</span>
		<span class="number">4</span>
	</div>
</template>
<style scoped>
[Progress]{
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top:var(--mobile-navibar-height);
	left: 0;
	background-color: var(--accent-light);
}
.number{
	display: inline-block;
	width:2.2em;
	height:2.2em;
	border-radius:50%;
	background-color:var(--green);
	line-height:2.2em;
	text-align:center;
	vertical-align:middle;
	margin-right: 3.6em;	
	color:#fff;
   /* 让子元素 呈现3D转换 */
	transform-style: preserve-3d;
}
.number::after{
	content: '';
	height: 1px;
	width: 5.5em;
	background-color: var(--gray);
	position: absolute;
    top: 1.1em;
    left: 1.1em;
   /* 使用Z轴进行3D 转换  */
	transform: translateZ(-10px)
}
.number:last-child{
	margin-right: 0;
}
.number:last-child::after{
	content: '';
	height: 0;
	width: 0;
}

</style>