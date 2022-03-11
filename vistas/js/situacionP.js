			//boton de configuracion __> contexto
      const divcontexto = document.getElementById('i-contexto');
      const btncontexto= document.getElementById('i-btnCont');
      btncontexto.onclick = function () {
        if(divcontexto.style.visibility == "hidden"){
          divcontexto.style.visibility = "visible";
        }else{
          divcontexto.style.visibility = "hidden";
        }
      };
      
        //boton de configuracion __> ayuda
      const divinstrucciones = document.getElementById('i-instrucciones');
      const btnIntruciones= document.getElementById('i-btnInstru');
      btnIntruciones.onclick = function () {
        if(divinstrucciones.style.visibility == "hidden"){
          divinstrucciones.style.visibility = "visible";
        }else{
          divinstrucciones.style.visibility = "hidden";
        }
      };
      
      
        //boton de salir intru y context
        const btnsalirInter = document.getElementById('ig-btnsalirtext');
        const btnsalirInter2 = document.getElementById('ig-btnsalirtext-dos');
        const divcontexto2= document.getElementById('i-contexto');
        const divinstrucciones2 = document.getElementById('i-instrucciones');
      
          btnsalirInter.onclick = function () {
            if(divcontexto2.style.visibility == "visible" ){
              divcontexto2.style.visibility = "hidden";
              divinstrucciones2.style.visibility = "hidden";
            }
            
          
          
          };
          
          btnsalirInter2.onclick = function () {
            if( divinstrucciones2.style.visibility == "visible"){
              //divinstrucciones2.style.visibility == "hidden";
              //divcontexto2.style.visibility = "hidden";
              divinstrucciones2.style.visibility = "hidden";
              divcontexto2.style.visibility = "hidden";
              
            }
          
          };

          
const lWidth = 1920;
const lHeight = 1080;
let mainContainer = null; 
let renderer = null;

/*
 *  var renderer = new PIXI.autoDetectRenderer({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0XAAAAAA
 });
 */

const resizeHandler = () => {
    const scaleFactor = Math.min(
      window.innerWidth / lWidth,
      window.innerHeight / lHeight
    );
    const newWidth = Math.ceil(lWidth * scaleFactor);
    const newHeight = Math.ceil(lHeight * scaleFactor);
    
    renderer.view.style.width = `${newWidth}px`;
    renderer.view.style.height = `${newHeight}px`;
  
    renderer.resize(newWidth, newHeight);
    stage.scale.set(scaleFactor); 
  };

const canvas= document.getElementById("mycanvas"); 

const app = new PIXI.Application({
    antialias: true,
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb 
});



const stage = new PIXI.Container();

const ticker = new PIXI.Ticker();


//Player variables 

//var spritecharacter; 

let playerSheet = {};
var player;
let speedplayer =  8;

// Pointer Events
 let pointerIsDown = false;
 let pointerIsOver = false;
 let pc_up;
 let pc_down;
 let pc;

//techo
let collisitecho = 96;
const collisionup = new PIXI.Sprite(PIXI.Texture.WHITE);
//PISO
let collisionpiso = 96;
const collisionfloor = new PIXI.Sprite(PIXI.Texture.WHITE);
// PARED IZQ
const collisionPared = new PIXI.Sprite(PIXI.Texture.WHITE);
// PARED DER
const collisionPared2 = new PIXI.Sprite(PIXI.Texture.WHITE);
//libreria DE COLISION bump
b = new Bump(PIXI);

PIXI.Loader.shared
  .add("../../vistas/assets/sp/fondos/hospital.png")
  .add("../../vistas/assets/sp/fondos/piso.png")
  .add("../../vistas/assets/sp/interfaz/interfaz.png")
  .add("../../vistas/assets/sp/objetos/mesa.png")
  .add("../../vistas/assets/sp/objetos/casillero.png")
  .add("../../vistas/assets/sp/objetos/accePcs.png")
  .add("../../vistas/assets/sp/objetos/herramientas.png")
  .add("../../vistas/assets/sp/objetos/esu.png")
  .add("../../vistas/assets/sp/personajes/foto.png")
  .load(setup);

  const SpriteHosp = new PIXI.Sprite.from('../../vistas/assets/sp/fondos/pared.png');
  const SpritePiso = new PIXI.Sprite.from('../../vistas/assets/sp/fondos/piso.png');
  const SpriteInterfaz = new PIXI.Sprite.from('../../vistas/assets/sp/interfaz/interfaz.png');
  const SpriteCasillero= new PIXI.Sprite.from('../../vistas/assets/sp/objetos/casillero.png');
  const SpriteHerramientas = new PIXI.Sprite.from('../../vistas/assets/sp/objetos/herramientas.png');
  const SpriteAccesorios = new PIXI.Sprite.from('../../vistas/assets/sp/objetos/accePcs.png');
  const SpriteMesa = new PIXI.Sprite.from('../../vistas/assets/sp/objetos/mesa.png');
  const SpriteFoto = new PIXI.Sprite.from('../../vistas/assets/sp/personajes/foto.png');
  const SpriteEquipo = new PIXI.Sprite.from('../../vistas/assets/sp/objetos/esu.png');

  function setup() {
    renderer = PIXI.autoDetectRenderer(lWidth, lHeight, {
        roundPixels: true,
        resolution: window.devicePixelRatio || 1
      });


    window.addEventListener('resize', resizeHandler, false);
  
    SpriteHosp.position.x = lWidth / 2;
    SpriteHosp.position.y = lHeight / 2.55;
    SpriteHosp.anchor.set(0.5);

    SpritePiso.position.x=lWidth/2;
    SpritePiso.position.y=lHeight/1.4;
    SpritePiso.anchor.set(0.5);
 

    SpriteInterfaz.position.x=lWidth/2;
    SpriteInterfaz.position.y=lHeight/1.48;
    SpriteInterfaz.anchor.set(0.5,0.1);

    SpriteMesa.position.x=lWidth/2;
    SpriteMesa.position.y=lHeight/2.45;
    SpriteMesa.anchor.set(0.5);

    SpriteCasillero.position.x=lWidth/1.3;
    SpriteCasillero.position.y=lHeight/3.6;
    SpriteCasillero.anchor.set(0.5);

    SpriteAccesorios.position.x=lWidth/2;
    SpriteAccesorios.position.y=lHeight/1.7;
    SpriteAccesorios.anchor.set(0.5);

    SpriteHerramientas.position.x=lWidth/6;
    SpriteHerramientas.position.y=lHeight/4;
    SpriteHerramientas.anchor.set(0.5);

    SpriteFoto.position.x=lWidth/13.5;
    SpriteFoto.position.y=lHeight/1.28;
    SpriteFoto.anchor.set(0.5);

    SpriteEquipo.position.x=lWidth/2.5;
    SpriteEquipo.position.y=lHeight/4.7;
    SpriteEquipo.width = 150;
    SpriteEquipo.height = 100;

    

    

    //Colisiones
    collisionup.width = 1920;
    collisionup.height = 50;
    collisionup.position.set(3,lHeight/15);
    collisionup.tint = 0xB3B4C9;

    collisionfloor.width = 1920;
    collisionfloor.height = 100;
    collisionfloor.position.set(3, lHeight/1.3);

    collisionPared.width=100;
    collisionPared.height = 300;
    collisionPared.position.set(-150, lHeight/3.55);
    collisionPared.tint = 0xB3B4C9;

    collisionPared2.width=100;
    collisionPared2.height = 300;
    collisionPared2.position.set(1700, lHeight/3.55);
    collisionPared2.tint = 0xB3B4C9;






//colisones 
app.stage.addChild(collisionfloor);
app.stage.addChild(collisionup);
app.stage.addChild(collisionPared);
app.stage.addChild(collisionPared2);

  
    app.stage.addChild(SpriteHosp);
    app.stage.addChild(SpritePiso);
    app.stage.addChild(SpriteMesa );
    app.stage.addChild(SpriteCasillero );
    app.stage.addChild(SpriteHerramientas );
    app.stage.addChild(SpriteEquipo);
   



    doneLoading();
    createPlayerSheet();
    createPlayer();

    //Textos
  let text = new PIXI.Text('Jessica Jimenez:',{fontFamily: 'Nexa', fontSize: 24, fill : 0x000000, align : 'center'});
  text.position.x = lWidth/6;
  text.position.y = lHeight/1.4;
  
  //stage.addChild(foto);
 

  app.stage.addChild(SpriteAccesorios );
app.stage.addChild(SpriteInterfaz );
app.stage.addChild(text);
app.stage.addChild(SpriteFoto);


SpriteEquipo.interactive= true;
SpriteEquipo.buttonMode= true;
SpriteEquipo.on("pointertap", function(){
    window.location.href = "https://video.eko.com/v/A67YRE?autoplay=true"
});
 


    app.ticker.add(gameLoop);
    gameLoop();
   
    window.addEventListener('resize', resizeHandler, false);
    
  }


  function gameLoop() {
   
    requestAnimationFrame(gameLoop);
    b.hit( player , collisionfloor, true ) ; 
   b.hit( player , collisionPared, true ) ;
    b.hit( player , collisionup, true ) ;
    b.hit( player , collisionPared2, true ) ;
   // app.render(stage);
   renderer.render(stage);
    
}

function createPlayerSheet(){
  let sheet = new PIXI.BaseTexture.from("../../vistas/assets/sp/personajes/Sp_der.png");
  let sheet2 = new PIXI.BaseTexture.from("../../vistas/assets/sp/personajes/Sp_izq.png");
  let sheet3 = new PIXI.BaseTexture.from("../../vistas/assets/sp/personajes/Sp_up.png");
  let sheet4 = new PIXI.BaseTexture.from("../../vistas/assets/sp/personajes/Sp_down.png");
 
  let w = 231;
  let h = 512;

  let w2 = 231;
  let h2 = 490;
 

  playerSheet["derecha"] = [
     
         new  PIXI.Texture(sheet, new PIXI.Rectangle(0*w,0,w,h)),
        new  PIXI.Texture(sheet, new PIXI.Rectangle(1*w,0,w,h)),
      new  PIXI.Texture(sheet, new PIXI.Rectangle(2*w,0,w,h)),
         new  PIXI.Texture(sheet, new PIXI.Rectangle(3*w,0,w,h)),
          new  PIXI.Texture(sheet, new PIXI.Rectangle(4*w,0,w,h)),
          new  PIXI.Texture(sheet, new PIXI.Rectangle(5*w,0,w,h)),
          new  PIXI.Texture(sheet, new PIXI.Rectangle(6*w,0,w,h)),
          new  PIXI.Texture(sheet, new PIXI.Rectangle(7*w,0,w,h)),
     //     new  PIXI.Texture(sheet, new PIXI.Rectangle(8*w,0,w,h)),

  ]

  
  playerSheet["izq"] = [
     
    new  PIXI.Texture(sheet2, new PIXI.Rectangle(0*w,0,w,h)),
   new  PIXI.Texture(sheet2, new PIXI.Rectangle(1*w,0,w,h)),
   new  PIXI.Texture(sheet2, new PIXI.Rectangle(2*w,0,w,h)),
    new  PIXI.Texture(sheet2, new PIXI.Rectangle(3*w,0,w,h)),
     new  PIXI.Texture(sheet2, new PIXI.Rectangle(4*w,0,w,h)),
     new  PIXI.Texture(sheet2, new PIXI.Rectangle(5*w,0,w,h)),
     new  PIXI.Texture(sheet2, new PIXI.Rectangle(6*w,0,w,h)),
    // new  PIXI.Texture(sheet2, new PIXI.Rectangle(7*w,0,w,h)),
   //  new  PIXI.Texture(sheet2, new PIXI.Rectangle(8*w,0,w,h)),

]

playerSheet["abajo"] = [
     
  new  PIXI.Texture(sheet3, new PIXI.Rectangle(0*w2,0,w2,h2)),
 new  PIXI.Texture(sheet3, new PIXI.Rectangle(1*w2,0,w2,h2)),
new  PIXI.Texture(sheet3, new PIXI.Rectangle(2*w2,0,w2,h2)),
  new  PIXI.Texture(sheet3, new PIXI.Rectangle(3*w2,0,w2,h2)),
   new  PIXI.Texture(sheet3, new PIXI.Rectangle(4*w2,0,w2,h2)),
 //  new  PIXI.Texture(sheet3, new PIXI.Rectangle(5*w,0,w,h)),
  // new  PIXI.Texture(sheet3, new PIXI.Rectangle(6*w,0,w,h)),
   //new  PIXI.Texture(sheet3, new PIXI.Rectangle(7*w,0,w,h)),
//   new  PIXI.Texture(sheet3, new PIXI.Rectangle(8*w,0,w,h)),

] 


playerSheet["arriba"] = [
     
  new  PIXI.Texture(sheet4, new PIXI.Rectangle(0*w2,0,w2,h2)),
 new  PIXI.Texture(sheet4, new PIXI.Rectangle(1*w2,0,w2,h2)),
new  PIXI.Texture(sheet4, new PIXI.Rectangle(2*w2,0,w2,h2)),
  new  PIXI.Texture(sheet4, new PIXI.Rectangle(3*w2,0,w2,h2)),
   new  PIXI.Texture(sheet4, new PIXI.Rectangle(4*w2,0,w2,h2)),
 //  new  PIXI.Texture(sheet3, new PIXI.Rectangle(5*w,0,w,h)),
  // new  PIXI.Texture(sheet3, new PIXI.Rectangle(6*w,0,w,h)),
   //new  PIXI.Texture(sheet3, new PIXI.Rectangle(7*w,0,w,h)),
//   new  PIXI.Texture(sheet3, new PIXI.Rectangle(8*w,0,w,h)),

] 

}

function createPlayer(){
  player = new PIXI.AnimatedSprite(playerSheet.derecha);
  player = new PIXI.AnimatedSprite(playerSheet.izq);
  player = new PIXI.AnimatedSprite(playerSheet.abajo);
  player = new PIXI.AnimatedSprite(playerSheet.arriba);

  player.anchor.set(0.5);
  player.animationSpeed= 0.167;
  player.loop = false;
  player.x = 100;
  player.y = lHeight/2;
  player.updateAnchor = true;
  app.stage.addChild(player);
//  player.play();
  
} 

function doneLoading(){

 
  pc_down = PIXI.Texture.from('../../vistas/assets/sp/objetos/pc_down.png');
  pc_up = PIXI.Texture.from('../../vistas/assets/sp/objetos/pc_up.png');
  pc = new PIXI.Sprite(pc_down);

 
 pc.anchor.set(0.5);
  pc.position.set(lWidth/1.8,lHeight/3.3);
  pc.interactive = true;
  pc.buttonMode = true;

 /* pc_up.anchor.set(0.5);
  pc_up.position.set(1300,renderer.height/2.90);
  pc_up.interactive = true;
  pc_up.buttonMode = true;*/
  app.stage.addChild(pc);

  pc.on('pointertap', () => {
     // pointerIsDown= true;
      pointerIsDown = !pointerIsDown;
      if(pointerIsDown){
          pc.texture = pc_up;
          console.log("cambia la segunda textura");
          pc.anchor.set(0.5);
           pc.position.set(lWidth/1.8,lHeight/3.68);
      }else{
          pc.texture = pc_down;
          console.log("cambia la primera textura");
          pc.anchor.set(0.5);
           pc.position.set(lWidth/1.8,lHeight/3.3);

           const PCmessage = setTimeout(Eliminate, 2000);
   // Change the text here
   let textpc = new PIXI.Text('No hay nada más por revisar',{fontFamily : 'Nexa', fontSize: 24, fill : 0x000000, align : 'center'});
   textpc.position.x = 320;
   textpc.position.y = 800;
   app.stage.addChild(textpc);



  

 function Eliminate() {

  stage.removeChild(textpc);
     
      }

      } 

        
   
     
  });

  



}



window.addEventListener("keydown",function(event){
  event.preventDefault();
  //D
  if(event.keyCode == 68){
      if(!player.playing){
          player.textures = playerSheet.derecha;
           player.play();
      }
      
      player.x += speedplayer;
  }
  //A

  if(event.keyCode == 65){
      if(!player.playing){
          player.textures = playerSheet.izq;
           player.play();
      }
      player.x -= speedplayer;
  }

  // W

  if(event.keyCode == 87){
      if(!player.playing){
          player.textures = playerSheet.arriba;
           player.play();
      }
      player.y -= speedplayer;
  }

      // S
  if(event.keyCode == 83){
      if(!player.playing){
        player.textures = playerSheet.abajo;
        player.play();
      }
      player.y += speedplayer;
  }
 
});




//http://jsfiddle.net/2wjw043f/ 
//https://codepen.io/adelciotto/pen/PGPmVm?editors=0110