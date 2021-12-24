import p5Types from "p5"
import {  MaxPoints } from './../utils';


class Boundary {

    public a:p5Types.Vector   
    public b:p5Types.Vector 
    public fullyVisible = false
    public solid:boolean
    private maxPoints: MaxPoints
    constructor(p5:p5Types,x1:number, y1:number, x2:number, y2:number, solid = false) {
      this.a = p5.createVector(x1, y1)
      this.b = p5.createVector(x2, y2)
      this.maxPoints = {p1:undefined, p2:undefined, distance:0}
      this.solid = solid
    }
    
    addPoint(point: p5Types.Vector) {
      
      if (!this.maxPoints.p1) {
        this.maxPoints.p1 = point
      } else if (this.maxPoints.p1 && !this.maxPoints.p2) {
        this.maxPoints.p2 = point
      } else {
        if (!(this.maxPoints.p1 && this.maxPoints.p2)) {
          return
        }
        const distToP1 = p5Types.Vector.dist(point, this.maxPoints.p1)
        const distToP2 = p5Types.Vector.dist(point, this.maxPoints.p2)
        if (distToP1 < this.maxPoints.distance && distToP2 < this.maxPoints.distance) {
          return
        }
        if (distToP1 >= distToP2) {
          this.maxPoints.p2 = point
          this.maxPoints.distance = distToP1
        } else {
          this.maxPoints.p1 = point
          this.maxPoints.distance = distToP2

        }
      }
    }

    clearMaxPoints() {
      this.maxPoints.p1 = undefined
      this.maxPoints.p2 = undefined
      this.maxPoints.distance = 0
    }

    show(p5:p5Types, cameraPos: p5Types.Vector) {
      let a = this.a.copy();
      let b = this.b.copy();
      a.sub(cameraPos);
      b.sub(cameraPos);
      p5.stroke(255)
      if (this.fullyVisible) {
        p5.line(a.x,a.y,b.x,b.y)
        return
      }
      if (!(this.maxPoints.p1 &&this.maxPoints.p2)) {
        return
      }
      
      let first = this.maxPoints.p1 || p5.createVector(this.maxPoints.p2.x+1, this.maxPoints.p2.y+1)
      let second = this.maxPoints.p2 || p5.createVector(this.maxPoints.p1.x+1, this.maxPoints.p1.y+1) 
      first.sub(cameraPos);
      second.sub(cameraPos);
      p5.line(first.x,first.y,second.x,second.y)
    }
  }

export default Boundary