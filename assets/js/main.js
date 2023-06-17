let btn = document.querySelector('.btn-add-tarefa')
let inputTarefa = document.querySelector('.input-tarefa')
let tarefas = document.querySelector('.tarefas')

function criaLi(){
    let li = document.createElement('li')
    return li
}

function criaBtnApagar(li){
    li.innerHTML += ' '
    let btnApagar = document.createElement('button')
    btnApagar.innerHTML = 'Apagar'
    btnApagar.setAttribute('title', 'Apagar esta tarefa')
    btnApagar.setAttribute('class', 'apagar')
    li.appendChild(btnApagar)
}

function criaTarefa(textoInput){
    let li = criaLi()
    li.innerHTML = textoInput
    tarefas.appendChild(li)
    criaBtnApagar(li)
    salvarTarefas()
}

function limpaImput(){
    inputTarefa.value = ''
    inputTarefa.focus()
}

function salvarTarefas(){
    let liTarefas = tarefas.querySelectorAll('li')
    let listaDeTarefas = []

    for(let i of liTarefas){
        let tarefaTexto = i.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto)
    }
    let tarefasJson = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefasJson)
}

function addTarefasSalvas(){
    let tarefas = localStorage.getItem('tarefas')
    let listaDeTarefas = JSON.parse(tarefas)
    
    for(let i of listaDeTarefas){
        criaTarefa(i)
    }
}
addTarefasSalvas()

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return
        criaTarefa(inputTarefa.value)
        limpaImput()
    }
})

btn.addEventListener('click', function(){
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
    limpaImput()
})

document.addEventListener('click', function(e){
    let el = e.target
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()

    }
})
    
