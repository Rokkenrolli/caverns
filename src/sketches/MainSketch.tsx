import Sketch from "react-p5";
import p5Types from "p5";
import Boundary from "../p5/Boundary";
import Particle from "../p5/Particle";
import { BoundaryProps } from "../utils";

export interface ComponentProps {
  width: number;
  height: number;
  wallProps: BoundaryProps[];
  setVictory: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const MainSketch: React.FC<ComponentProps> = ({
  width,
  height,
  className,
  wallProps,
}) => {
  let walls: Boundary[] = [];
  let particle: Particle;

  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);
    walls.push(new Boundary(p5, 0, 0, p5.width, 0));
    walls.push(new Boundary(p5, p5.width, 0, p5.width, p5.height));
    walls.push(new Boundary(p5, p5.width, p5.height, 0, p5.height));
    walls.push(new Boundary(p5, 0, p5.height, 0, 0));

    wallProps.forEach((w) =>
      walls.push(new Boundary(p5, w.x1, w.y1, w.x2, w.y2, w.solid))
    );

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
    particle.updatePosition(p5.mouseX, p5.mouseY);
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
