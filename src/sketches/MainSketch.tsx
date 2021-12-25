import Sketch from "react-p5";
import p5Types from "p5";
import Boundary from "../p5/Boundary";
import Particle from "../p5/Particle";
import { BoundaryProps } from "../utils";

export interface ComponentProps {
  canvasWidth: number;
  canvasHeight: number;
  wallProps: BoundaryProps[];
  areaWidth: number;
  areaHeight: number;
  setVictory: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const MainSketch: React.FC<ComponentProps> = ({
  canvasWidth,
  canvasHeight,
  className,
  areaHeight,
  areaWidth,
  wallProps,
  setVictory,
}) => {
  let walls: Boundary[] = [];
  let particle: Particle;
  let cameraPos: p5Types.Vector;
  let worldSize: p5Types.Vector;

  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    worldSize = p5.createVector(areaWidth, areaHeight);
    cameraPos = p5.createVector(areaWidth / 2, areaHeight / 2);
    wallProps.forEach((wall) => {
      walls.push(
        new Boundary(p5, wall.x1, wall.y1, wall.x2, wall.y2, wall.solid)
      );
    });
    cameraPos = p5.createVector(
      (areaWidth - canvasWidth) / 2,
      (areaHeight - canvasWidth) / 2
    );
    walls.push(new Boundary(p5, 0, 0, worldSize.x, 0, true));
    walls.push(new Boundary(p5, 0, 0, 0, worldSize.y, true));
    walls.push(
      new Boundary(p5, worldSize.x, worldSize.y, worldSize.x, 0, true)
    );
    walls.push(
      new Boundary(p5, worldSize.x, worldSize.y, 0, worldSize.y, true)
    );

    console.log(walls);
    particle = new Particle(
      p5,
      p5.createVector(areaWidth / 2, areaHeight / 2),
      5,
      75,
      180,
      90,
      90,
      undefined
    );
  };

  const keyPressed = (p5: p5Types) => {
    particle.onKeyDown(p5);
  };
  const moveCamera = (p5: p5Types, particlePos: p5Types.Vector) => {
    const maxDistFromCenter = 100;
    let distFromCenter = particlePos.copy();
    let halfScreen = p5.createVector(p5.width, p5.height);
    halfScreen.div(2);
    distFromCenter.sub(halfScreen);
    distFromCenter.sub(cameraPos);
    if (distFromCenter.x < -maxDistFromCenter) {
      cameraPos.set(
        particlePos.x - halfScreen.x + maxDistFromCenter,
        cameraPos.y
      );
    }
    if (distFromCenter.x > maxDistFromCenter) {
      cameraPos.set(
        particlePos.x - halfScreen.x - maxDistFromCenter,
        cameraPos.y
      );
    }
    if (distFromCenter.y < -maxDistFromCenter) {
      cameraPos.set(
        cameraPos.x,
        particlePos.y - halfScreen.y + maxDistFromCenter
      );
    }
    if (distFromCenter.y > maxDistFromCenter) {
      cameraPos.set(
        cameraPos.x,
        particlePos.y - halfScreen.y - maxDistFromCenter
      );
    }
  };

  const checkVictory = () => {
    return particle.pos.x > 1900 && particle.pos.y < 100;
  };
  const drawBall = (p5: p5Types, color: number, x: number, y: number) => {
    p5.noStroke();
    p5.fill(255, 150, 170);
    p5.ellipse(x, y, 15);
  };

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

    const victory = checkVictory();
    drawBall(p5, 255, 1940 - cameraPos.x, 80 - cameraPos.y);
    console.log(particle.pos.x, particle.pos.y);
    if (victory) {
      setVictory(true);
    }
  };

  return <Sketch className={className} setup={setup} draw={draw} />;
};

export default MainSketch;
