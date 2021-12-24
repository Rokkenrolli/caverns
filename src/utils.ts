
import Boundary from './p5/Boundary';
import  p5Types  from 'p5';


export const MAPPATH = "map.txt"

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

export interface Map {
    canvasWidth:number
    canvasHeight:number
    areaHeight: number
    areaWidth:number
    boundaries: BoundaryProps[]
}

export interface BoundaryProps {
    x1:number
    y1:number
    x2:number
    y2:number
    solid:boolean
}


export type HeaderSymbols = "cw" | "ch" | "aw" | "ah" 
export type RowSymbols = "xf" |"xs" | "yf" |"ys" |"sb"

export const parseMapFile = (text:string):Map=> {
    const split = text.split("\n")
    const boundaries:BoundaryProps[] = []
    const map = parseHeader(split[0])
    const end = split.findIndex(p => p.trim().includes("end"))
    console.log(split)
    console.log("found end at "+ end)
    split.slice(1,end).forEach(row => {
        const boundary = parseRow(row)
        boundaries.push(boundary)
    })
    map.boundaries = boundaries
    return map
}

const parseRow = (row:String):BoundaryProps => {
    const b:BoundaryProps = {x1:0,x2:0,y1:0,y2:0,solid:false}
    const elements = row.split(" ")
    elements.forEach(e => {
        const eType = e.slice(0,2) as RowSymbols
        const body = e.slice(2)
        switch(eType) {
            case "sb":
                b.solid = Boolean(body)
            break;
            case "xf":
                b.x1 = Number(body)
            break;
            case "xs":
                b.x2 = Number(body)
            break;
            case "yf":
                b.y1 = Number(body)
            break;
            case "ys":
                b.y2 = Number(body)
            break;
            default:
                return
        }
    })
    console.log(b)
    return b
}

const parseHeader = (header:string):Map => {
    const map:Map = {areaWidth:0, areaHeight:0, canvasHeight:0, canvasWidth:0, boundaries:[]}
    console.log(header)
    const rows = header.split(" ")
    rows.forEach(p => {
        const elementType = p.slice(0,2) as HeaderSymbols
        const body = p.slice(2)
        switch (elementType) {
            case "ch":
                map.canvasHeight = Number(body)
            break;
            case "cw":
                map.canvasWidth = Number(body)
            break;
            case "aw":
                map.areaWidth = Number(body)
            break;
            case "ah":
                map.areaHeight = Number(body)
            break;

        }
    })
    return map
}