let f = {
    phone_call: (telefono)=>{
      
        let llamar = telefono.replace(" ","");
        llamar = llamar.replace("-","");
        llamar = llamar.replace("/","");
        llamar = llamar.replace("*","");
        llamar = llamar.replace("$","");
        llamar = llamar.replace("&","");
        llamar = llamar.replace("'","");
        llamar = llamar.replace('"',"");
  
        window.location.href = 'tel:' + llamar;
        
    },
    convertDateNormal(date) {
        const [yy, mm, dd] = date.split(/-/g);
        return `${dd}/${mm}/${yy}`.replace('T00:00:00.000Z', '');
    },
    readContacts:(idResult)=>{

        let container = document.getElementById(idResult);
    
        var api = (navigator.contacts || navigator.mozContacts);
          
        if (api && !!apigen.select) { // new Chrome API
          apigen.select(['name', 'email', 'tel'], {multiple: false})
            .then(function (contacts) {
              console.log('Found ' + contacts.length + ' contacts.');
              if (contacts.length) {
                
                let numero = contacts[0].tel.toString()
                numero = numero.replace('+502','');
                let stn = '502' + numero.toString();
                stn = stn.replace(' ','');
                funciones.Aviso(stn);
                container.innerHTML = JSON.stringify(contacts);
                
              }
            })
            .catch(function (err) {
              console.log('Fetching contacts failed: ' + err.name);
              funciones.AvisoError('Fetching contacts failed: ' + err.name)
            });
            
        } else if (api && !!apigen.find) { // old Firefox OS API
          var criteria = {
            sortBy: 'familyName',
            sortOrder: 'ascending'
          };
      
          apigen.find(criteria)
            .then(function (contacts) {
              console.log('Found ' + contacts.length + ' contacts.');
              container.innerHTML = JSON.stringify(contacts);
              if (contacts.length) {
                let numero = contacts[0].tel.toString()
                numero = numero.replace('+502','');
                let stn = '502' + numero.toString();
                stn = stn.replace(' ','');
                funciones.Aviso(stn);
                container.innerHTML = JSON.stringify(contacts);
                
              }
            })
            .catch(function (err) {
              console.log('Fetching contacts failed: ' + err.name);
              funciones.AvisoError('Fetching contacts failed: ' + err.name)
            });
            
        } else {
          console.log('Contacts API not supported.');
          container.innerHTML = 'Contacts API not supported.'
        }
    },
    Confirmacion: function(msn){
        return swal({
            title: 'Confirme',
            text: msn,
            icon: 'warning',
            buttons: {
                cancel: true,
                confirm: true,
              }})
    },
    Aviso: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "success",
            buttons: false
            });

        try {
            navigator.vibrate(500);
        } catch (error) {
            
        }
    },
    AvisoError: function(msn){
        swal(msn, {
            timer: 1500,
            icon: "error",
            buttons: false
            });
        try {
            navigator.vibrate([100,200,500]);
        } catch (error) {
            
        }
    },
    loadScript: function(url, idContainer) {
        return new Promise((resolve, reject) => {
          var script = document.createElement('script');
          script.src = url;
    
          script.onload = resolve;
          script.onerror = reject;
             
          document.getElementById(idContainer).appendChild(script)
        });
    },
    hablar: function(msn){
        var utterance = new SpeechSynthesisUtterance(msn);
        return window.speechSynthesis.speak(utterance); 
    },
    getFecha(){
        let fecha
        let f = new Date(); 
        let d = f.getDate(); 
        let m = f.getUTCMonth()+1; 
  
        switch (d.toString()) {
          case '30':
            m = f.getMonth()+1; 
            break;
          case '31':
            m = f.getMonth()+1; 
              break;
        
          default:
  
            break;
        }
  
        
        let y = f.getFullYear();
       
        di = d;
        var D = '0' + di;
        let DDI 
        if(D.length==3){DDI=di}else{DDI=D}
        
        ma = m;
        var MA = '0' + ma;
        let DDM 
        if(MA.length==3){DDM=ma}else{DDM=MA}
  
  
        fecha = y + '-' + DDM + '-' + DDI;
        return fecha;
    },
    limpiarTexto: (texto) =>{
        texto = texto.replace("'","");
        texto = texto.replace("&","");
        texto = texto.replace('"',"");
        texto = texto.replace("$","");
        texto = texto.replace("%","");
        texto = texto.replace("/","");
        texto = texto.replace("#","");
        texto = texto.replace("*","");
        texto = texto.replace('@',"");
        texto = texto.replace(/(\r\n|\n|\r)/gm, "");
        return texto;
    },
    slideAnimationTabs: ()=>{
        //inicializa el slide de las tabs en censo
        $('a[data-toggle="tab"]').on('hide.bs.tab', function (e) {
            var $old_tab = $($(e.target).attr("href"));
            var $new_tab = $($(e.relatedTarget).attr("href"));
    
            if($new_tab.index() < $old_tab.index()){
                $old_tab.css('position', 'relative').css("right", "0").show();
                $old_tab.animate({"right":"-100%"}, 300, function () {
                    $old_tab.css("right", 0).removeAttr("style");
                });
            }
            else {
                $old_tab.css('position', 'relative').css("left", "0").show();
                $old_tab.animate({"left":"-100%"}, 300, function () {
                    $old_tab.css("left", 0).removeAttr("style");
                });
            }
        });
    
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
            var $new_tab = $($(e.target).attr("href"));
            var $old_tab = $($(e.relatedTarget).attr("href"));
    
            if($new_tab.index() > $old_tab.index()){
                $new_tab.css('position', 'relative').css("right", "-2500px");
                $new_tab.animate({"right":"0"}, 500);
            }
            else {
                $new_tab.css('position', 'relative').css("left", "-2500px");
                $new_tab.animate({"left":"0"}, 500);
            }
        });
    
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            // your code on active tab shown
        });
    },
    getHora:()=>{
        let hoy = new Date();
        let hora = hoy.getHours();
        let minuto = hoy.getMinutes();
        return `${hora.toString()}:${minuto.toString()}`;
    },
}