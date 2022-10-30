import './style.css'
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js"
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"
import * as dat from 'dat.gui'
import { LoadingManager } from 'three'


const gui= new dat.GUI()


//scene
const scene= new THREE.Scene() 

//size
const size = {width: window.innerWidth, height:window.innerHeight}

//camera
const cam = new THREE.PerspectiveCamera(75, size.width/size.height, 1, 100)
cam.position.z = 7
cam.position.x = 0
cam.position.y=0

scene.add(cam)


window.addEventListener("resize", () =>
{
    size.width= window.innerWidth
    size.height= window.innerHeight

    cam.aspect = size.width/ size.height
    cam.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio(Ratio, 2)))
})

//textures
const textureLoader = new THREE.TextureLoader()
const matCap = textureLoader.load('matCap2.png')


//text
const fontLoader = new FontLoader()

fontLoader.load('BadaBoom BB_Regular.json', function(font){
    const textGeometry = new TextGeometry('N i c k  s  f i r s t  \n    w e b s i t e',{
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize:0.03,
        bevelOffset:0,
        bevelSegments:5
    })
    textGeometry.center()

    const textMaterial= new THREE.MeshMatcapMaterial()
    textMaterial.matcap = matCap
    const text = new THREE.Mesh(textGeometry, textMaterial)
    

    const clock = new THREE.Clock

    function tick1(){
        const elapsedTime = clock.getElapsedTime()

        text.rotation.set(2*Math.sin(elapsedTime/3), elapsedTime/3, 0)

        controls.update()

        renderer.render(scene, cam) 

        window.requestAnimationFrame(tick1)
        

    }
    tick1()
    scene.add(text)
})

// objects

const material = new THREE.MeshMatcapMaterial()
material.matcap = matCap

for(let i=0; i<500; i++){
    const materialChoise = Math.floor(Math.random() * 4)
    switch(materialChoise){
        case 0:
            var geomatry = new THREE.BoxGeometry(1,1,1)
            break
        case 1:
            var geomatry = new THREE.SphereGeometry(0.6,16,8)
            break
        case 2:
            var geomatry = new THREE.TorusGeometry(0.3 , 0.2 ,16, 100)
            break
        case 3:
            var geomatry = new THREE.CylinderGeometry(0.25,0.25,1,16)
            break
        default:
            var geomatry = new THREE.BoxGeometry(1,1,1)
            break
    }

    const mesh = new THREE.Mesh(geomatry, material)

    
    mesh.position.set((Math.cos(Math.random()*Math.PI*2))*Math.random() * 40, (Math.sin(Math.random()*Math.PI*2))*Math.random() * 40, (Math.sin(Math.random()*Math.PI*2))* Math.random() * 40)
    mesh.rotation.set((Math.random() -0.5)*10, (Math.random() -0.5)*10, 0 )

    const scale =Math.random() +0.1
    mesh.scale.set(scale,scale,scale)
    if(!(mesh.position.y<3 && mesh.position.y>-3 && mesh.position.x<3 && mesh.position.x>-3 && mesh.position.z<3 && mesh.position.z>-3)){
        scene.add(mesh)
    }
    
}

const mesh = new THREE.Mesh(geomatry, material)
mesh.position.set(50,0,0)
scene.add(mesh)


//renderer
const canvas= document.querySelector(".webgl") 
const renderer= new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width, size.height) 

//controls
const controls = new OrbitControls(cam, canvas)
controls.enableDamping= true
controls.target.y=0
controls.update


//animation
const clock = new THREE.Clock

/** 
function tick()
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, cam) 

    window.requestAnimationFrame(tick)

}

tick()
**/