//Source File: gameonject.ts  
//Author: Johanna Ponce 
//Last Modified Date: Feb, 26, 2016  
//Last Modified by: Johanna Ponce 
//Solar system objects constructor

// <reference path="../../typings/tsd.d.ts"/>

module objects {
    export class gameObject extends THREE.Mesh {
        //PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        private _geometry: THREE.Geometry;
        public _material: THREE.Material;
        //public material: THREE.MeshPhongMaterial;
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(geometry: THREE.Geometry, material: THREE.Material, x:number, y:number, z:number) {
            super(geometry, material);
            this._geometry = geometry;
            this._material = material;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
        
       public applyTexture() :void       
      {
      //_material.
      }
    }
}