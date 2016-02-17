/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var sun: Mesh;
var planet: Mesh;
var planet2: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var vertices: Vector3[] = new Array<Vector3>();
var faces: Face3[] = new Array<Face3>();
var customGeometry: Geometry;
var customMaterials: Material[] = new Array<Material>();
var customMesh: Object3D;
var moon: Mesh;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
   /**
    plane = new gameObject(
        new PlaneGeometry(60, 40, 1, 1),
        new LambertMaterial({ color: 0xffffff }),
        0, 0, 0);


    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
      */
      
          //Add a Cube to the Scene
    sun = new gameObject(
        new SphereGeometry(4, 20, 20),
        new LambertMaterial({ color: 0xff35ff }),
        0, 4, 0);

    //scene.add(sun);
    console.log("Added Cube Primitive to scene...");          
          
    sphere = new gameObject(
        new SphereGeometry(8, 20, 20), //2
        new LambertMaterial({ color: 0xff35ff }),
        10, 0, 0);

        //sun.add(sphere);
    scene.add(sphere);
    console.log("Added Cube Primitive to scene...");
    
    moon = new gameObject(
        new SphereGeometry(6, 10, 10), //0.5
        new LambertMaterial({ color: 0xff0000 }),
        15, 0, 0); //2

    sphere.add(moon)
    console.log("Added Child Cube Primitive to cube object...");
    
    
        planet2 = new gameObject(
        new SphereGeometry(2, 20, 20),
        new LambertMaterial({ color: 0xff3500 }),
        20, 0, 0);

        //sun.add(planet2);
    scene.add(sphere);
    console.log("Added Cube Primitive to scene...");
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x090909);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // Call the Custom Mesh function
    //initializeCustomMesh();
    
    
    // add controls
    gui = new GUI();
    control = new Control(0.05);
    addControl(control);
    //gui = new GUI();
    //control = new Control(customMesh);
    //addControlPoints();
    //addControl(control);

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
    //rotation
    sphere.rotation.y += control.rotationSpeed;
    moon.rotation.y += control.rotationSpeed;
    
   // sun.rotation.y += control.rotationSpeed;
    
    
/**
    vertices = new Array<Vector3>();
    for (var index = 0; index < 8; index++) {
        vertices.push(new Vector3(
            control.points[index].x,
            control.points[index].y,
            control.points[index].z));
    }
     */

    // remove our customMesh from the scene and add it every frame 
 //   scene.remove(scene.getObjectByName("customMesh"));
  //  createCustomMesh();

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
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new Vector3(5, 0, 0));
    console.log("Finished setting up Camera...");
}
