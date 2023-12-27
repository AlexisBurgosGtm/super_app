function getView(){

    let view = {
        body:()=>{
            return `
                <div class="col-12 p-0 bg-white">
                    <div class="tab-content" id="myTabHomeContent">
                        <div class="tab-pane fade show active" id="uno" role="tabpanel" aria-labelledby="receta-tab">
                            ${view.vista_barcode()}
                        </div>
                        <div class="tab-pane fade" id="dos" role="tabpanel" aria-labelledby="home-tab">
                           
                            
                        </div>
                        <div class="tab-pane fade" id="tres" role="tabpanel" aria-labelledby="home-tab">
                            
                        </div>    
                    </div>

                    <ul class="nav nav-tabs hidden" id="myTabHome" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active negrita text-success" id="tab-uno" data-toggle="tab" href="#uno" role="tab" aria-controls="profile" aria-selected="false">
                                <i class="fal fa-list"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-dos" data-toggle="tab" href="#dos" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>  
                        <li class="nav-item">
                            <a class="nav-link negrita text-danger" id="tab-tres" data-toggle="tab" href="#tres" role="tab" aria-controls="home" aria-selected="true">
                                <i class="fal fa-comments"></i></a>
                        </li>         
                    </ul>
                </div>
               
            `
        },
        vista_barcode:()=>{
            return `
            <div class="row">
                Rev. 11:53
                <div class="card-body" id="barcode_container">
                    
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <div class="card card-rounded shadow col-12">
                        <div class="card-body">

                            <ul id="barcode-list"></ul>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card card-rounded shadow col-12">
                        <div class="card-body" id="">
                            
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    }


    rootContainer.innerHTML = view.vista_barcode();


};

function addListeners(){


    getBarcode();

    f.slideAnimationTabs();

};


function initView(){
    getView();
    addListeners();
};


async function getBarcode(){

    let container = document.getElementById('barcode_container');


    if('BarcodeDetector' in window ){
        detect();
    }else{
        console.log('Barcode Detector is not supported in this browser');
        container.innerHTML = 'No se puede usar Barcode en este dispositivo';
        return;
    };


     

};

async function detect() {

    let root_barcode = document.getElementById('barcode_container')
    
    const barcodeDetector = new BarcodeDetector();
    const list = document.getElementById("barcode-list");
    let itemsFound = [];
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });
  
    const video = document.createElement("video");
    video.width=250;
    video.height=250;
    video.srcObject = mediaStream;
    video.autoplay = true;
  
    list.before(video);

    root_barcode.appendChild(video);
  
    function render() {
      barcodeDetector
        .detect(video)
        .then((barcodes) => {
          barcodes.forEach((barcode) => {
            if (!itemsFound.includes(barcode.rawValue)) {
              itemsFound.push(barcode.rawValue);
              const li = document.createElement("li");
              li.innerHTML = barcode.rawValue;
              list.appendChild(li);
            }
          });
        })
        .catch(console.error);
    }
  
    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      render();
    })();
}
 