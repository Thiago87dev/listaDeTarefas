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
    btnApagar.setAttribute('class', 'apagar')
    li.appendChild(btnApagar)
}

function criaTarefa(textoInput){
    let li = criaLi()
    li.innerHTML = textoInput
    tarefas.appendChild(li)
    criaBtnApagar(li)
    salvarTarefas()
    limpaImput()
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
    
    for(let [k, v] of Object.entries(listaDeTarefas) || NaN ){
        criaTarefa(v)
    }
}
addTarefasSalvas()

inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!inputTarefa.value) return
        criaTarefa(inputTarefa.value) 
    }
})

btn.addEventListener('click', function(){
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(e){
    let el = e.target
    if(el.classList.contains('apagar')){
        el.parentElement.remove()
        salvarTarefas()

    }
})
    
