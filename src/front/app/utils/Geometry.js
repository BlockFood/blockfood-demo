import * as _ from 'lodash'
import Segment2 from 'segment2'
import Vec2 from 'vec2'

export const distance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2))
}

export const nearestPointOnLine = (p1, p2, p3) => {
    const segment = new Segment2(Vec2(p1[0], p1[1]), Vec2(p2[0], p2[1]))
    const _position = segment.closestPointTo(Vec2(p3[0], p3[1]))
    const position = [_position.x, _position.y]
    return {position, dist: distance(position, p3)}
}

export const getVector = (p1, p2) => {
    const dist = distance(p1, p2)
    const vector = []
    if(Math.abs(dist) < 1e-9) {
        vector[0] = 0
        vector[1] = 0
    } else {
        vector[0] = (p2[0] - p1[0]) / dist
        vector[1] = (p2[1] - p1[1]) / dist
    }
    return vector
}

export const splitPath = (points, speed = 1) => {
    const getVector = (p1, p2) => {
        const dist = distance(p1, p2)
        const vector = []
        if(Math.abs(dist) < 1e-9) {
            vector[0] = 0
            vector[1] = 0
        } else {
            vector[0] = (p2[0] - p1[0]) / dist
            vector[1] = (p2[1] - p1[1]) / dist
        }
        return vector
    }

    const result = []
    let rest = 0
    _.forEach(points, (point, index) => {
        if (index < points.length - 1) {
            const p1 = point, p2 = points[index + 1]
            const dist = distance(p1, p2)

            if (dist < rest) {
                rest -= dist
            }
            else {
                const vector = getVector(p1, p2)

                const fp = [p1[0] + (vector[0] * rest), p1[1] + (vector[1] * rest)]
                result.push(fp)

                const parts = Math.floor((dist - rest) / speed)
                rest = (dist - rest) - (parts * speed)

                _.times(parts, (i) => {
                    const np = [fp[0] + ((i + 1) * vector[0] * speed), fp[1] + ((i + 1) * vector[1] * speed)]
                    result.push(np)
                })
            }
        }
    })

    rest > 0 && result.push(_.last(points))

    return result
}