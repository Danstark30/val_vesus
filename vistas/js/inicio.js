import * as THREE from '../../node_modules/three/build/three.module.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from '../../node_modules/three/examples/jsm/loaders/RGBELoader.js';
import { Reflector } from '../../node_modules/three/examples/jsm/objects/Reflector.js';

// variables globales

var container; //nombre de id del div donde se visualizara el render (la escena o entorno 3D)
var sceneWidth, sceneHeight; //ancho y alto de la escena (propiedades de la libreria three js)
var scene; // escena
var renderer; // render
var camera; //camera

let groundMirror ; // variable que almacena el objeto espejo (prpiedad de Three js)
let light1, light2, light3, light4; // variables que almacenas las luces
var model,holo,holo2; // variable de almacena los objetos 3D
let mouseX = 0; // variable que toma la posición del cursor en el eje X, para las particulas
let mouseY = 0;// variable que toma la posición del cursor en el eje Y, para las particulas

var angle = 0; //variable para la animacion (ángulo)
var angularSpeed = THREE.Math.degToRad(5); // variable que almacena la velocidad del angulo el cual permite gira la camara
var delta = 0; // variable para conocer el tiempo de la animación 
var radius = 16; // variable que almacena la distancia, la cual gira la camara (radio de la circuferencia cuando se activa la animación)
const mouse = new THREE.Vector2(); // variable la cual toma el valor del mouse en los ejes Y y X
const target = new THREE.Vector2(); // variable la cual toma el valor de un punto ejes Y y X (objetivo)
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 ); // variable la cual calcula el punto a partir del tamaño y la altura de container (ventana)
const clock = new THREE.Clock(); // (Objeto para llevar la cuenta del tiempo) variable que determina el tiempo  de reproduccion de las animaciones en el espacio



const  BLOOM_SCENE = 1;  // variable que almacena la intensidad del efecto de Bloom-Blurring / se aplica en los  hologramas

const bloomLayer = new THREE.Layers(); //capa
bloomLayer.set( BLOOM_SCENE );

const params = {
	exposure: 1,
	bloomStrength: 5,
	bloomThreshold: 0,
	bloomRadius: 0
};

const darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );

// DOM EVENT 

 var inactivityTime = function () {
    var time;
    window.onscroll = resetTimer;
	window.onload = resetTimertwo;
    // DOM Events
  

    function logout() {
	
			document.getElementsByTagName("body")[0].style.cursor = "url('../assets/iconos/scroll1.png'), auto";
		
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 3000)

		

		
        // 1000 milliseconds = 1 second
    }
	function resetTimertwo() {
        clearTimeout(time);
        time = setTimeout(logout, 5000)
        // 1000 milliseconds = 1 second
    }
};

window.onscroll = function() {
  inactivityTime();
} 

window.addEventListener("mouseover", e => {
   
		document.getElementsByTagName("body")[0].style.cursor = "default";
      
 
});

/** 
 * @function init primera funcion la cual permite inicialkizar todas las variables de ThreeJS 
*/





init();

function init() {

	createScene();
	update();


}

function createScene() {

	sceneWidth = window.innerWidth;
	sceneHeight = window.innerHeight;


	
	//Creación de Escena
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x0F2234);
	//scene.fog = new THREE.Fog( 0x0F2234, 2, 50 );
	



	//Render = renderización del entorno
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( sceneWidth, sceneHeight );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;
	//canvas = llama la variable del documento index.html que se llama container y lo iguala a la variable creada para three js, llamada canvas
	container = document.getElementById( 'pcontainer' );
	container.appendChild( renderer.domElement );

    //camara

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set(0,1,2 );
	

    //llama a la función de pantalla completa y su responsive
	window.addEventListener( 'resize', onWindowResize );

	// LIGHTS

	const sphere = new THREE.SphereGeometry( 0.5, 16, 8 );
	const plane = new THREE.PlaneGeometry( 1, 1 );
	const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.1 );
	scene.add( light );



	
	
	light1 = new THREE.PointLight( 0x5298CA, 1, 60 );
				light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x5298CA } ) ) );
				scene.add( light1 );

				light2 = new THREE.PointLight( 0x5298CA, 1, 60 );
				light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x5298CA } ) ) );
				scene.add( light2 );

				light3 = new THREE.PointLight( 0x5298CA, 1, 60 );
				light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x5298CA } ) ) );
				scene.add( light3 );

				light4 = new THREE.PointLight( 0x5298CA, 1, 60 );
				light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x5298CA } ) ) );
				scene.add( light4 );


	/*controls = new OrbitControls( camera, renderer.domElement );
			
	controls.enableDamping = false; 
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;

	controls.minDistance = 5;
	controls.maxDistance = 50;

	controls.maxPolarAngle = Math.PI / 4;  */




	new RGBELoader()
	.setPath( './assets/hdri/' )
	.load( 'hospital_room_4k.hdr', function ( texture ) {

		texture.mapping = THREE.EquirectangularReflectionMapping;

	//	scene.background = texture;
		scene.environment = texture;

	} ); 

	

	

	

	//MIRROW

	// reflectors/mirrors

	let geometry, material;

	geometry = new THREE.CircleGeometry( 40, 64 );
	groundMirror = new Reflector( geometry, {
		clipBias: 0.003,
		textureWidth: window.innerWidth * window.devicePixelRatio,
		textureHeight: window.innerHeight * window.devicePixelRatio,
		color: 0x777777
	} );
	groundMirror.position.y = 0.5;
	groundMirror.rotateX( - Math.PI / 2 );
	scene.add( groundMirror ); 

			

			


    const loaderESU= new GLTFLoader();
	loaderESU.load( './assets/modelado/ESUW.gltf', function ( gltf ) {


		 model = gltf.scene
		model.position.set(0,1.5,185);
		
		//model.rotation.y= -Math.PI/2;


		 scene.add( model);
		 console.log( 'entorno cargado' );

		 //renderer.render( scene.camera );
		

	 } );

	 //creacion de particulas


	const particlesGeometry =  new THREE.BufferGeometry;
	const particleCont = 5000;
	const posArray = new Float32Array(particleCont * 3);

	for(let i = 0; i < particleCont * 3; i++){
		//posArray[i] = Math.random()
		posArray[i] = (Math.random() - 0.5) * (Math.random()*5)
	}

	particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
	particlesGeometry.scale(15,15,15);

	//material

	const materialp = new THREE.PointsMaterial({

	//	depthTest: false,
    //    depthWrite: false,
		size: 0.001,
		color: 0x5AA9D6
	//	map: cross,
	//	transparent: true
		
		
	});

	//Mesh particulas

	const particlesmesh = new THREE.Points(particlesGeometry,materialp)
	
	scene.add(particlesmesh);

	//Mouse

	document.addEventListener('mousemove', animaParticles);
	

	function animaParticles(event){
		mouseX = event.clientX
		mouseY = event.clientY
	}


	//Animacion de particulas

	const clock = new  THREE.Clock()

	const tick = () =>{
		const elapseTime = clock.getElapsedTime()

		particlesmesh.rotation.y = -0.1 * elapseTime;

		if(mouseX > 0){
			particlesmesh.rotation.x = -mouseY * (elapseTime*0.00008)
			particlesmesh.rotation.y = -mouseX * (elapseTime*0.00008)
		}

		window.requestAnimationFrame(tick)


	}

	tick();






	document.addEventListener( 'mousemove', onMouseMove, false );




	//Hologram

	

	const Hologram= new GLTFLoader();
	Hologram.load( './assets/modelado/Holo2.gltf', function ( gltf2 ) {

		holo = gltf2.scene;
		 holo.position.set(0,15,0);
		 holo.scale.set(4,5,4);
		 holo.material = darkMaterial;
		 holo.layers.enable( BLOOM_SCENE );
		
		//model.rotation.y= -Math.PI/2;


		 scene.add( holo);
		 console.log( 'entorno cargado' );


		 //renderer.render( scene.camera );
		

	 } );
		

	 const Hologram2= new GLTFLoader();
	Hologram2.load( './assets/modelado/Holo2.gltf', function ( gltf3 ) {

		holo2 = gltf3.scene;
		 holo2.position.set(0,37,0);
		 holo2.scale.set(4,5,4);
	
		
		//model.rotation.y= -Math.PI/2;


		 scene.add( holo2);
		 console.log( 'entorno cargado' );


		 
		

	 } );

	

}



function onMouseMove( event ) {

	mouse.x = ( event.clientX - windowHalf.x );
	mouse.y = ( event.clientY - windowHalf.x );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}


/************Funcion update*************** */

function update() {

	requestAnimationFrame( update );
	render();



}








/************Funcion render *************** */
function render() {

	
	const time = Date.now() * 0.0005;
	const delta = clock.getDelta();

	

	light1.position.x = Math.sin( time * 0.7 ) * 30;
	light1.position.y = Math.cos( time * 0.5 ) * 40;
	light1.position.z = Math.cos( time * 0.3 ) * 30;

	light2.position.x = Math.cos( time * 0.3 ) * 30;
	light2.position.y = Math.sin( time * 0.5 ) * 40;
	light2.position.z = Math.sin( time * 0.7 ) * 30;

	light3.position.x = Math.sin( time * 0.7 ) * 30;
	light3.position.y = Math.cos( time * 0.3 ) * 40;
	light3.position.z = Math.sin( time * 0.5 ) * 30;

	light4.position.x = Math.sin( time * 0.3 ) * 30;
	light4.position.y = Math.cos( time * 0.7 ) * 40;
	light4.position.z = Math.sin( time * 0.5 ) * 30;
	
	target.x = ( 1 - mouse.x ) * 0.002;
  target.y = ( 1 - mouse.y ) * 0.002;
  
  camera.rotation.x += 0.00001 * ( target.y - camera.rotation.x );
  camera.rotation.y += 0.001 * ( target.x - camera.rotation.y );
	


camera.position.x = Math.cos(angle) * radius;
camera.position.z = Math.sin(angle) * radius;
angle += angularSpeed * delta; 


if (holo) holo.rotation.y +=0.0002;
if (holo2) holo2.rotation.y +=0.0005;
camera.lookAt(0,2,0);

  

	renderer.render( scene, camera );
	

}

