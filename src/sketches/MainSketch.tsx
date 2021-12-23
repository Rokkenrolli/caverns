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

    particle = new Particle(p5, p5.createVector(100, 200), 5, 150, undefined);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    particle.update(p5.mouseX, p5.mouseY);
    particle.show(p5);
    particle.look(p5, walls);

    for (let wall of walls) {
      wall.show(p5);
    }
  };

  return <Sketch className={className} setup={setup} draw={draw} />;
};

export default MainSketch;
