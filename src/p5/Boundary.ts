import p5Types from "p5"


class Boundary {

    public a:p5Types.Vector   
    public b:p5Types.Vector 

    constructor(p5:p5Types,x1:number, y1:number, x2:number, y2:number) {
      this.a = p5.createVector(x1, y1)
      this.b = p5.createVector(x2, y2)
    }
    
    show(p5:p5Types) {
      p5.stroke(255)
      p5.line(this.a.x, this.a.y, this.b.x, this.b.y)
    }
  }

export default Boundary