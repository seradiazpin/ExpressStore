
var Vista = (function(){

  return{
      pintarMaquina : function(maquina){

            $('#modName').text(maquina.name);
            $('#modBrand').text(maquina.brand);
            $('#modType').text(maquina.type);
            $('#modWeight').text(maquina.weight);
            $('#modCapacity').text(maquina.capacity);
            $('#modEngine').text(maquina.engineModel);
            $('#modWater').text(maquina.waterCooling);
            $('#modRouteSpeed').text(maquina.routeSpeed);
            $('#modTurningSpeed').text(maquina.turningSpeed);
            $('#modFuel').text(maquina.fuelCapacity);
            $('#modLength').text(maquina.length);
            $('#modWidth').text(maquina.width);
            $('#modHeight').text(maquina.height);
            $('#modWork').text(maquina.workHours);
            // codigo pra pintar en pantalla modal
      },
      pintarSelector : function(maquina){
        var max = maquina.components.length;
        var elemento,aux;

        console.log('Longitu')
        if(max==0) return;
            //$('#collapComp table tbody').empty();

        for(var i=0;i<max;i++){

            var elemento = $(document.createElement('tr'));

            elemento.append(
                 '<td>' + maquina.components[i].name +
                 '</td>' );

             aux = $(document.createElement('td'));
             aux = aux.append($(document.createElement('a')));
            aux.addClass('btn btn-danger');

            //aux.on('click',function(){
                  //modiComponente(maquina.components[i]._id,'remove');
            //});
            var index = maquina.components[i]._id;

            aux.attr("onclick","modiComponente(index,'remove');");

            aux.text('BORRAR');
            elemento.append(aux);


           $('#collapComp table tbody').prepend(elemento);

          }
        //console.log(JSON.stringify(maquina, null, "\t"));
            //console.log(maquina.components[maquina.components.length-1].comp.name);
      }
  }
})();
