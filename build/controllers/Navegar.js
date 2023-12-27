let Navegar = {
    barcode_precios :()=>{
        f.loadScript('./views/barcode_precios.js','root')
        .then(()=>{
            initView();
        })
    }
}