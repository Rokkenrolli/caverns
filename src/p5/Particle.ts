import p5Types from "p5"
import Boundary from "./Boundary"
import Ray from "./Ray"


class Particle {
    
    public pos:p5Types.Vector
    public rays: Ray[]
    public maxRayLength:number | undefined
    constructor(p5:p5Types,pos: p5Types.Vector, maxRayLength?:number) {
      this.pos = pos
      this.rays = []
      let rays = 300
      this.maxRayLength = maxRayLength
      for (let a = 0; a < 359.9; a += 360 / rays) {
        this.rays.push(new Ray(this.pos, p5.radians(a)))
      }
    }
    
    update(x:number, y:number) {
      this.pos.set(x, y)
    }
    
    look(p5:p5Types,walls: Boundary[]) {
      for (let ray of this.rays) {
        let closest:p5Types.Vector|undefined = undefined
        let record:number = Infinity
        if(this.maxRayLength) {
            closest = p5Types.Vector.mult(ray.dir, this.maxRayLength)
            record = p5Types.Vector.dist(this.pos, closest)
        }
        
        for (let wall of walls) {
          let pt = ray.cast(p5,wall)
          if (pt) {
            const d = p5Types.Vector.dist(this.pos, pt)
            if (d < record) {
              closest = pt
              record = d
            }
          }
        }
        
        if (closest) {
          p5.stroke(255, 100)
          p5.strokeWeight(4)
          p5.line(this.pos.x, this.pos.y, closest.x, closest.y)
        }
      }
    }
    
    show(p5:p5Types) {
      p5.noStroke()
      p5.fill(255)
      p5.ellipse(this.pos.x, this.pos.y, 16)
      
       for (const ray of this.rays) {
         ray.show(p5)
      }
    }
  }

  export default Particle