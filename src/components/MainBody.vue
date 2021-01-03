<template>
  <div id="main-body">
    <!-- app header -->
    <!-- start -->
    <header class="app-header">
      <h2 class="app-logo">Todo</h2>
      <div class="app-mode" @click="convertMode">
        <img src="./../assets/icon-sun.svg" alt="light mode" />
      </div>
    </header>
    <!-- end -->

    <!-- create todo box  -->
    <!-- start -->
    <div class="create-todo-box">
      <input
        type="text"
        placeholder="Create a new todo..."
        v-model="taskValue"
        @keydown="createTask"
      />
      <div class="circle-check"></div>
    </div>
    <!-- end  -->

    <!-- todo list -->
    <!-- start -->
    <div class="todo-list">
      <div class="create-area">
        <ul class="all-tasks" id="sortable"></ul>
        <ul class="active-tasks"></ul>
        <ul class="completed-tasks"></ul>
      </div>
      <div class="control-menu">
        <span class="todo-info">{{ activeTasks.length }} items left</span>
        <div class="desktop-controller">
          <div class="controllers">
            <span
              class="all"
              @click="showSelected('.all', '.all-tasks', currentTasks)"
              >All</span
            >
            <span
              class="active"
              @click="showSelected('.active', '.active-tasks', activeTasks)"
              >Active
            </span>
            <span
              class="completed"
              @click="
                showSelected('.completed', '.completed-tasks', completedTasks)
              "
              >Completed</span
            >
          </div>
        </div>
        <span class="clear" @click="clearCompleted">Clear Completed</span>
      </div>
    </div>
    <!-- end -->

    <!-- media solve -->
    <!-- start -->
    <div class="mobile-controller">
      <div class="controllers">
        <span
          class="all"
          @click="showSelected('.all', '.all-tasks', currentTasks)"
          >All</span
        >
        <span
          class="active"
          @click="showSelected('.active', '.active-tasks', activeTasks)"
          >Active
        </span>
        <span
          class="completed"
          @click="
            showSelected('.completed', '.completed-tasks', completedTasks)
          "
          >Completed</span
        >
      </div>
    </div>
    <!-- end -->

    <!-- footer notice -->
    <!-- start -->
    <footer class="footer-notice">
      <span>Feel free in add and remove tasks</span>
    </footer>
    <!-- end -->
  </div>
</template>

<script>
//== import jquery ==//
//== start ==//
import $ from "jquery";
//== end ==//

export default {
  name: "MainBody",

  data() {
    return {
      mode: localStorage.getItem("mode") ? localStorage.getItem("mode") : 1,
      taskValue: "",
      currentTasks: JSON.parse(localStorage.getItem("currentTasks"))
        ? JSON.parse(localStorage.getItem("currentTasks"))
        : [],
      allTasks: JSON.parse(localStorage.getItem("allTasks"))
        ? JSON.parse(localStorage.getItem("allTasks"))
        : [],
      activeTasks: JSON.parse(localStorage.getItem("activeTasks"))
        ? JSON.parse(localStorage.getItem("activeTasks"))
        : [],
      completedTasks: JSON.parse(localStorage.getItem("completedTasks"))
        ? JSON.parse(localStorage.getItem("completedTasks"))
        : [],
      indictorState: localStorage.getItem("indictorState")
        ? localStorage.getItem("indictorState")
        : 1,
    };
  },

  methods: {
    //== method to convert mode ==//
    //== start ==//
    convertMode() {
      if (this.mode == 0) {
        this.mode = 1;
      } else {
        this.mode = 0;
      }
      localStorage.setItem("mode", this.mode);
      this.createMode(this.mode);
    },
    //== end ==//

    //== method to create mode ==//
    //== start ==//
    createMode(mode) {
      var moonImg = require("./../assets/icon-moon.svg");
      var sunImg = require("./../assets/icon-sun.svg");
      var bgImgLight = require("./../assets/bg-desktop-light.jpg");
      var bgImgDrak = require("./../assets/bg-desktop-dark.jpg");
      var MobgImgLight = require("./../assets/bg-mobile-light.jpg");
      var MobgImgDrak = require("./../assets/bg-mobile-dark.jpg");
      if (mode == 1) {
        $(":root").css({
          "--color3": "hsl(0, 0%, 98%)",
          "--color4": "hsl(236, 33%, 92%)",
          "--color5": "hsl(233, 11%, 84%)",
          "--color6": "hsl(236, 9%, 61%)",
          "--color7": "hsl(235, 19%, 35%)",
          "--color8": "white",
          "--desktopBg": `url(${bgImgLight})`,
          "--mobileBg": `url(${MobgImgLight})`,
        });
        $(".app-mode img").attr("src", sunImg);
      } else {
        $(":root").css({
          "--color3": "hsl(235, 21%, 11%)",
          "--color4": "hsl(235, 19%, 35%)",
          "--color5": "hsl(234, 39%, 85%)",
          "--color6": " hsl(236, 33%, 92%)",
          "--color7": "hsl(234, 39%, 85%)",
          "--color8": "hsl(235, 24%, 19%)",
          "--desktopBg": `url(${bgImgDrak})`,
          "--mobileBg": `url(${MobgImgDrak})`,
        });
        $(".app-mode img").attr("src", moonImg);
      }
    },
    //== end ==//

    //== method to create task ==//
    //== start ==//
    createTask(e) {
      if (e.key == "Enter") {
        if(this.taskValue == ''){
            this.controlMessage("empty");
        }else{
            $(".create-area").hide().show();
            this.allTasks.push(this.taskValue);
            var index = this.allTasks.indexOf(this.taskValue);
            var newTask = {
            id: index,
            info: this.taskValue,
            done: false,
            };
            this.currentTasks.push(newTask);
            this.activeTasks.push(newTask);
            $(".create-todo-box input").val("");
            this.taskValue = "";
            localStorage.setItem("allTasks", JSON.stringify(this.allTasks));
        }
      }
    },
    //== end ==//

    //== method to move between all and active and completed tasks ==//
    //== start ==//
    showSelected(selector1, selector2, arr) {
      this.activeTasks = this.currentTasks.filter((el) => {
        return el.done == false;
      });
      this.completedTasks = this.currentTasks.filter((el) => {
        return el.done == true;
      });
      $(".all").css("color", "var(--color6");
      $(".active").css("color", "var(--color6");
      $(".completed").css("color", "var(--color6");
      $(selector1).css("color", "var(--color1)");

      $(".all-tasks").hide();
      $(".active-tasks").hide();
      $(".completed-tasks").hide();
      if (arr.length == 0) {
        $(selector2).fadeIn(700);
        var message =
          selector2 == ".completed-tasks"
            ? "There are no completed tasks"
            : "There are no tasks to do";
        $(selector2).html(`
                <div class="no-task">
                    <span>${message}</span>
                </div>
                `);
      } else {
        $(selector2).slideDown(700);
      }
      if (!(selector2 == ".all-tasks")) {
        this.createTasksDom(arr, selector2);
      }
      switch (selector1) {
        case ".all":
          localStorage.setItem("indictorState", 1);
          break;
        case ".active":
          localStorage.setItem("indictorState", 2);
          break;
        case ".completed":
          localStorage.setItem("indictorState", 3);
          break;
        default:
          break;
      }
    },
    //== end ==//

    //== method to indicate completed tasks ==//
    //== start ==//
    indicateCompleted(i) {
      $(`#check${i} img`).toggle();
      if (!($(`#check${i} img`).css("display") == "none")) {
        $(`#check${i}`).css("background-image", "var(--color2)");
        $(`#info${i}`).css({
          "text-decoration-line": "line-through",
          color: "var(--color4)",
        });
        this.currentTasks[i].done = true;
      } else {
        $(`#check${i}`).css("background-image", "none");
        $(`#info${i}`).css({
          "text-decoration-line": "none",
          color: "var(--color7)",
        });
        this.currentTasks[i].done = false;
      }
      localStorage.setItem("currentTasks", JSON.stringify(this.currentTasks));
      if (true) {
        this.activeTasks = this.currentTasks.filter((el) => {
          return el.done == false;
        });
        this.completedTasks = this.currentTasks.filter((el) => {
          return el.done == true;
        });
      }
    },
    //== end ==//

    //== method to create tasks dom ==//
    //== start ==//
    createTasksDom(arr, selector) {
      if (arr.length == 0) {
        var message =
          selector == ".completed-tasks"
            ? "There are no completed tasks"
            : "There are no tasks to do";
        $(selector).html(`
                <div class="no-task">
                    <span>${message}</span>
                </div>
                `);
      } else {
        var tasksDom = arr.map((el) => {
          var checkImg = require("./../assets/icon-check.svg");
          var crossImg = require("./../assets/icon-cross.svg");
          return `
            <li class="ui-state-default">
                <div class="task">
                        <div>
                            <span class="task-info" id="info${arr.indexOf(
                              el
                            )}">${el.info}</span>
                        <div class="check" id="check${arr.indexOf(el)}">
                            <img src="${checkImg}" alt="check">
                        </div>
                        </div>
                        <div class="cross-con">
                            <img src="${crossImg}" alt="cross">
                        </div>
                 </div>
            </li>
                `;
        });
        $(selector).html("");
        for (let i = 0; i < arr.length; i++) {
          $(selector).append(tasksDom[i]);
          if (arr.done) {
            indicateCompleted(i);
          }
        }
      }
    },
    //== end ==//

    //== method to clear completed tasks ==//
    //== start ==//
    clearCompleted() {
      this.completedTasks = [];
      this.currentTasks = this.activeTasks;
      this.createTasksDom(this.completedTasks, ".completed-tasks");
      this.createTasksDom(this.currentTasks, ".all-tasks");
    },
    //== end ==//

    //== method to delete task ==//
    //== start ==//
    deleteTask(i) {
      var deletedTask = this.currentTasks[i];
      this.currentTasks = this.currentTasks.filter((el) => {
        return el != deletedTask;
      });
    },
    //== end ==//

    //== method to control message error ==//
    //== start ==//
    controlMessage(er){
        var myerror = document.getElementById("myerror");
        myerror.style.display="flex";
        var myerrorbox = document.getElementById("msg_con");
        if(er == "empty"){
          myerrorbox.innerHTML = `
          <p class="text-center">Task can't be empty
            </p>
            <p class="text-center mb-2"></p>
        `
        }
    },
    //== end ==//
  },

  watch: {
    currentTasks() {
      this.createTasksDom(this.currentTasks, ".all-tasks");
      var checkArr = document.querySelectorAll(".check");
      var deletorArr = document.querySelectorAll(".cross-con");
      var tasks = document.querySelectorAll(".task");
      for (let i = 0; i < checkArr.length; i++) {
        checkArr[i].addEventListener("click", () => {
          this.indicateCompleted(i);
        });
        deletorArr[i].addEventListener("click", () => {
          this.deleteTask(i);
          if (this.currentTasks.length == 0) {
            this.activeTasks = this.currentTasks.filter((el) => {
              return el.done == false;
            });
            this.completedTasks = this.currentTasks.filter((el) => {
              return el.done == true;
            });
            $("#sortable").sortable();
            $("#sortable").disableSelection();
          }
        });
      }
      for (let i = 0; i < this.currentTasks.length; i++) {
        if (this.currentTasks.length != 0) {
          if (this.currentTasks[i].done) {
            this.indicateCompleted(i);
          }
        }
      }
      localStorage.setItem("currentTasks", JSON.stringify(this.currentTasks));
      $(".create-area").getNiceScroll().resize();
    },

    activeTasks() {
      this.createTasksDom(this.activeTasks, ".active-tasks");
      localStorage.setItem("activeTasks", JSON.stringify(this.activeTasks));
    },

    completedTasks() {
      this.createTasksDom(this.completedTasks, ".completed-tasks");
      localStorage.setItem(
        "completedTasks",
        JSON.stringify(this.completedTasks)
      );
    },
  },

  mounted() {
    //== add niceScroll to create-area ==//
    //== start ==//
    $(".create-area").niceScroll({
      cursorcolor: "var(--color1)",
      cursorborder: "none",
      cursorwidth: "5px",
    });
    $(".create-area").getNiceScroll().resize();
    //== end ==//

    //== always at start run all ==//
    //== start ==//
    if (this.indictorState == 1) {
      this.showSelected(".all", ".all-tasks", this.currentTasks);
    } else if (this.indictorState == 2) {
      this.showSelected(".active", ".active-tasks", this.activeTasks);
    } else {
      this.showSelected(".completed", ".completed-tasks", this.completedTasks);
    }
    this.createTasksDom(this.currentTasks, ".all-tasks");
    this.currentTasks = [];
    this.currentTasks = JSON.parse(localStorage.getItem("currentTasks"))
      ? JSON.parse(localStorage.getItem("currentTasks"))
      : [];
    //== end ==//

    //== to save color after refresh ==//
    //== start ==//
    this.createMode(this.mode);
    //== end ==//
  },
};
</script>

<style lang="scss" scoped>
//== layout of main-body style ==//
//== start ==//
#main-body {
  width: 543px;
  margin: auto;
  padding-top: 76px;
  padding-bottom: 52px;
  position: relative;
  z-index: 1;
  height: 100%;
}
//== end ==//

//== app header style ==//
//== start ==//
.app-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 44px;
  .app-logo {
    text-transform: uppercase;
    color: white;
    font-size: 2.3em;
  }
  .app-mode {
    cursor: pointer;
  }
}
//== end ==//

//== create-todo-box style ==//
//== start ==//
.create-todo-box {
  position: relative;
  input {
    width: 100%;
    padding: 20px 57px;
    padding-right: 0;
    border: none;
    outline: none;
    background-color: var(--color8);
    color: var(--color7);
    font-size: 0.91em;
    border-radius: 5px;
    &::placeholder {
      color: var(--color5);
    }
  }
  .circle-check {
    position: absolute;
    top: 49%;
    left: 25px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: transparent;
    border: 1px solid var(--color4);
  }
}
//== end ==//

//== todo list style ==//
//== start ==//
.todo-list {
  margin-top: 24px;
  width: 100%;
  background-color: var(--color8);
  box-shadow: 0px 20px 19px 11px #00000030;
  border-radius: 5px;
  overflow: hidden;
  cursor: default;
  .create-area {
    width: 100%;
    height: 394px;
    overflow-y: auto;
    div {
      height: 100%;
    }
  }
  .control-menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 25px;
    border: 1px solid transparent;
    border-top-color: var(--color4);
    span {
      cursor: pointer;
      color: var(--color6);
      font-weight: 800;
      font-size: 0.8em;
    }
    .todo-info {
      cursor: default;
      font-weight: 400;
    }
    .controllers {
      .all {
        color: var(--color1);
      }
      .active {
        margin-left: 21px;
        margin-right: 21px;
      }
      span {
        &:hover {
          transition: all 0.3s;
          color: var(--color7);
        }
      }
    }
    .clear {
      font-weight: 300;
      &:hover {
        transition: all 0.3s;
        color: var(--color7);
      }
    }
  }
}
//== end ==//

//== footer notice style ==//
//== start ==//
.footer-notice {
  margin-top: 48px;
  text-align: center;
  span {
    cursor: default;
    color: var(--color6);
    font-weight: 700;
    font-size: 0.8em;
    margin-right: 30.5px;
  }
}
//== end ==//

//== media of main-body ==//
//== start ==//
@media screen and (max-width: 630px) {
  #main-body {
    min-width: 100%;
    max-width: 100%;
  }
}
//== end ==//

//== media of controller box ==//
//== start ==//
@media screen and (min-width: 630px) {
  .desktop-controller {
    display: block;
  }
  .mobile-controller {
    display: none;
  }
}
@media screen and (max-width: 630px) {
  .desktop-controller {
    display: none;
  }
  .mobile-controller {
    display: block;
    margin-top: 18px;
    text-align: center;
    background-color: var(--color8);
    border-radius: 5px;
    padding: 18px;
    box-shadow: 1px 1px 8px 1px rgba(0, 0, 0, 0.247);
    span {
      cursor: pointer;
    }
    .active {
      margin-right: 22px;
      margin-left: 22px;
    }
  }
}
//== end ==//
</style>