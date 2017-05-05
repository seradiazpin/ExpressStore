function esValido(formulario){
    for(var i = 1;i <=3;++i){
        document.getElementById("valido"+i).style.display = "none";
        document.getElementById("v"+i).innerHTML = "";
    }
    var largo,ancho,alto,escalones,nombre,apellido,email,celular,validador;
    largo = parseFloat(formulario["largo"].value);
    ancho = parseFloat(formulario["ancho"].value);
    alto = parseFloat(formulario["alto"].value);
    escalones = parseFloat(formulario["escalones"].value);
    nombre = formulario["nombre"].value;
    apellido = formulario["apellido"].value;
    email = formulario["email"].value;
    celular = formulario["celular"].value;
    if(!isNumber(largo) || !isNumber(ancho) || !isNumber(alto)){
        validador = document.getElementById("valido1");
        validador.style.display = "block";
        validador = document.getElementById("v1");
        validador.innerHTML = validador.innerHTML + "Error en alguno de los datos: ancho,alto,largo";
        huboError();
        return false;
    }
    if(!estaEnRango(ancho,alto,largo)){
        validador = document.getElementById("valido1");
        validador.style.display = "block";
        validador = document.getElementById("v1");
        validador.innerHTML = validador.innerHTML + "Error el ancho,largo o alto no estan en el rango indicado";
        huboError();
        return false;
    }
    if(!isNumber(escalones)){
        validador = document.getElementById("valido2");
        validador.style.display = "block";
        validador = document.getElementById("v2");
        validador.innerHTML = validador.innerHTML + "Error en el numero de escalones";
        huboError();
        return false;
    }
    if(celular.length > 10){
        validador = document.getElementById("valido3");
        validador.style.display = "block";
        validador = document.getElementById("v3");
        validador.innerHTML = validador.innerHTML + "Error el numero de celular es muy grande";
        return false;
    }
    if(!isNumber(parseFloat(celular))){
        validador = document.getElementById("valido3");
        validador.style.display = "block";
        validador = document.getElementById("v3");
        validador.innerHTML = validador.innerHTML + "Error el numero de celular no es un numero";
        return false;
    }
    if(!campoValidoNoVacioNoNumero(nombre)){
        validador = document.getElementById("valido3");
        validador.style.display = "block";
        validador = document.getElementById("v3");
        validador.innerHTML = validador.innerHTML + "  Error el nombre no puede ser vacio o numero";
        return false;
    }
    if(!campoValidoNoVacioNoNumero(apellido)){
        validador = document.getElementById("valido3");
        validador.style.display = "block";
        validador = document.getElementById("v3");
        validador.innerHTML = validador.innerHTML + "  Error el apellido no puede ser vacio o numero";
        return false;
    }
    return true;
}
function isNumber(n) {
  return !isNaN(n);
}
function campoValidoNoVacioNoNumero(value){
    if(/^\s+|\s+$/.test(value))
        return false;
    if(isNumber(value))
        return false;
    return true;
}
function huboError(){
    var validador = document.getElementById("valido3");
    validador.style.display = "block";
    validador = document.getElementById("v3");
    validador.innerHTML = validador.innerHTML + "  Error en el formulario";
}
function estaEnRango(ancho,alto,largo){
    if(alto >= 0.5 && alto <= 2.75 && ancho >= 0.5 && ancho <= 2.5 && largo >= 0.5 && largo <= 1.5)
        return true;
    return false;
}

