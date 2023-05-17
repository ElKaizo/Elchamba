let arregloTareas = new Array();
let elementosGuardados = 0;
let done = new Audio('done.mp3');
let undone = new Audio('undone.mp3');

function init(){
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(
            registration) {
                //si es exitoso
                console.log('SW registrado correctamente ;)');
            }, function(err){
                //si falla
                console.log('SW fallo:(', err);
            });
    } else {
        console.log('ERROR :v');
    }

    let fecha = new Date();
    let mesNumero = fecha.getMonth();
    let mes = "";
    switch(mesNumero){
        case 1:
            mes="enero";
            break;
        case 2:
            mes="febrero";
            break;
        case 3:
            mes="marzo";
            break;
        case 4:
            mes="abril";
            break;
        case 5:
            mes="mayo";
            break;
        case 6:
            mes="junio";
            break;
        case 7:
            mes="julio";
            break;
        case 8:
            mes="agosto";
            break;
        case 9:
            mes="septiembre";
            break;
        case 10:
            mes="octubre";
            break;
        case 11:
            mes="noviembre";
            break;
        case 12:
            mes="diciembre";
            break;
    }
    document.getElementById('fecha').innerHTML = fecha.getDate() + " de " + mes;

    //si ya existen tareas guardadas, las obtengo en la interfaz
    if(localStorage.getItem("tareas")){
        alert("Si hay tareas");
        tareas = JSON.parse(localStorage.getItem('tareas'));
        for(i = 0; i < tareas.length; i++){
            arregloTareas.push(tareas[i]);
        }
        loadTareas();
    } else {
        alert("No hay tareas");
        jsonTarea = {};
        localStorage.setItem('tareas', JSON.stringify(jsonTarea));
    }
}

function agregar(){
    tareaTexto = document.getElementById('nuevaTarea');

    jsonTarea = {
        'valor':tareaTexto.value,
        'estatus':'pendiente'
    };

    elemento = "<div class ='tarea' id='" + elementosGuardados + "' onclick='cambiarEstado(this.id)'>" +
                    "<div class ='check'></div>" +
                    "<p>" + jsonTarea.valor + "</p>" +
                "</div>";

    document.querySelector('.porhacer').innerHTML += elemento;

    //agregar al arreglo de json la nueva tarea
    arregloTareas.push(jsonTarea);

    //agregar al LS el arreglo de JSON en formato de texto
    localStorage.setItem('tareas', JSON.stringify(arregloTareas));

    //limpiar el cuadro de texto
    tareaTexto.value = "";

    elementosGuardados++;
}

//carga las tareas cunado se actualice la pagina
function loadTareas() {
    document.querySelector('.porhacer').innerHTML = "";
    document.querySelector('.terminado').innerHTML = "";

    //cargar las tareas del LS
    for(i=0; i<tareas.length; i++) {
        elemento = "<div class ='tarea' id='" + i + "' onclick='cambiarEstado(this.id)'>" +
                        "<div class ='check'></div>" +
                        "<p>" + tareas[i].valor + "</p>" +
                    "</div>";

        if(tareas[i].estatus == "pendiente") {
            document.querySelector('.porhacer').innerHTML += elemento;
        } else if(tareas[i].estatus == "terminado") {
            document.querySelector('.terminado').innerHTML += elemento;
        }
    }

    elementosGuardados = tareas.length;
}

//este id lo traemos del onclick
function cambiarEstado(id) {
    console.log('cambio')
    tareas = JSON.parse(localStorage.getItem('tareas'));

    if(tareas[id].estatus == 'terminado') {
        tareas[id].estatus = 'pendiente';
        undone.play();
    } else {
        tareas[id].estatus = 'terminado';
        done.play();
    }

    localStorage.setItem('tareas', JSON.stringify(tareas));
    loadTareas();
}