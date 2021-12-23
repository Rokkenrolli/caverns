
import Boundary from './p5/Boundary';
import  p5Types  from 'p5';

export interface Pos {
    x:number
    y:number
}

export interface Hit {
    wall: Boundary | undefined
    distance: number
    closest: p5Types.Vector |undefined
}

export interface MaxPoints {
    p1: p5Types.Vector |undefined
    p2: p5Types.Vector | undefined
    distance: number
}

