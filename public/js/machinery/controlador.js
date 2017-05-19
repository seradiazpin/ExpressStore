
  //var Ventana = new Vista();
  var currentId = "";
  var currentObj = "";

  function buscarMaquina(id,path){
      var call = $.ajax({
            url:'/machinery'+'/'+ path + '/' + id,
            dataType:'json',
            type:'GET'
      });

      call.done(function(data){
        console.log('done successfully');
          currentId = data._id;
          Vista.pintarMaquina(data);
          //console.log(Object.keys(data));
      });

      call.fail(function(jqXHR, textStatus, error){
          console.log('<error>: ' + jqXHR.responseText);
      });
  }

  function rediComponentes(){

      var add = '/machinery/components/' + currentId;
      $('#comp').attr('href',add);
  }
