
var Vista = (function(){
var bufferComp="";
  return{
      pintarMaquina : function(maquina){

            $('#modName').text(maquina.name);
            $('#modBrand').text(maquina.price);
            $('#modType').text(maquina.type);
            if(maquina.weight !== -1){
              $('#modWeight').text(maquina.weight);
            }else{
              $('#modWeight').text("No aplica");
            }
            
            if(maquina.capacity != -1){
              $('#modCapacity').text(maquina.capacity);
             }else{
              $('#modCapacity').text("No aplica");
            }
            $('#modEngine').text(maquina.engineModel);
            $('#modWater').text(maquina.waterCooling);

            if(maquina.routeSpeed !== -1){
              $('#modRouteSpeed').text(maquina.routeSpeed);
            }else{
              $('#modRouteSpeed').text("No aplica");
            }
            if(maquina.turningSpee != -1){
              $('#modTurningSpeed').text(maquina.turningSpeed);
            }else{
              $('#modTurningSpeed').text("No aplica");
            }
            $('#modFuel').text(maquina.fuelCapacity);
            $('#modLength').text(maquina.length);
            $('#modWidth').text(maquina.width);
            $('#modHeight').text(maquina.height);
            $('#modWork').text(maquina.workHours);

            $('#machinepic').attr("src",maquina.img);
            $('#linkerCatalogue').attr("href",maquina.catalogue);
            $('#linkerVideo').attr("href",maquina.video);
            $('#linkerBlueprint').attr("href",maquina.blueprint);


            // codigo pra pintar en pantalla modal
      },
      pintarSelector : function(maquina){
        var max = maquina.components.length;
        var elemento,aux;


        if(max==0) return;


          var save = $('#comp-crea').detach();

            $('#collapComp table tbody').empty().append(save);
            //$('#collapComp table tbody').empty();

        for(var i=0;i<max;i++){

             elemento = $(document.createElement('tr'));

            elemento.append(
                 '<td>' + maquina.components[i].name +
                 '</td>' );

             aux = $(document.createElement('td'));
             aux = aux.append($(document.createElement('a')));
            aux.addClass('btn btn-danger');

            //aux.on('click',function(){
                  //modiComponente(maquina.components[i]._id,'remove');
            //});
            //var index = maquina.components[i]._id;

            aux.attr("comp-id",maquina.components[i]._id);

            aux.text('BORRAR');

            aux.on('click',function(){
                  $(this)
                  modiComponente($(this).attr("comp-id"),'remove');
            });

            elemento.append(aux);

           $('#collapComp table tbody').prepend(elemento);
          }

        //console.log(JSON.stringify(maquina, null, "\t"));
            //console.log(maquina.components[maquina.components.length-1].comp.name);
      }
  }
})();
