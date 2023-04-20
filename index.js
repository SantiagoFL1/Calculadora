

const BotonOscuro = document.getElementById('Oscuro')
const BotonClaro = document.getElementById('Claro')
const Calculadora = document.getElementById('Calculadora')
const Botones = document.getElementsByClassName('BotonSimple')
const ContenedorBotones = document.getElementById('ContenedorBotones')
const CadenaPantalla = document.getElementById('CadenaPantalla')
const Resultado = document.getElementById('Resultado')




const Operaciones = ['x','/','+','-','X','*','.','^','^2','*10^','√','sin','cos','tan']
const OpsQueNoPuedenEmpezar = ['x','/','*','X','^','^2','*10^']
const OpsConSignoAntes = ['-','+','.','√','sin','cos','tan']
const Parentesis = ['(',')']
const TeclasNoEscritas = ['enter','backspace']
const Duplicables = ['+','-']
let ArrayBotones=[]
for (let i=0 ; i<=Botones.length-1;i++) {
    ArrayBotones.push(Botones[i])
}
let Cadena = ''

// MODO OSCURO Y CLARO

BotonClaro.addEventListener('click',(c)=>{
    c.preventDefault()
    Calculadora.style.background='rgb(170, 170, 170)';
    CadenaPantalla.style.color='black'
    Resultado.style.color='black'
    ArrayBotones.forEach(boton=>{
        
        boton.style.color='black'
        boton.style.background='rgb(124, 124, 124)'
    })

    BotonClaro.style.background='rgb(124, 124, 124)'
    BotonOscuro.style.background='rgb(124, 124, 124)'
})

BotonOscuro.addEventListener('click',(c)=>{
    c.preventDefault()
    
    Calculadora.style+='linear-gradient(180deg,black,white);'
    CadenaPantalla.style.color='white'
    Resultado.style.color='white'
    ArrayBotones.forEach(boton=>{
        
        boton.style.color='white'
        boton.style.background='transparent'
    })
    BotonClaro.style.background= 'transparent'
    BotonOscuro.style.background='transparent'
})

//OPERACIONES
function Escribir (letra) {

    if (letra==='F5') {return}
    { //ATAJOS
        
        if (letra==='t' || letra ==='T') {letra='tan'}

        if (letra==='c' || letra ==='C') {letra='cos'}

        if (letra==='s' || letra ==='S') {letra='sin'}

        if (letra==='p' || letra ==='P') {letra='^'}
        
        if (letra==='√x' || letra==='r'){letra='√'}

        if (letra==='x10ⁿ'){letra='*10^'}

        if (letra==='X²'){letra='^2'}

        if (letra ==='Xⁿ') {
            letra='^'
        }
    }

    if (letra!=='X²' && letra !=='Xⁿ') {
        letra=letra.toLowerCase() 
    }
    
    //ERRORES 
    {

        if (CadenaPantalla.textContent==='' && OpsQueNoPuedenEmpezar.includes(letra)){
            alert('Ese caracter no puede ir al principio')
            return

        }
        if (Operaciones.includes(CadenaPantalla.textContent[CadenaPantalla.textContent.length-1]) 
        && !OpsConSignoAntes.includes(letra) 
        && Operaciones.includes(letra)
        
        ) {
            
            alert("No se puede escribir esos dos signos seguidos")
            return
        } 
        if ( !Duplicables.includes(letra) 
        && CadenaPantalla.textContent[CadenaPantalla.textContent.length-1] == letra
        && Operaciones.includes(letra) ){
            alert("No se puede escribir esos dos signos seguidos")
            return
        }
        if ( letra==CadenaPantalla.textContent[CadenaPantalla.textContent.length-1]
            && letra==CadenaPantalla.textContent[CadenaPantalla.textContent.length-2]
            && Operaciones.includes(letra)
        ){
            alert("No se puede escribir más de dos signos iguales seguidos")
            return
        }
    }
    //AGREGAR CARACTERES A LA CADENA
    {    
        if (!isNaN(parseInt(letra)) || Operaciones.includes(letra) || Parentesis.includes(letra)){
            
            if (letra=='x') {
                Cadena+='*';
                
            }
            
            else {
                Cadena+=letra
                
            }
        }
        
        CadenaPantalla.textContent = Cadena
        
        switch (letra){
            case 'enter': if (Cadena!=='') Igual();break;
            case '=':Igual();break
            case 'backspace':Borrar();break
            case 'del':Borrar();break
            case 'ac':Cadena='';CadenaPantalla.textContent='';Resultado.textContent='';break

        }

        if (CadenaPantalla.textContent.includes('undefined')){
            Cadena = Cadena.replace(('undefined'),'')
        }
    }    
}
function Igual () {
    //Eliminar signos al final de la operación
    while (Operaciones.includes(Cadena[Cadena.length-1]) || Parentesis.includes(Cadena[Cadena.length-1]) && !isNaN(Cadena[Cadena.length-1])){
        Borrar()
    }

    //POTENCIA
    if (Cadena.includes('^')) {
        
        
        
        //OBTENIENDO LA BASE Y EL EXPONENTE DE LA POTENCIA
        let BaseInvertida = ''
        let Base = ''
        let Exponente = ''
        let CaracteresInvolucrados = [Cadena.indexOf('^')]
        
        for (let i = Cadena.indexOf('^')-1 ; i>=0 ; i--) {
            if (Operaciones.includes(Cadena[i]) && Cadena[i]!=='.') {
                break

            }
            BaseInvertida+=Cadena[i]
            CaracteresInvolucrados.push(i)
        }

        for (let i = Cadena.indexOf('^')+1 ; i<=Cadena.length-1 ; i++) {
            if (Operaciones.includes(Cadena[i])) {

                break
            }
            Exponente+=Cadena[i]
            CaracteresInvolucrados.push(i)
        }

            
        
        for (let i = BaseInvertida.length-1 ; i>=0 ; i--){
            Base+=(BaseInvertida[i])
        }
        
        //REALIZANDO LA OPERACION
        let ResultadoP = parseFloat(Base)
        for (let i = 1 ; i<parseFloat(Exponente) ; i++) {
            
            ResultadoP = ResultadoP *parseFloat(Base)
            
        
        }
        Cadena = Cadena.toString()
        let PrimerCI = 100
         for (x of CaracteresInvolucrados) {
            if (x<PrimerCI){PrimerCI=x}
            Cadena = Cadena.substring(0,x) + 'x' + Cadena.substring(x+1)
        } 
        
        let Borrado = ''
         for (let i = Cadena.length-1 ; i>=0 ; i--) {
            if (CaracteresInvolucrados.includes(i)){
                
                Cadena = Cadena.replace((Cadena[i]),'')
            }
        }
        
        Cadena= Cadena.substring(0,PrimerCI)+ResultadoP+Cadena.substring(PrimerCI)
        
        
        
    }

    //RAIZ

    if (Cadena.includes('√')) {
        

        if (!isNaN(Cadena[Cadena.indexOf('√')-1])) {
           
            Cadena = Cadena.substring(0,Cadena.indexOf('√')) + '*' + Cadena.substring(Cadena.indexOf('√')) 
        }

        let Base = ''
        let ResultadoRaiz = 0
        let UltimoCaracterRaiz = 0
        
        for (let i = Cadena.indexOf('√')+1 ; i<Cadena.length ; i++) {
            if (Operaciones.includes(Cadena[i]) && Cadena[i]!=='.' ){
                break
            }
            
            Base+=Cadena[i]
            UltimoCaracterRaiz = i
        }

    ResultadoRaiz = Math.sqrt(parseFloat(Base))
    
    Cadena = Cadena.substring(0,Cadena.indexOf('√')) + ResultadoRaiz.toString() + Cadena.substring(UltimoCaracterRaiz+1)
    }
    
    //SENO

    if (Cadena.includes('sin')){
        
        if (!isNaN(Cadena[Cadena.indexOf('sin')-1])) {
            Cadena = Cadena.substring(0,Cadena.indexOf('sin')) + '*' + Cadena.substring(Cadena.indexOf('sin')) 
        }    
        
        let Base = ''
        let ResultadoSeno = 0
        let UltimoCaracterSeno = 0
        
        for (let i = Cadena.indexOf('n')+1 ; i<Cadena.length ; i++) {
            if (Operaciones.includes(Cadena[i]) && Cadena[i]!=='.' ){
                break
            }
            
            Base+=Cadena[i]
            UltimoCaracterSeno = i
        }
        
        Base=parseFloat(Base)
        ResultadoSeno = Math.sin(Base*Math.PI/180)
        
        Cadena = Cadena.substring(0,Cadena.indexOf('s')) + ResultadoSeno.toString() + Cadena.substring(UltimoCaracterSeno+1)
        
    }

    //COSENO

    if (Cadena.includes('cos')){
        
        if (!isNaN(Cadena[Cadena.indexOf('cos')-1])) {
            Cadena = Cadena.substring(0,Cadena.indexOf('cos')) + '*' + Cadena.substring(Cadena.indexOf('cos')) 
        }    
        
        let Base = ''
        let ResultadoCos = 0
        let UltimoCaracterCos = 0
        
        for (let i = Cadena.indexOf('s')+1 ; i<Cadena.length ; i++) {
            if (Operaciones.includes(Cadena[i]) && Cadena[i]!=='.' ){
                break
            }
            
            Base+=Cadena[i]
            UltimoCaracterCos = i
        }
        
        Base=parseFloat(Base)
        
        ResultadoCos = Math.cos(Base*Math.PI/180)
        
        Cadena = Cadena.substring(0,Cadena.indexOf('c')) + ResultadoCos.toString() + Cadena.substring(UltimoCaracterCos+1)
        
    }

    //TANGENTE
    if (Cadena.includes('tan')){
        
        if (!isNaN(Cadena[Cadena.indexOf('tan')-1])) {
            Cadena = Cadena.substring(0,Cadena.indexOf('tan')) + '*' + Cadena.substring(Cadena.indexOf('tan')) 
        }    
        
        let Base = ''
        let ResultadoTan = 0
        let UltimoCaracterTan = 0
        
        for (let i = Cadena.indexOf('n')+1 ; i<Cadena.length ; i++) {
            if (Operaciones.includes(Cadena[i]) && Cadena[i]!=='.' ){
                break
            }
            
            Base+=Cadena[i]
            UltimoCaracterTan = i
        }
        
        Base=parseFloat(Base)
        
        ResultadoTan = Math.tan(Base*Math.PI/180)
        
        Cadena = Cadena.substring(0,Cadena.indexOf('t')) + ResultadoTan.toString() + Cadena.substring(UltimoCaracterTan+1)
        
    }

    //EVALUAR LA CADENA
    Cadena = eval(Cadena)
    Cadena = Cadena.toString()
    
    
    
    if(Cadena.includes('.')){
        Cadena = (eval(Cadena)).toFixed(2)    
        Resultado.textContent = Cadena
    }
    else{
        Resultado.textContent = eval(Cadena)
    
    }
        
    Cadena=Resultado.textContent
}
function Borrar () {
    Cadena = Cadena.substring(0,Cadena.length-1)
    CadenaPantalla.textContent=Cadena
}

document.addEventListener('keyup',k=>{
    
Escribir(k.key)
})

ContenedorBotones.addEventListener('click',(b)=>{
    b.preventDefault()
    Escribir(b.target.innerText)
    

})