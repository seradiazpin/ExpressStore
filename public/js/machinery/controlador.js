
  //var Ventana = new Vista();
  var currentId = "";
  var currentObj = "";

  function buscarMaquina(id,path,act){
      var call = $.ajax({
            url:'/machinery'+'/'+ path + '/' + id,
            dataType:'json',
            type:'GET'
      });

      call.done(function(data){
        console.log('done successfully');
          currentId = data._id;
          currentObj = data;

          console.log(JSON.stringify(data, null, "\t"));

          switch(act){
              case 'modal':
                Vista.pintarMaquina(data);
                  break;

              case 'selector':
                Vista.pintarSelector(data);
                  break;
              default :
                  console.log('option no defined');
                  break;
          }

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

function modiComponente(idSelec,action){
      var addr;

        console.log('Select :' + idSelec);
    switch(action){
      case 'add':
          addr = 'add-component';
            break;
      case 'remove':
          addr = 'remove-component';
            break;
      default:
          console.log('Not defined');
            return;
    }

    var call = $.ajax({
          type:'POST',
          url:'/machinery'+'/'+ addr,
          //dataType:'json',
          contentType: 'application/json',

          data:JSON.stringify({
            "macId":currentId,
            "compId":idSelec
          })
    });

    call.done(function(data){

      console.log('done successfully');

        //console.log(Object.keys(data));
    });

    call.fail(function(jqXHR, textStatus, error){
        console.log('<error>: ' + jqXHR.responseJson + error + textStatus);
    });

  }
