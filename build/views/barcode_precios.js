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
                <div class="col-6">
                    <div class="card card-rounded shadow col-12">
                        <div class="card-body">
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card card-rounded shadow col-12">
                        <div class="card-body" id="barcode_container">

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
        console.log('Barcode Detector supported!');
    }else{
        console.log('Barcode Detector is not supported in this browser');
        container.innerHTML = 'No se puede usar Barcode en este dispositivo';
        return;
    };


    const barcodeDetector = new BarcodeDetector({
        formats: [
          'aztec',
          'code_128',
          'code_39',
          'code_93',
          'codabar',
          'data_matrix',
          'ean_13',
          'ean_8',
          'itf',
          'pdf417',
          'qr_code',
          'upc_a',
          'upc_e'
        ]
    });

  
    try {
        const barcodes = await barcodeDetector.detect(image);
        barcodes.forEach((barcode)=>{
            console.log(barcode)
            container.innerHTML = barcode;
        });
      } catch (e) {
       // if the imageElement is invalid, the DOMException will be thrown
        console.error('Barcode detection failed:', e);
        container.innerHTML = e;
      }


};