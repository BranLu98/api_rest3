function PostCliente(){


    usernombre  = window.prompt('Usernombre:')
    password    = window.prompt('Password:')

    let nombre = document.getElementById("nombre");
    let email  = document.getElementById("email");

    let payload = {
        "nombre": nombre.value,
        "email" : email.value,
    }

    console.log("nombre: " + nombre.value);
    console.log("email: "  + email.value);
    console.log(payload);
    
    var request = new XMLHttpRequest();
    //request.open('POST', "https://8000-branlu98-apirest3-h3yy7jhekr3.ws-us53.gitpod.io/clientes/",true);
    request.open('POST', "http://127.0.0.1:8000/clientes/",true);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Authorization", "Basic " + btoa(usernombre + ":" + password))
    

    
    request.onload = () => {
        
        const response  = request.responseText;
        const json      = JSON.parse(response);     
        const status    = request.status;

        if (request.status === 401 || request.status === 403) {
            alert(json.detail);
        }

        else if (request.status == 202){

            console.log("Response: " + response);
            console.log("JSON: " + json);
            console.log("Status: " + status);

            Swal.fire({
                title: json.message,
                text: "Regresar a la lista de clientes ",
                type: "success"
            }).then(function() {
                window.location = "/templates/get_clientes.html";
            });
            
        }
    };
    request.send(JSON.stringify(payload));
};