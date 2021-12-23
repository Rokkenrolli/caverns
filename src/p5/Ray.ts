import p5Types from "p5"
import Boundary from "./Boundary"


class Ray {
    
    public pos:p5Types.Vector
    public dir:p5Types.Vector
    public alpha:number |undefined
    public angle:number
    constructor(pos:p5Types.Vector, angle:number,alpha = 255) {
      this.pos = pos
      this.dir = p5Types.Vector.fromAngle(angle)
      this.alpha = alpha
      this.angle = angle
    }
    
    show(p5:p5Types) {
      p5.stroke(255, this.alpha)
      p5.push()
      p5.translate(this.pos.x, this.pos.y)
      p5.line(0, 0, this.dir.x * 50, this.dir.y * 50)
      p5.pop()
    }
    
    lookAt(x:number, y:number) {
      this.dir.x = x - this.pos.x
      this.dir.y = y - this.pos.y
      this.dir.normalize()
    }

    rayCast = (p5:p5Types, wall:Boundary) => {
      const x1 = wall.a.x
      const y1 = wall.a.y
      const x2 = wall.b.x
      const y2 = wall.b.y
      
      const x3 = this.pos.x
      const y3 = this.pos.y
      const x4 = this.pos.x + this.dir.x
      const y4 = this.pos.y + this.dir.y
      
      const den1 = (x1 - x2) * (y3 - y4)
      const den2 = (y1 - y2) * (x3 - x4)
      const den = den1 - den2
      if (den === 0) return null
      
      const t1 = (x1 - x3) * (y3 - y4)
      const t2 = (y1 - y3) * (x3 - x4)
      const t = (t1 - t2) / den
      
      const u1 = (x1 - x2) * (y1 - y3)
      const u2 = (y1 - y2) * (x1 - x3)
      const u = - (u1 - u2) / den
      
      if (t > 0 && t < 1 && u > 0) {
        const pt = p5.createVector()
        pt.x = x1 + t * (x2 - x1)
        pt.y = y1 + t * (y2 - y1)
        return pt
      } else {
        return undefined
      }
    }

    
    
    
  cast(p5:p5Types, wall:Boundary) {
     return this.rayCast(p5,wall)
  }
}
  export default Ray