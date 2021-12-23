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
    
    constructor(p5:p5Types,pos: p5Types.Vector,size:number,visionRadius=10,nroOfRays = 360, maxRayLength?:number) {
      this.size = size
      this.pos = pos
      this.rays = []
      this.visionRadius = visionRadius
      this.maxRayLength = maxRayLength
      let angleIncrement = 360 / nroOfRays
      for (let a = 0; a < nroOfRays; a++ ) {
        this.rays.push(new Ray(this.pos, p5.radians(a* angleIncrement)))
      }
    }
    
    update(x:number, y:number) {
      this.pos.set(x, y)
    }
    
    isFullyVisible(wall:Boundary) {
      return p5Types.Vector.dist(wall.a, this.pos) <= this.visionRadius && p5Types.Vector.dist(wall.b, this.pos) <= this.visionRadius
    }

    look(p5:p5Types,walls: Boundary[]) {
      walls.forEach(b => {
        b.clearMaxPoints()
        b.fullyVisible = false
      })
      for (let ray of this.rays) {
        let hit: Hit = {closest:undefined, distance: Infinity, wall: undefined}
        
        
        for (let wall of walls) {
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
        }
        
        if (hit.closest && hit.wall) {
          hit.wall.addPoint(hit.closest)
          p5.stroke(255, 100)
          p5.strokeWeight(2)
          p5.line(this.pos.x, this.pos.y, hit.closest.x, hit.closest.y)
        }
      }
    }
    
    show(p5:p5Types) {
      p5.noStroke()
      p5.fill(255)
      p5.ellipse(this.pos.x, this.pos.y, this.size)
      
       for (const ray of this.rays) {
         ray.show(p5)
      }
    }
  }

  export default Particle