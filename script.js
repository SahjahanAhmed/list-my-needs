const body = document.body;
const todoAppContainer = document.querySelector(".todo-app-container");
const todoAppContainerBottom = document.querySelector(
  ".todo-app-container-bottom"
);
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const todoList = document.querySelector("#todo-list");
const settingBtn = document.getElementById("setting");
const settingsCard = document.querySelector(".settings-card");
const leftBtn = document.querySelector(".left-arrow-btn");
const selectFontSize = document.querySelector("#select-font-size");
const selectFontColor = document.querySelector("#select-font-color");
const textAppear = document.querySelector("#text-appear");
const selectTheme = document.querySelector("#select-theme");
const selectMode = document.querySelector("#select-mode");
const todoAppSettings = document.querySelector(".todo-app-settings");

const selectedTodosOperation = document.querySelector(
  ".selected-todos-operation"
);
const selectedTodosDelete = document.querySelector(
  ".selected-todos-delete button"
);
const selectedTodosEdit = document.querySelector(".selected-todos-edit button");
const selectedTodosCustomize = document.querySelector(
  ".selected-todos-customize button"
);
const selectedTodosHighlight = document.querySelector(
  ".selected-todos-highlight button"
);
const selectedTodoEditCard = document.querySelector(".selected-todo-edit-card");
const selectedTodoEditCardBackBtn = document.querySelector("#back");
const selectedTodosEditSaveBtn = document.querySelector(
  "#selected-todo-edit-save-btn"
);
const customizeSaveBtn = document.querySelector(".customize-save-btn");
const customizeCardH3 = document.querySelector(".settings-card-top h3");
const selectedTodoHighlightCard = document.querySelector(
  ".selected-todo-highlight-card"
);
const backFromHighlightCardBtn = document.querySelector(
  ".back-from-highlight-card-btn"
);
const saveHighlightCardBtn = document.querySelector(".save-highlight-card-btn");
const howHighlighted = document.getElementsByName("how-highlighted");
const willBeUnselected = document.getElementsByName("will-be-unselect?");
const saveUnhighlightCardBtn = document.querySelector(
  ".save-unhighlight-card-btn"
);

const selectedTodoEditCardTextarea = document.querySelector(
  ".selected-todo-edit-card-textarea"
);

const optionDekstop = document.querySelector(".option1");
const optionTablet = document.querySelector(".option2");
const optionMobile = document.querySelector(".option3");

const themeOption1 = document.querySelector(".theme-option-1");
const themeOption2 = document.querySelector(".theme-option-2");
const themeOption3 = document.querySelector(".theme-option-3");

// mouseenter mouseleave
selectedTodosDelete.addEventListener("mouseenter", (e) => {
  selectedTodosDelete.style.overflow = "visible";
});
selectedTodosDelete.addEventListener("mouseleave", (e) => {
  selectedTodosDelete.style.overflow = "hidden";
});

selectedTodosEdit.addEventListener("mouseenter", (e) => {
  selectedTodosEdit.style.overflow = "visible";
});
selectedTodosEdit.addEventListener("mouseleave", (e) => {
  selectedTodosEdit.style.overflow = "hidden";
});

selectedTodosCustomize.addEventListener("mouseenter", (e) => {
  selectedTodosCustomize.style.overflow = "visible";
});
selectedTodosCustomize.addEventListener("mouseleave", (e) => {
  selectedTodosCustomize.style.overflow = "hidden";
});

selectedTodosHighlight.addEventListener("mouseenter", (e) => {
  selectedTodosHighlight.style.overflow = "visible";
});
selectedTodosHighlight.addEventListener("mouseleave", (e) => {
  selectedTodosHighlight.style.overflow = "hidden";
});
settingBtn.addEventListener("mouseenter", () => {
  settingBtn.classList.add("setting-after-display-block");
});
settingBtn.addEventListener("mouseleave", () => {
  settingBtn.classList.remove("setting-after-display-block");
});

// selected todos operation
// edit operation
selectedTodosEdit.addEventListener("click", (e) => {
  selectedTodoEditCard.style.display = "block";
  todoAppContainer.classList.add("opacity-50");

  let allTodo = document.querySelectorAll("li");
  // alltrues
  let todos = getTodos();
  let allTrues = Array.from(todos).filter((todo2) => {
    if (todo2.isCompleted == true) {
      return todo2;
    }
  });

  if (allTrues.length != 1) {
    selectedTodoEditCard.style.display = "none";
    selectedTodosEdit.style.color = "red";
  }
  if (allTrues.length == 1) {
    selectedTodoEditCardTextarea.value = allTrues[0].inputValue;

    selectedTodosEditSaveBtn.addEventListener("click", () => {
      selectedTodoEditCard.style.display = "none";
      todoAppContainer.classList.remove("opacity-50");
      allTrues[0].inputValue = selectedTodoEditCardTextarea.value;

      Array.from(allTodo).forEach((todo) => {
        if (todo.id == allTrues[0].uniqueId) {
          todo.firstElementChild.innerHTML = selectedTodoEditCardTextarea.value;
        }
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  }

  if (allTrues.length != 1) {
    let editDecision = confirm(
      'you can edit one todo at a time. click "OK" to edit the first todo of your selected list OR click "CANCEL" and select one todo you wanna edit.'
    );

    if (editDecision) {
      let firstTodo = allTrues[0];
      selectedTodoEditCard.style.display = "block";
      selectedTodoEditCardTextarea.value = firstTodo.inputValue;

      selectedTodosEditSaveBtn.addEventListener("click", () => {
        firstTodo.inputValue = selectedTodoEditCardTextarea.value;
        selectedTodoEditCard.style.display = "none";
        localStorage.setItem("todos", JSON.stringify(todos));

        Array.from(allTodo).forEach((todo) => {
          if (todo.id == firstTodo.uniqueId) {
            todo.firstElementChild.innerHTML =
              selectedTodoEditCardTextarea.value;
          }
        });
      });
    }
    if (!editDecision) {
      selectedTodoEditCard.style.display = "none";
    }
  }
});
selectedTodoEditCardBackBtn.addEventListener("click", () => {
  selectedTodoEditCard.style.display = "none";
  todoAppContainer.classList.remove("opacity-50");
});

// customize operation
selectedTodosCustomize.addEventListener("click", () => {
  settingsCard.classList.remove("settings-card-hide");
  settingBtn.style.display = "none";
  todoAppContainer.style.opacity = "50%";
  customizeCardH3.innerHTML = "Customize your selected todos";

  let newList = document.querySelectorAll("li");
  let todos = getTodos();

  let Todos = todos.filter((todo) => {
    let returnAllTrue = todo.isCompleted ? todo : null;
    return returnAllTrue;
  });
  selectFontColor.value = Todos[0].color;
  selectFontSize.value = Todos[0].fontSize;

  selectFontColor.addEventListener("change", (e) => {
    textAppear.style.color = e.target.value;
  });
  selectFontSize.addEventListener("change", (e) => {
    textAppear.style.fontSize = e.target.value;
  });

  leftBtn.addEventListener("click", () => {
    settingsCard.classList.add("settings-card-hide");
    settingBtn.style.display = "block";
    todoAppContainer.style.opacity = "100%";
  });
  customizeSaveBtn.addEventListener("click", () => {
    settingsCard.classList.add("settings-card-hide");
    todoAppContainer.style.opacity = "100%";
    settingBtn.style.display = "block";

    todos.map((Todo) => {
      Array.from(newList).forEach((todo) => {
        if (Todo.isCompleted && Todo.uniqueId == todo.id) {
          Todo.color = selectFontColor.value;
          Todo.fontSize = selectFontSize.value;

          todo.firstElementChild.style.color = selectFontColor.value;
          todo.firstElementChild.style.fontSize = selectFontSize.value;
        }
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  });
});

// highlight operation
selectedTodosHighlight.addEventListener("click", () => {
  todoAppContainer.classList.add("opacity-50");
  let todos = getTodos();
  let newList = document.querySelectorAll("li");

  selectedTodoHighlightCard.classList.remove("highlight-card-hide");

  backFromHighlightCardBtn.addEventListener("click", () => {
    selectedTodoHighlightCard.classList.add("highlight-card-hide");
    todoAppContainer.classList.remove("opacity-50");
  });

  saveHighlightCardBtn.addEventListener("click", () => {
    selectedTodoHighlightCard.classList.add("highlight-card-hide");
    todoAppContainer.classList.remove("opacity-50");

    Array.from(howHighlighted).forEach((highlightedHow) => {
      if (highlightedHow.checked == true && highlightedHow.id == "1") {
        todos.map((Todo) => {
          Array.from(newList).forEach((todo) => {
            if (Todo.uniqueId == todo.id && Todo.isCompleted) {
              todo.firstElementChild.classList.add("highlight-big");
              todo.classList.add("bgc-greenyellow");

              todo.firstElementChild.classList.remove("highlight-medium");
              todo.firstElementChild.classList.remove("highlight-small");

              Todo.isHighlighted = true;
              Todo.highlightBig = true;
              Todo.highlightMedium = false;
              Todo.highlightSmall = false;

              if (Todo.isHighlighted && Todo.highlightSmall) {
                todo.firstElementChild.classList.add("highlight-big");
                todo.classList.add("bgc-greenyellow");
              }
            }
          });
        });
      }

      if (highlightedHow.checked == true && highlightedHow.id == "2") {
        todos.map((Todo) => {
          Array.from(newList).forEach((todo) => {
            if (Todo.uniqueId == todo.id && Todo.isCompleted) {
              todo.firstElementChild.classList.add("highlight-medium");
              todo.classList.add("bgc-greenyellow");

              todo.firstElementChild.classList.remove("highlight-big");
              todo.firstElementChild.classList.remove("highlight-small");

              Todo.isHighlighted = true;
              Todo.highlightMedium = true;
              Todo.highlightBig = false;
              Todo.highlightSmall = false;
            }
          });
        });
      }

      if (highlightedHow.checked == true && highlightedHow.id == "3") {
        todos.map((Todo) => {
          Array.from(newList).forEach((todo) => {
            if (Todo.uniqueId == todo.id && Todo.isCompleted) {
              todo.firstElementChild.classList.add("highlight-small");
              todo.classList.add("bgc-greenyellow");

              todo.firstElementChild.classList.remove("highlight-big");
              todo.firstElementChild.classList.remove("highlight-medium");

              Todo.isHighlighted = true;
              Todo.highlightSmall = true;
              Todo.highlightBig = false;
              Todo.highlightMedium = false;
            }
          });
        });
      }
    });

    Array.from(willBeUnselected).forEach((willBeUnselect) => {
      if (
        willBeUnselect.checked &&
        willBeUnselect.id == "will-be-unselect?yes"
      ) {
        todos.map((Todo) => {
          Array.from(newList).forEach((todo) => {
            if (Todo.uniqueId == todo.id && Todo.isCompleted) {
              Todo.isCompleted = false;
              todo.classList.remove("todo-completed");
              selectedTodosOperation.style.display = "none";
            }
          });
        });
      }

      if (
        willBeUnselect.checked &&
        willBeUnselect.id == "will-be-unselect?no"
      ) {
        todos.map((Todo) => {
          Array.from(newList).forEach((todo) => {
            if (Todo.uniqueId == todo.id && Todo.isCompleted) {
              Todo.isCompleted = true;
              todo.classList.add("todo-completed");
            }
          });
        });
      }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  });

  saveUnhighlightCardBtn.addEventListener("click", () => {
    todoAppContainer.classList.remove("opacity-50");
    selectedTodoHighlightCard.style.display = "none";

    todos.map((Todo) => {
      Array.from(newList).forEach((todo) => {
        if (
          Todo.uniqueId == todo.id &&
          Todo.isHighlighted &&
          Todo.isCompleted
        ) {
          Todo.isHighlighted = false;
          todo.classList.remove("bgc-greenyellow");
          todo.firstElementChild.classList.remove("highlight-big");
          todo.firstElementChild.classList.remove("highlight-medium");
          todo.firstElementChild.classList.remove("highlight-small");
        }
      });
    });

    Array.from(willBeUnselected).forEach((willBeUnselect) => {
      if (
        willBeUnselect.checked &&
        willBeUnselect.id == "will-be-unselect?yes"
      ) {
        todos.map((Todo) => {
          Array.from(newList).forEach((todo) => {
            if (Todo.uniqueId == todo.id && Todo.isCompleted) {
              Todo.isCompleted = false;
              todo.classList.remove("todo-completed");
            }
          });
        });
      }
      if (
        willBeUnselect.checked &&
        willBeUnselect.id == "will-be-unselect?no"
      ) {
        todos.map((Todo) => {
          Array.from(newList).forEach((todo) => {
            if (Todo.uniqueId == todo.id && Todo.isCompleted) {
              Todo.isCompleted = true;
              todo.classList.add("todo-completed");
            }
          });
        });
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  });
});

// dealing with mode
window.addEventListener("resize", () => {
  if (window.innerWidth < "500") {
    optionMobile.selected = true;
    optionTablet.selected = false;
    optionDekstop.selected = false;
  }
  if (window.innerWidth > "500" && window.innerWidth < "850") {
    optionTablet.selected = true;
    optionMobile.selected = false;
    optionDekstop.selected = false;
  }
  if (window.innerWidth > "850") {
    optionDekstop.selected = true;
    optionTablet.selected = false;
    optionMobile.selected = false;
  }
});

// select theme
selectTheme.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "dark":
      body.classList.add("theme-dark");
      body.classList.remove("theme-light");

      break;
    case "light":
      body.classList.add("theme-light");
      body.classList.remove("theme-dark");

      break;

    case "default":
      body.classList.remove("theme-light");
      body.classList.remove("theme-dark");

      break;
  }
});

// select mode
selectMode.addEventListener("change", (e) => {
  switch (e.target.value) {
    case "tablet":
      body.classList.add("mode-tablet");
      body.classList.remove("mode-mobile");
      body.classList.remove("mode-dekstop");

      break;
    case "mobile":
      body.classList.add("mode-mobile");
      body.classList.remove("mode-tablet");
      body.classList.remove("mode-dekstop");

      break;
    case "dekstop":
      body.classList.remove("mode-mobile");
      body.classList.remove("mode-tablet");
      body.classList.add("mode-dekstop");

      break;
  }
});

//dealing with setting btn
settingBtn.addEventListener("click", (e) => {
  e.preventDefault();
  settingBtn.style.display = "none";
  settingsCard.classList.remove("settings-card-hide");
  todoAppContainer.classList.add("opacity-50");
  customizeCardH3.innerHTML = "Customize your todos";

  let todos = getTodos();
  let newList = document.querySelectorAll("li");

  todos.forEach((todo) => {
    selectFontColor.value = todo.color;
    selectFontSize.value = todo.fontSize;
  });

  selectFontSize.addEventListener("change", (e) => {
    textAppear.style.fontSize = e.target.value;
  });

  selectFontColor.addEventListener("change", (e) => {
    textAppear.style.color = e.target.value;
  });

  leftBtn.addEventListener("click", () => {
    settingBtn.style.display = "block";
    settingsCard.classList.add("settings-card-hide");
    todoAppContainer.classList.remove("opacity-50");
  });
  customizeSaveBtn.addEventListener("click", () => {
    settingsCard.classList.add("settings-card-hide");
    settingBtn.style.display = "block";
    todoAppContainer.classList.remove("opacity-50");

    todos.forEach((todo) => {
      todo.color = selectFontColor.value;
      todo.fontSize = selectFontSize.value;
    });
    localStorage.setItem("todos", JSON.stringify(todos));

    newList.forEach((todo) => {
      todo.firstElementChild.style.color = selectFontColor.value;
      todo.firstElementChild.style.fontSize = selectFontSize.value;
    });
  });
});

// createTodo
const createTodo = (todoId, todoValue, isCompleted, color, fontSize) => {
  const li = document.createElement("li");
  li.id = todoId;
  li.innerHTML = `
 <span class='span'>${todoValue}</span>
 <span><button id="delete-btn"><i class="fa fa-trash btn-red"></i></button></span>
`;

  todoList.appendChild(li);
  const deleteBtn = li.querySelector("#delete-btn");
  deleteBtn.addEventListener("click", deleteTodo);

  if (li) {
    settingBtn.style.display = "block";
  }
  // todo completed
  li.addEventListener("click", (e) => {
    let selectedTodo = e.currentTarget;

    let todos = getTodos();
    Array.from(todos).forEach((todo) => {
      if (selectedTodo.id == todo.uniqueId && !todo.isCompleted) {
        todo.isCompleted = true;
        selectedTodo.classList.add("todo-completed");
        selectedTodosOperation.style.display = "flex";
      } else if (selectedTodo.id == todo.uniqueId && todo.isCompleted) {
        todo.isCompleted = false;
        selectedTodo.classList.remove("todo-completed");
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

    // alltrues
    let allTrues = Array.from(todos).filter((todo2) => {
      if (todo2.isCompleted == true) {
        return todo2;
      }
    });
    if (allTrues.length == 0) {
      selectedTodosOperation.style.display = "none";
    }
    if (allTrues.length == 1) {
      selectedTodosEdit.style.color = "rgb(4,49,110)";
    }
    if (allTrues.length != 1) {
      selectedTodoEditCard.style.display = "none";
      selectedTodosEdit.style.color = "red";
    }

    // selectedTodo delete
    selectedTodosDelete.addEventListener("click", () => {
      todoList.removeChild(selectedTodo);

      let todos = getTodos();
      todos = todos.filter((todo) => {
        return selectedTodo.id != todo.uniqueId;
      });

      todos.map((todo) => {
        if (!isCompleted) {
          selectedTodosOperation.style.display = "none";
        }
      });

      localStorage.setItem("todos", JSON.stringify(todos));
    });

    if (selectedTodo.className == "todo-completed") {
      selectedTodoEditCardTextarea.value = e.target.innerText;
    }
    selectedTodoEditCardBackBtn.addEventListener("click", () => {
      todoEditCard.style.display = "none";
    });
  });
  return todoList;
};

// deleteTodo
const deleteTodo = (e) => {
  let li = e.target.parentElement.parentElement.parentElement;
  todoList.removeChild(li);

  let todos = getTodos();
  todos = todos.filter((todo) => {
    return todo.uniqueId !== li.id;
  });
  localStorage.setItem("todos", JSON.stringify(todos));

  if (todos.length == 0) {
    settingBtn.style.display = "none";
  } else {
    settingBtn.style.display = "block";
  }
};

// getTodos
const getTodos = () => {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
};

// addTodo
const addTodo = (e) => {
  e.preventDefault();

  const inputValue = input.value;
  const uniqueId = Math.floor(Math.random() * 10000000000).toString();
  let isCompleted = false;
  let isHighlighted = false;
  let highlightBig = false;
  let highlightMedium = false;
  let highlightSmall = false;
  let mode = false;
  let whichMode = false;
  let theme = false;
  let whichTheme = false;
  let deviceWidth = window.innerWidth;

  let color = "black";
  let fontSize = "16px";
  createTodo(
    uniqueId,
    inputValue,
    isCompleted,
    isHighlighted,
    highlightBig,
    highlightMedium,
    highlightSmall,
    color,
    fontSize
  );
  input.value = "";

  // localStorage
  let todos = getTodos();
  todos.push({
    uniqueId,
    inputValue,
    isCompleted,
    isHighlighted,
    highlightBig,
    highlightMedium,
    highlightSmall,
    color,
    fontSize,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}; //end of addTodo

// readData
const readData = () => {
  let todos = getTodos();
  todos.map((todo) => {
    let list = createTodo(todo.uniqueId, todo.inputValue, todo.isCompleted);
    let newList = document.querySelectorAll("li");
    Array.from(newList).forEach((todoitem) => {
      if (todo.uniqueId == todoitem.id && todo.isCompleted) {
        todoitem.classList.add("todo-completed");
        selectedTodosOperation.style.display = "flex";
      } else if (todo.uniqueId == todoitem.id && !todo.isCompleted)
        todoitem.classList.remove("todo-completed");
    });
  });

  // alltrues
  let allTrues = Array.from(todos).filter((todo2) => {
    if (todo2.isCompleted == true) {
      return todo2;
    }
  });
  if (allTrues.length == 0) {
    selectedTodosOperation.style.display = "none";
  }

  if (todos.length == 0) {
    settingBtn.style.display = "none";
  } else {
    settingBtn.style.display = "block";
  }
  if (allTrues.length == 1) {
    selectedTodosEdit.style.color = "rgb(4,49,110)";
  }
  if (allTrues.length != 1) {
    selectedTodosEdit.style.color = "red";
  }

  let newList = document.querySelectorAll("li");
  todos.map((Todo) => {
    Array.from(newList).forEach((todo) => {
      todo.firstElementChild.style.color = Todo.color;
      todo.firstElementChild.style.fontSize = Todo.fontSize;
    });
  });

  todos.map((Todo) => {
    Array.from(newList).forEach((todo) => {
      if (Todo.uniqueId == todo.id) {
        todo.firstElementChild.style.color = Todo.color;
        todo.firstElementChild.style.fontSize = Todo.fontSize;
      }
    });
  });
  todos.map((Todo) => {
    Array.from(newList).forEach((todo) => {
      if (
        Todo.uniqueId == todo.id &&
        Todo.isHighlighted == true &&
        Todo.highlightBig == true
      ) {
        todo.firstElementChild.classList.add("highlight-big");
        todo.classList.add("bgc-greenyellow");
      } else if (
        Todo.uniqueId == todo.id &&
        Todo.isHighlighted == true &&
        Todo.highlightMedium == true
      ) {
        todo.firstElementChild.classList.add("highlight-medium");
        todo.classList.add("bgc-greenyellow");
      } else if (
        Todo.uniqueId == todo.id &&
        Todo.isHighlighted == true &&
        Todo.highlightSmall == true
      ) {
        todo.firstElementChild.classList.add("highlight-small");
        todo.classList.add("bgc-greenyellow");
      }
    });
  });

  if (window.innerWidth < "500") {
    optionMobile.selected = true;
    optionTablet.selected = false;
    optionDekstop.selected = false;
  }
  if (window.innerWidth > "500" && window.innerWidth < "850") {
    optionTablet.selected = true;
    optionMobile.selected = false;
    optionDekstop.selected = false;
  }
  if (window.innerWidth > "850") {
    optionDekstop.selected = true;
    optionTablet.selected = false;
    optionMobile.selected = false;
  }
};
form.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", readData);
