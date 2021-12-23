
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


export const farthestPoints = (vectors: p5Types.Vector[]) => {
    const n = vectors.length
    
    let max1:p5Types.Vector = vectors[0]
    let max2:p5Types.Vector = vectors[1]
    let max = 0
    for (let i = 0; i< n; i++) {
        for (let j = i+1; j<n; j++) {
            const p1 = vectors[i]
            const p2 = vectors[j]
            const dist = p5Types.Vector.dist(p1,p2)
            if (dist > max) {
                max = dist
                max1 = p1
                max2 = p2
            }
        }
    }
    return [max1,max2]
}