
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
      }
  }
})();
