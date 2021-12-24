import Sketch from "react-p5";
import p5Types from "p5";
import Boundary from "../p5/Boundary";
import Particle from "../p5/Particle";

interface ComponentProps {
  width: number;
  height: number;
  className?: string;
}

const MainSketch: React.FC<ComponentProps> = ({ width, height, className }) => {
  let walls: Boundary[] = [];
  let particle: Particle;

  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    walls.push(new Boundary(p5, 0, 0, p5.width, 0));
    walls.push(new Boundary(p5, p5.width, 0, p5.width, p5.height));
    walls.push(new Boundary(p5, p5.width, p5.height, 0, p5.height));
    walls.push(new Boundary(p5, 0, p5.height, 0, 0));

    for (let i = 0; i < 5; i++) {
      let x1 = p5.random(p5.width);
      let y1 = p5.random(p5.height);
      let x2 = p5.random(p5.width);
      let y2 = p5.random(p5.height);
      const wall = new Boundary(p5, x1, y1, x2, y2);
      walls.push(wall);
    }

    console.log(walls);
    particle = new Particle(
      p5,
      p5.createVector(100, 200),
      5,
      75,
      180,
      90,
      360,
      undefined
    );
  };

  const keyPressed = (p5: p5Types) => {
    particle.onKeyDown(p5);
  };

  const draw = (p5: p5Types) => {
    keyPressed(p5);
    p5.background(0);
    particle.updateRays(p5);
    //particle.updatePosition(p5.mouseX, p5.mouseY);
    walls.forEach((b) => {
      b.clearMaxPoints();
      b.fullyVisible = false;
    });
    particle.show(p5);
    particle.look(p5, walls, false);
    //particle.nearby(p5, walls);
    //particle.angle += p5.radians(1);
    for (let wall of walls) {
      wall.show(p5);
    }
  };

  return <Sketch className={className} setup={setup} draw={draw} />;
};

export default MainSketch;
