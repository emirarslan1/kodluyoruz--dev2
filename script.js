function newElement() {
    var taskValue = document.querySelector("#task").value;

    var varToast = document.querySelector("#varToast");
    var yokToast = document.querySelector("#yokToast");

    if (taskValue.trim() === "") {
        $(yokToast).toast('show');
    } else {
        $(varToast).toast('show');

        ulDOM = document.querySelector("#list");
        liDOM = document.createElement("li");
        liDOM.innerHTML = `${taskValue} <button onclick="deleteElement(this)" class="deleterButtonClass">X</button>`;
        liDOM.setAttribute("id", "listElement");
        liDOM.onclick = function() {
            colorChanger(liDOM);
        };
        ulDOM.appendChild(liDOM);
        ulUpdater();
    }
    document.querySelector("#task").value = ""
}

document.addEventListener("keypress", function(event) {
    // Enter tuşuna basıldığında (keyCode 13)
    if (event.keyCode === 13) {
      // İşlem yapılacak olan fonksiyonunuzu buraya çağırabilirsiniz
      newElement();
    }
  });


function deleteElement(button) {
    var deletedLi = button.parentNode;
    deletedLi.parentNode.removeChild(deletedLi);
    ulUpdater();
}


function ulUpdater(){
    let ulDOM = document.querySelector("#list")
    let toDoList = Array.from(ulDOM.children).map(li=> li.textContent)
    localStorage.setItem("toDoList", JSON.stringify(toDoList))
}

function colorChanger(liElement){
    buttonElement = liElement.querySelector('button')
    if(liElement.style.backgroundColor != "blue"){
        liElement.classList.add("yatay-yazi")
        liElement.classList.add("done")
        buttonInnerHolder = buttonElement.innerHTML
        buttonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
        </svg>`;
        previousColor = liElement.style.backgroundColor
        liElement.style.backgroundColor = "blue";
        buttonElement.style.backgroundColor = "blue"
    }else{
        liElement.classList.remove("yatay-yazi")
        liElement.style.backgroundColor = previousColor;
        buttonElement.style.backgroundColor = previousColor
        buttonElement.innerHTML = buttonInnerHolder
        liElement.classList.remove("done")
    }
    
}