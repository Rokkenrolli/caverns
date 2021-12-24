import p5Types from "p5"
import { Hit } from "../utils"
import Boundary from "./Boundary"
import Ray from "./Ray"


class Particle {
    
    public pos:p5Types.Vector
    public rays: Ray[]
    public maxRayLength:number | undefined
    public size:number
    public visionRadius:number
    public angle:number
    public fov: number    
    public nroOfRays:number


    constructor(p5:p5Types,pos: p5Types.Vector,size:number,visionRadius:number,angle:number, fov:number,nroOfRays = 360, maxRayLength?:number) {
      this.size = size
      this.pos = pos
      this.rays = []
      this.visionRadius = visionRadius
      this.maxRayLength = maxRayLength
      this.nroOfRays = nroOfRays
      this.fov = p5.radians(fov)
      this.angle = p5.radians(angle)
      
    }

    tiltAngle(angle:number) {
      this.angle += angle
    }

    onKeyDown = (p5:p5Types, tiltAmount =2, multAmount=1.3) => {
      const dirvec= p5Types.Vector.fromAngle(this.angle).mult(multAmount) 
      
      if(p5.keyIsDown(p5.LEFT_ARROW)) {
        this.tiltAngle(p5.radians(-tiltAmount))
      }
      if(p5.keyIsDown(p5.RIGHT_ARROW)) {
        this.tiltAngle(p5.radians(tiltAmount))
      }
      if(p5.keyIsDown(p5.UP_ARROW)) {
        console.log(`current angle vector (${dirvec.x}, ${dirvec.y})`)
        this.pos.add(dirvec.x, dirvec.y, dirvec.z)
        console.log(this.pos)
      }
      if(p5.keyIsDown(p5.DOWN_ARROW)) {
        console.log(`current angle vector ${dirvec}`)
        this.pos.sub(dirvec.x, dirvec.y, dirvec.z)

      }
        
  }

    updateRays(p5:p5Types) {
      this.rays= []
      let angleIncrement = this.fov / this.nroOfRays
      let startAngle = this.angle - this.fov / 2.0;
      const maxAlpha = 120

      for (let a = 0; a < this.nroOfRays; a++ ) {
        const angle =(a* angleIncrement) + startAngle;
        const alpha = (1 - Math.abs(a - this.nroOfRays/2.0)/(this.nroOfRays/2.0)) * maxAlpha;
        const ray = new Ray(this.pos, angle,alpha)
        
        //console.log(` node angle ${this.angle} ray angle ${ray.angle}alpha values: ${ray.alpha}`)
        this.rays.push(ray)
      }
    }
    
    updatePosition(x:number, y:number) {
      this.pos.set(x, y)
    }
    
    isFullyVisible(wall:Boundary) {
      return p5Types.Vector.dist(wall.a, this.pos) <= this.visionRadius && p5Types.Vector.dist(wall.b, this.pos) <= this.visionRadius
    }

    nearby(p5:p5Types, walls:Boundary[]) {
      walls.forEach(wall => {
        const points = this.circleLineIntersection(p5,this.visionRadius, wall)
        if (points.length) {
          points.forEach(p => {
            wall.addPoint(p)

          })
        }
      })
    
    }

    look(p5:p5Types,walls: Boundary[], cameraPos: p5Types.Vector) {
    
      for (let ray of this.rays) {
        let hit: Hit = {closest:undefined, distance: Infinity, wall: undefined}
        
        walls.forEach(wall  =>  {
          wall.fullyVisible = this.isFullyVisible(wall)
          let pt = ray.cast(p5,wall)
          if (pt) {
            const d = p5Types.Vector.dist(this.pos, pt)
            if (d < hit.distance) {
              hit.closest = pt
              hit.distance = d
              hit.wall = wall
            }
          }
        })
        
        if (hit.closest) {
          let relPos = this.pos.copy();
          let relHit = hit.closest.copy();
          relPos.sub(cameraPos);
          relHit.sub(cameraPos);
          p5.stroke(255, ray.alpha)
          p5.strokeWeight(2)
          p5.line(relPos.x, relPos.y, relHit.x, relHit.y)
          if (hit.wall) {
            hit.wall.addPoint(hit.closest)

          }
        }

      }
      //console.log(`number of rays: ${this.rays.length}, number of casted rays: ${casted_rays}, number of casted walls ${casted_wall}`)
    }
    
    show(p5:p5Types, cameraPos: p5Types.Vector) {
      let relPos = this.pos.copy();
      relPos.sub(cameraPos);
      p5.noStroke()
      p5.fill(255)
      p5.ellipse(relPos.x, relPos.y, this.size)
      p5.stroke(255, 40)
      p5.noFill()
      p5.ellipse(relPos.x,relPos.y,this.visionRadius*2)
     
    }

  circleLineIntersection =(p5:p5Types,radius:number, wall:Boundary):p5Types.Vector[] =>{
  const d = p5Types.Vector.sub(wall.b,wall.a)
  const f = p5Types.Vector.sub(wall.a,this.pos)
  //console.log(`direction ${d.toString()} from sphere ${f.toString()}`)
  let a = p5Types.Vector.dot(d,d)
  let b = 2*p5Types.Vector.dot(f,d)
  let c = p5Types.Vector.dot(f,f) - (radius*radius)
  let discriminant = (b*b)- (4*a*c)
  const points:p5Types.Vector[] = []
  if (discriminant < 0 ) {
    return points
  }
  discriminant = Math.sqrt(discriminant)
  const t1 = (-b -discriminant) / (2*a)
  const t2 = (-b + discriminant) / (2*a)
  if (t1 >= 0 && t1 <= 1) {
    const point = p5Types.Vector.add(wall.a,p5Types.Vector.mult(d,t1))
    points.push(point)
  }
  if (t2>= 0 && t2 <= 1) {
    const point = p5Types.Vector.add(wall.a,p5Types.Vector.mult(d,t2))
    points.push(point)
  }
  if (t1 <0 && t2 > 1 ) {
    points.push(wall.a)
    points.push(wall.b)
  }

  return points  
}



  }

  export default Particle