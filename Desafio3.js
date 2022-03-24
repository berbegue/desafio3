console.log('Desafio 3 en funcionamiento');

let ingreso=0
let plazo=0
let TNA=0
let monto=0;
let Credito=[];
let Credito1=[];
let info=0;
let C=0;
let nuevop=0;
let flag1 = true;
const boton = document.querySelector('#boton')


function calculoCredito(TNA,ingreso,plazo){
    let j=TNA/12;
    C=(monto*j*(1+j)**plazo)/((1+j)**plazo-1);
    let Tp=0;
    let tpi=0;
    let Si=0;
    let ip=0;
    let Si0=monto;
    for(i=1;i<=plazo;i++){
        tpi=C-Si0*j-Si*j;    
        Tp=Tp+tpi;    
        Si=monto-Tp;
        ip=C-tpi;
        Si0=0
        Credito.push({Periodo:  i.toFixed(0), Capital:  tpi.toFixed(2) , Interes:  ip.toFixed(2), Saldo: Si.toFixed(2)});
    }
}
function visualizar(elemento){
        title.innerText = `Su credito ha sido calculado por un monto de: $${monto} a devolver en un plazo de: ${plazo} meses con una TNA de: ${TNA.toFixed(4)*100}% y un valor de cuota fija de: $${C.toFixed(2)}`
        const{Periodo,Capital,Interes,Saldo}=Credito1[elemento-1];
        nuevop = document.createElement('li')
        nuevop.innerText=`El Periodo: ${Periodo} esta compuesto por $${Capital} de capital + $${Interes} de interes y resta pagar un saldo de: $${Saldo}` 
        document.body.append(nuevop)
              
}
 
  
function guardar (Credito){
    localStorage.setItem("Credito1",JSON.stringify(Credito));
        
    }
function extraer (){
    Credito1 = JSON.parse(localStorage.getItem("Credito1"))
}

    function ejecucion (){
        localStorage.clear
        const in1= document.getElementById('ingreso');
        ingreso = in1.value ;
        const in2= document.getElementById('plazo') ;
        plazo = parseInt(in2.value) ;
        const elec= document.getElementById('eleccion') ;
        info = parseInt(elec.value);
        monto=(ingreso*.2*plazo);
        TNA=10000/(ingreso/plazo);
        calculoCredito(TNA,monto,plazo);
        guardar(Credito);  
        extraer();
        Credito=[];
               
    }



boton.addEventListener('click', ()=>{ 
    ejecucion();
    if (info<=0){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'El periodo consultado debe ser mayor a 0',
            showConfirmButton: false,
            timer: 1500
        })
    } else if (info>plazo){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: `El periodo consultado debe ser menor a ${plazo}`,
            showConfirmButton: false,
            timer: 1500
        })
    } else
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Su credito fue calculado`,
        showConfirmButton: false,
        timer: 1500
    })
    flag1 ? visualizar(info) : alert('Para ingresar nuevos valores presione RESET');
    flag1 = false;
  
})
boton2.addEventListener('click', ()=>{ 
    location.reload();       
})

