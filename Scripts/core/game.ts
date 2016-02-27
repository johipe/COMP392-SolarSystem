/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import AmbientLight = THREE.AmbientLight;
import DirectionalLight = THREE.DirectionalLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;

//Custom Game Objects
import gameObject = objects.gameObject;

var emptyObject: Object3D;
var emptyObjectforMars: Object3D;
var emptyObjectforSaturn: Object3D;
var emptyObjectforPlanet4: Object3D;
var emptyObjectforPlanet5: Object3D;
var emptyObjectMoon: Object3D;
var emptyObjectCamera: Object3D;
var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var plane: Mesh;
var sphere: Mesh;
var earth: Mesh;
var mars: Mesh;
var saturn: Mesh;
var planet4: Mesh;
var planet5: Mesh;
var sun: Mesh;
var ring: Mesh;
var sunlight: SpotLight;
var planet: Mesh;
var planet2: Mesh;
var ambientLight: AmbientLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var moon: Mesh;
var moon1_planet4: Mesh;
var moon2_planet4: Mesh;
var textureLoader = new THREE.TextureLoader()
var earthTexture, moonTexture, sunTexture, marsTexture, saturnTexture, planet4Texture, planet5Texture, ringTexture;

function init() {
    
    //load planet textures
    loadTextures(); 
   
    // Instantiate a new Scene object
    scene = new Scene();

    // setup the default renderer
    setupRenderer(); 
    
    // setup the camera
    setupCamera(); 
    //setupZoomEarthCamera();
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
           
    //Add sun to the center of the scene        
    sun = new gameObject(
        new SphereGeometry(8, 32, 32),
        //new LambertMaterial({ color: 0xffff00 }),
        new THREE.MeshPhongMaterial({ map: sunTexture, transparent: true }),
        0, 0, 0);

    
    
var pointlight = new THREE.PointLight();
pointlight.position.set(0,0,0);
//scene.add(pointlight);    
      
var spotlight = new THREE.SpotLight(0xFFFFFF, 1);
spotlight.position.set(0,0,0);
spotlight.target.position.set(50,0,0);
spotlight.angle = Math.PI /2;
scene.add(spotlight);
scene.add(spotlight.target);

var spotlight2 = new THREE.SpotLight(0xFFFFFF, 1);
spotlight2.position.set(0,0,0);
spotlight2.target.position.set(-50,0,0);
spotlight2.angle = Math.PI /2;
scene.add(spotlight2);
scene.add(spotlight2.target);

var spotlight3 = new THREE.SpotLight(0xFFFFFF, 1);
spotlight3.position.set(0,0,0);
spotlight3.target.position.set(0,0,50);
spotlight3.angle = Math.PI /2;
scene.add(spotlight3);
scene.add(spotlight3.target);

var spotlight4 = new THREE.SpotLight(0xFFFFFF, 1);
spotlight4.position.set(0,0,0);
spotlight4.target.position.set(0,0,-50);
spotlight4.angle = Math.PI /2;
scene.add(spotlight4);
scene.add(spotlight4.target);

var spotlight5 = new THREE.SpotLight(0xFFFFFF, 1);
spotlight5.position.set(0,0,0);
spotlight5.target.position.set(50,0,50);
spotlight5.angle = Math.PI /2;
scene.add(spotlight5);
scene.add(spotlight5.target);
     
    scene.add(sun);
    
    //sun.add(sunlight);
    console.log("Added Sun and sunlight to scene...");
    
    //Earth object
    earth = new gameObject(
        new THREE.SphereGeometry(8, 32, 32),
        new THREE.MeshPhongMaterial({ map: earthTexture, transparent: false }),
        40, 0, 0);

    // earth.position.set(5, 9, 10);
    //scene.add(earth);

    console.log("Added earth planet to scene...");
    
    //Moon Object
    moon = new gameObject(
        new SphereGeometry(3, 32, 32), //0.5
        //new LambertMaterial({ color: 0xff0000 }),
        new THREE.MeshPhongMaterial({ map: moonTexture, transparent: false }),
        15, 0, 0); //2
    
    //empty object to rotate moon around the earth
    emptyObjectMoon = new Object3D();
    emptyObjectMoon.position.set(40, 0, 0);
    emptyObjectMoon.add(moon);
    console.log("Added moon to moon empty object...");
   
    //empty object to rotate the earth and moon together around the sun
    emptyObject = new Object3D();
    emptyObject.position.set(0, 0, 0);
    emptyObject.add(emptyObjectMoon);
    emptyObject.add(earth);
    scene.add(emptyObject);

    console.log("Added eath and moon to empty object and to the Scene...");
    
    //Mars object
    mars = new gameObject(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshPhongMaterial({ map: marsTexture, transparent: false }),
        15, 0, 0);
        
    emptyObjectforMars = new Object3D();
    emptyObjectforMars.position.set(0,0,0);
    emptyObjectforMars.add(mars);
    scene.add(emptyObjectforMars);    

    //scene.add(mars);
    console.log("Added mars the Scene...");
    
    //Saturn and Ring Object
    saturn = new gameObject(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshPhongMaterial({ map: saturnTexture, transparent: false }),
        -65, 0, 0);

    ring = new gameObject(
        new THREE.RingGeometry(6, 8, 18, 18, 0, Math.PI * 2),
        //new THREE.MeshLambertMaterial({ map: ringTexture, transparent: false }),
        new THREE.MeshLambertMaterial({ color: 0x9FB6CD, wireframe: true }),
        -65, 0, 0);

    ring.rotation.y = 10;
    ring.rotation.x = 20;
    //saturn.add(ring);
    emptyObjectforSaturn = new Object3D();
    emptyObjectforSaturn.position.set(0,0,0);
    emptyObjectforSaturn.add(saturn);
    emptyObjectforSaturn.add(ring);
    scene.add(emptyObjectforSaturn);
    
    //scene.add(ring);
    //scene.add(saturn);

    console.log("Added Saturn and ring the Scene...");


    //Planet4 and moons objects    
    planet4 = new gameObject(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshPhongMaterial({ map: planet4Texture, transparent: false }),
        -75, 0, 0); 
        

        
        
     moon1_planet4 = new gameObject(
        new SphereGeometry(1, 32, 32), //0.5
        //new LambertMaterial({ color: 0xff0000 }),
        new THREE.MeshPhongMaterial({ map: moonTexture, transparent: false }),
        -5, -3, 0);

     moon2_planet4 = new gameObject(
        new SphereGeometry(0.5, 32, 32), //0.5
        //new LambertMaterial({ color: 0xff0000 }),
        new THREE.MeshPhongMaterial({ map: moonTexture, transparent: false }),
        3, 1, 2); 

    planet4.add(moon1_planet4);
    planet4.add(moon2_planet4);
    
        emptyObjectforPlanet4 = new Object3D();
        emptyObjectforPlanet4.position.set(0,0,0);
        emptyObjectforPlanet4.add(planet4);
        scene.add(emptyObjectforPlanet4)
    
    //scene.add(planet4);
    console.log("Added Planet 4 and moons to scene...");

    //Planet5 object
    planet5 = new gameObject(
        new THREE.SphereGeometry(4, 32, 32),
        new THREE.MeshPhongMaterial({ map: planet5Texture, transparent: false }),
        85, 0, 0);
        
        emptyObjectforPlanet5 = new Object3D();
        emptyObjectforPlanet5.position.set(0,0,0);
        emptyObjectforPlanet5.add(planet5);
        
        scene.add(emptyObjectforPlanet5);

    //scene.add(planet5);
    console.log("Added Planet5 to scene...");
    
    // Add an AmbientLight to the scene
    //ambientLight = new AmbientLight(0x0c0c0c);
    ambientLight = new AmbientLight(0xb0b0b0);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
     //Add a SpotLight to the scene
     var spotLightToSun = new SpotLight(0xffffff);
     spotLightToSun.position.set(0, 0, 50); //-40, 60, 10
     spotLightToSun.castShadow = true;
    // scene.add(spotLightToSun);
     console.log("Added a SpotLight Light to Scene");
     
 
    // add controls
    gui = new GUI();
    control = new Control(0.002);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
    gui.add(controlObject, 'switchCamera');
    gui.add(controlObject, 'zoom').listen();
}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();
    //objects rotation arount its own center
    earth.rotation.y += control.rotationSpeed;
    moon.rotation.y += (control.rotationSpeed * 3);
    
    //Planets rotatio around the sun
    emptyObjectMoon.rotation.y += (control.rotationSpeed * 8);
    planet4.rotation.y -= control.rotationSpeed;
    emptyObject.rotation.y += control.rotationSpeed;
    
    emptyObjectforMars.rotation.y += control.rotationSpeed * 2;
    mars.rotation.y +=control.rotationSpeed;
    
    emptyObjectforSaturn.rotation.y += control.rotationSpeed *1.5;
    saturn.rotation.y += control.rotationSpeed;
    
    emptyObjectforPlanet4.rotation.y += control.rotationSpeed;
    planet4.rotation.y += control.rotationSpeed *8;
    
    emptyObjectforPlanet5.rotation.y += control.rotationSpeed * 4;
    planet5.rotation.y += control.rotationSpeed;

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 80;
    camera.position.z = 160;
    camera.lookAt(new Vector3(0, 0, 0));
    console.log("Finished setting up Camera...");
}

// Setup main camera for the scene
function setupZoomEarthCamera(): void {
    camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 25;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up zoom Earth Camera...");
}

function loadTextures(): void {
    earthTexture = textureLoader.load("/Content/img/1_earth_1k.jpg");
    moonTexture = textureLoader.load("/Content/img/moonmap1k.jpg");
    sunTexture = textureLoader.load("/Content/img/realsun.jpg");
    marsTexture = textureLoader.load("/Content/img/planet_texture2.png");
    saturnTexture = textureLoader.load("/Content/img/planet_texture5.png");
    planet4Texture = textureLoader.load("/Content/img/planet_texture3.png");
    planet5Texture = textureLoader.load("/Content/img/planet_texture4.png");
    ringTexture = textureLoader.load("/Content/img/SaturnRings.png");
}