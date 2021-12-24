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
  let cameraPos: p5Types.Vector;
  let worldSize: p5Types.Vector;

  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(width, height).parent(canvasParentRef);

    worldSize = p5.createVector(2000, 2000);
    cameraPos = p5.createVector(1000, 1000);
    for (let i = 0; i < 10; i++) {
      let x1 = p5.random(worldSize.x);
      let y1 = p5.random(worldSize.y);
      let x2 = p5.random(worldSize.x);
      let y2 = p5.random(worldSize.y);
      const wall = new Boundary(p5, x1, y1, x2, y2, true);
      walls.push(wall);
    }

    console.log(walls);
    particle = new Particle(
      p5,
      p5.createVector(1100, 1200),
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
  const moveCamera = (p5: p5Types, particlePos: p5Types.Vector) => {
    const maxDistFromCenter = 30;
    let distFromCenter = particlePos.copy();
    let halfScreen = p5.createVector(p5.width, p5.height);
    halfScreen.div(2);
    distFromCenter.sub(halfScreen);
    distFromCenter.sub(cameraPos);
    if (distFromCenter.x < -maxDistFromCenter){
      cameraPos.set(particlePos.x - halfScreen.x + maxDistFromCenter); 
    }
    if (distFromCenter.x > maxDistFromCenter){
      cameraPos.set(particlePos.x - halfScreen.x - maxDistFromCenter, cameraPos.y); 
    }
    if (distFromCenter.y < -maxDistFromCenter){
      cameraPos.set(cameraPos.x, particlePos.y - halfScreen.y + maxDistFromCenter); 
    }
    if (distFromCenter.y > maxDistFromCenter){
      cameraPos.set(cameraPos.x, particlePos.y - halfScreen.y - maxDistFromCenter); 
    }
  }

  const draw = (p5: p5Types) => {
    keyPressed(p5);
    p5.background(0);
    particle.updateRays(p5);
    walls.forEach((b) => {
      b.clearMaxPoints();
      b.fullyVisible = false;
    });
    moveCamera(p5, particle.pos);
    particle.show(p5, cameraPos);
    particle.look(p5, walls, cameraPos);
    //particle.nearby(p5, walls);
    //particle.angle += p5.radians(1);
    for (let wall of walls) {
      wall.show(p5, cameraPos);
    }
  };

  return <Sketch className={className} setup={setup} draw={draw} />;
};

export default MainSketch;
