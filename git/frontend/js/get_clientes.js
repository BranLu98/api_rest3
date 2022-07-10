function getClientes() {

    var request = new XMLHttpRequest();
    usernombre = window.prompt('Usernombre:')
    password = window.prompt('Password:')

    request.open('GET', "https://8000-branlu98-apirest3-h3yy7jhekr3.ws-us53.gitpod.io/clientes/");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa(usernombre + ":" + password))
    request.setRequestHeader("content-type", "application/json");
    
    const  tabla   = document.getElementById("tabla_clientes");

    var tblBody = document.createElement("tbody");
    var tblHead = document.createElement("thead");

    tblHead.innerHTML = `
        <tr class="w3-green">
            <th>ID Cliente</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Detalle</th>
            <th>Actualizar</th>
            <th>Borrar</th>
        </tr>`;

    request.onload = () => {
        // Almacena la respuesta en una variable, si es 202 es que se obtuvo correctamente
        const response = request.responseText;
        const json = JSON.parse(response);
        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }
        
        else if (request.status == 202){
            const response = request.responseText;
            const json = JSON.parse(response);
            for (let i = 0; i < json.length; i++) {
                var tr          = document.createElement('tr');
                var id_cliente  = document.createElement('td');
                var nombre      = document.createElement('td');
                var email       = document.createElement('td');
                var detalle     = document.createElement('td');
                var actualizar  = document.createElement('td');
                var borrar      = document.createElement('td');

            
                id_cliente.innerHTML    = json[i].id_cliente;
                nombre.innerHTML        = json[i].nombre;
                email.innerHTML         = json[i].email;
                detalle.innerHTML       = "<a class='btn btn-info btn-sm' href='/templates/get_cliente.html?"+json[i].id_cliente+"'><span class='glyphicon glyphicon-list-alt'></span>  Detalle</a>";
                actualizar.innerHTML    = "<a class='btn btn-info btn-sm' href='/templates/update_clientes.html?"+json[i].id_cliente+"'><span class='glyphicon glyphicon-pencil'></span>  Actualizar</a>";
                borrar.innerHTML        = "<a class='btn btn-info btn-sm' href='/templates/delete_clientes.html?"+json[i].id_cliente+"'><span class='glyphicon glyphicon-trash'>  Borrar</a>";
                

                tr.appendChild(id_cliente);
                tr.appendChild(nombre);
                tr.appendChild(email);
                tr.appendChild(detalle);
                tr.appendChild(actualizar);
                tr.appendChild(borrar);                
                tblBody.appendChild(tr);
            }
            tabla.appendChild(tblHead);
            tabla.appendChild(tblBody);
        }
    };
    request.send();
}