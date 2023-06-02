// Document Elements
const todoList = document.querySelector('ul.todo-list')
const todoForm = document.querySelector('form.todo-form')
const todoInput = document.querySelector('#todo-input')
const addButton = document.querySelector('button.add-button')
const infoWarning = document.querySelector('div.info-screen .info-warning')
const infoSuccess = document.querySelector('div.info-screen .info-success')


// Get Values from Localstorage
let todoValues = []  //used to save to LocalStorage and get values from LocalStorage
let valuesFromLocalStorage = localStorage.getItem("todoValuesLS")


// eğer localstorage varsa, itemtoUI fonksiyonunu çalıştır
// itemstoUI fonkyisonu localstorage'daki verilerin arayüze taşır
if (valuesFromLocalStorage) itemsToUI();



// Delete and Complate To-do click event
todoList.addEventListener('click', deleteAndComplateList)

// Add To-Do Button click event
addButton.addEventListener("click", e => {
    e.preventDefault()


    if (todoInput.value !== "") {
        let todoLiElement = document.createElement("li")
        todoLiElement.innerHTML = `<i class="fa-solid fa-square-check"></i> ${todoInput.value} <i class="fa-solid fa-trash"></i>`
       
        todoList.appendChild(todoLiElement)
        todoValues.push(todoInput.value)
        localStorage.setItem("todoValuesLS", JSON.stringify(todoValues))

        todoForm.reset()

    }else{
        alert("Boş to-do ekleyemezsiniz!")
    }
})




// Functions

function deleteAndComplateList(e) {
    let clickTarget = e.target
    
    // If target complate icon
    if (clickTarget.classList.contains("fa-square-check")) {// If target complate icon
        clickTarget.parentElement.classList.toggle('complated-todo')
        
    }
    // If target delete icon
    else if(clickTarget.classList.contains("fa-trash")){
        let clickTargetText = clickTarget.parentElement.innerText
        if (confirm("Görev silinecek. Emin misiniz?")) {
            clickTarget.parentElement.classList.add('deleted-todo')
            clickTarget.parentElement.addEventListener('transitionend', _ => {
                valuesFromLocalStorage = localStorage.getItem("todoValuesLS")
                todoValues = JSON.parse(valuesFromLocalStorage)
                todoValues = todoValues.filter(item => item !== clickTargetText)
                localStorage.setItem("todoValuesLS", JSON.stringify(todoValues))
    
                clickTarget.parentElement.remove()

                infoSuccess.classList.add("d-block")

                setTimeout(() => {
                    infoSuccess.classList.remove("d-block")
                }, 1500)
            })
            
        }else{
            infoWarning.classList.add("d-block")

            setTimeout(() => {
                infoWarning.classList.remove("d-block")
            }, 1500)
            
        }
    }
}

function itemsToUI() {
    todoValues = JSON.parse(valuesFromLocalStorage)

    todoValues.forEach(todoElement => {
        let todoLiElement = document.createElement("li")
        todoLiElement.innerHTML = `<i class="fa-solid fa-square-check"></i> ${todoElement} <i class="fa-solid fa-trash"></i>`
       
        todoList.appendChild(todoLiElement)
    })
}


// function getItemsFromLocalStorage(params) {
    
// }