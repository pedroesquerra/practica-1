const firebaseConfig = {
        apiKey: "AIzaSyCRRV1H85c8qhnsYIRGmFN8Ip-VfZYPols",
        authDomain: "practica1-81f32.firebaseapp.com",
        databaseURL: "https://practica1-81f32-default-rtdb.firebaseio.com",
        projectId: "practica1-81f32",
        storageBucket: "practica1-81f32.appspot.com",
        messagingSenderId: "385933154973",
        appId: "1:385933154973:web:e472fde61accf8d8f41274",
        measurementId: "G-HKH6KFJYVM"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var departamento = document.getElementById("Input4").value;
   

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var empleados = {
            id, //matricula:id
            nombre,
            correo,
            departamento,
           

        }

        //console.log(alumno);

        firebase.database().ref('Negocios/' + id).update(empleados).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Negocios');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(empleados){
    
    if(empleados!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
       
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = empleados.id;
        cell2.innerHTML = empleados.nombre; 
        cell3.innerHTML = empleados.correo;
        cell4.innerHTML = empleados.departamento; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${empleados.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+empleados.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Negocios/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Negocios/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(empleados){
    if(empleados!=null)
    {
        document.getElementById("Input1").value=empleados.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=empleados.nombre;
        document.getElementById("Input3").value=empleados.correo;
        document.getElementById("Input4").value=empleados.departamento;
       
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Negocios");
    ref.orderByChild("departamento").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}

/**function readQ(){
    document.getElementById("Table2").innerHTML='';
    var e = document.getElementById("Input9").value;
    var ref = firebase.database().ref("Negocios");
    ref.orderByChild("sueldo").equalTo(e).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });
}
*/
function printRowQ(empleados){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
 
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = empleados.id;
    cell2.innerHTML = empleados.nombre; 
    cell3.innerHTML = empleados.correo;
    cell4.innerHTML = empleados.departamento; 
   
}

