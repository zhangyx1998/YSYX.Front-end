<template>
  <div>
    <section class="page1">
      <div class="question">
        <div class="title">
          <span class="star">*</span>
          <span class="answerTitle">姓&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
        </div>
        <input
          type="text"
          class="inputContent"
          ref="name"
          v-model="name"
          placeholder="请输入2～20个字符"
        />
        <i class="fa fa-times" id="name" style="display: none;"></i>
      </div>
      <div class="question">
        <div class="title">
          <span class="star">*</span>
          <span class="answerTitle">电&nbsp;&nbsp;&nbsp;&nbsp;话:</span>
        </div>
        <input
          type="text"
          class="inputContent"
          ref="phone"
          v-model="phone"
          placeholder="请输入11位数字"
        />
        <i class="fa fa-times" id="phone" style="display: none;"></i>
      </div>
      <div class="question">
        <div class="title">
          <span class="star">*</span>
          <span class="answerTitle">邮&nbsp;&nbsp;&nbsp;&nbsp;箱:</span>
        </div>
        <input
          type="text"
          class="inputContent"
          ref="email"
          v-model="email"
          placeholder="请输入您的常用邮箱"
        />
        <i class="fa fa-times" id="email" style="display: none;"></i>
      </div>
      <div class="question">
        <div class="title">
          <span class="star">*</span>
          <span class="answerTitle">学&nbsp;&nbsp;&nbsp;&nbsp;校:</span>
        </div>
        <input
          type="text"
          class="inputContent"
          ref="school"
          v-model="school"
          placeholder="请输入你所在的学校或单位"
        />
        <i class="fa fa-times" id="school" style="display: none;"></i>
      </div>
      <div class="question">
        <div class="title">
          <span class="star">*</span>
          <span class="answerTitle">身&nbsp;&nbsp;&nbsp;&nbsp;份:</span>
        </div>
        <ul style="display: inline-block;">
          <li :class="isTeacher ? 'changeColor' : ''" @click="acquireTec()">
            老师
          </li>
          <li :class="isStudent ? 'changeColor' : ''" @click="acquireStu()">
            学生
          </li>
          <i class="fa fa-times" id="identity" style="display: none;"></i>
        </ul>
      </div>
    </section>
    <button class="buttonClick" @click="nextpage2()">下一步</button>
  </div>
</template>
<script>
export default {
  name: 'page1',
  data() {
    return {
      isTeacher: false,
      isStudent: false,
      //基本信息page1

      name: '',
      phone: '',
      email: '',
      school: '',
      identity: '',

      information: {},
    }
  },
  methods: {
    acquireTec() {
      var ui = document.getElementById('identity')
      ui.style.display = 'none'
      this.isTeacher = true
      this.isStudent = false
      this.identity = '老师'
    },
    acquireStu() {
      var ui = document.getElementById('identity')
      ui.style.display = 'none'
      this.isTeacher = false
      this.isStudent = true
      this.identity = '学生'
    },
    nextpage2() {
      //验证name
      if (
        this.$refs.name.value.length < 2 ||
        this.$refs.name.value.length > 20
      ) {
        var ui = document.getElementById('name')
        ui.style.display = 'inline'
        console.log('name is error')
      } else {
        var ui = document.getElementById('name')
        ui.style.display = 'none'
        this.name = this.$refs.name.value
        this.isName = true
      }

      //验证phone
      var s = this.$refs.phone.value
      var r = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (r.test(s)) {
        var ui = document.getElementById('phone')
        ui.style.display = 'none'
        this.phone = this.$refs.phone.value
        this.isPhone = true
      } else {
        var ui = document.getElementById('phone')
        ui.style.display = 'inline'
        console.log('phone is error')
      }

      //验证email
      var str = this.$refs.email.value
      var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (re.test(str)) {
        var ui = document.getElementById('email')
        ui.style.display = 'none'
        this.email = this.$refs.email.value
        this.isEmail = true
      } else {
        var ui = document.getElementById('email')
        ui.style.display = 'inline'
        console.log('email is error')
      }

      //验证school
      if (this.$refs.school.value.length < 1) {
        var ui = document.getElementById('school')
        ui.style.display = 'inline'
        console.log('school is error')
      } else {
        var ui = document.getElementById('school')
        ui.style.display = 'none'
        this.school = this.$refs.school.value
        this.isSchool = true
      }

      //验证identity
      if (this.identity.length < 1) {
        var ui = document.getElementById('identity')
        ui.style.display = 'inline'
        console.log('identity is error')
      } else {
        this.isIdentity = true
      }
      var right =
        this.isName &&
        this.isPhone &&
        this.isEmail &&
        this.isSchool &&
        this.isIdentity
      //   if (right) {
      //     this.isShow_page1 = false
      //     this.isShow_page2 = true
      //     this.isShow_page3 = true
      //   } else {
      //     this.isShow_page1 = true
      //     this.isShow_page2 = false
      //     this.isShow_page3 = false
      //   }
    },
  },
}
</script>
<style scoped>
.title .star {
  color: var(--red);
}
.page1 {
  margin: 2em 0 0.5em 0;
  padding: 1em 0;
  box-shadow: 0 0.25em 0.5em 0 var(--shadow);
  transition: 0.3s;
  border-radius: 5px;
}
.page1:hover {
  box-shadow: 0 0.5em 1em 0 var(--shadow);
}
.page1 .question {
  margin: 1.7em 6em 1.7em 4em;
}
.page1 .question .title {
  display: inline-block;
  /* text-align-last: justify; */
  color: var(--fontcolor);
  margin: 0.25em 2em 0.25em 1em;
}
.page1 .question .inputContent {
  width: 18em;
  height: 2em;
  border: 1px solid var(--fontcolor);
  border-radius: 2px;
}
.page1 .question .inputContent:focus {
  border: 1px solid var(--accent);
}
.page1 .question ul li {
  display: inline-block;
  width: 6.875em;
  border: 1px solid var(--fontcolor);
  border-radius: 2px;
  color: var(--fontcolor);
  text-align: center;
}
.changeColor {
  background-color: var(--dashcolor);
}
.page1 .question ul li:hover {
  cursor: pointer;
  background-color: var(--dashcolor);
  border: 1px solid var(--accent);
}
.page1 .question ul li:first-child {
  margin-right: 1em;
}
.buttonClick {
  width: 10em;
  height: 3em;
  font-size: 1em;
  color: var(--mainbgc);
  background-color: var(--accent);
  margin: 3.5em 0;
  border-radius: 3px;
}
</style>
