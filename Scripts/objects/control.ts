/// <reference path="../../typings/tsd.d.ts"/>


module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed:number;
        public zoom:string;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number) {
           this.rotationSpeed = rotationSpeed;
           this.zoom = "ZoomOut";
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        
        //Control Switch event action for Zoom In and ZoomOut the camera
          public switchCamera(): void {
               if (this.zoom == "Zoom In Earth") {
                    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = -20;
                    camera.position.y = 25;
                    camera.position.z = 80;
                    camera.lookAt(new Vector3(5, 0, 0));
                    console.log("Finished setting up Camera...");
                    this.zoom = "Zoom Out";
                } else {
                    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                    camera.position.x = 0;
                    camera.position.y = 0;
                    camera.position.z = 25;
                    camera.lookAt(new Vector3(5, 0, 0));
                    console.log("Finished setting up zoom Earth Camera...");
                    this.zoom = "Zoom In Earth";
                    emptyObjectMoon.add(camera);
                }
       
    }
}


