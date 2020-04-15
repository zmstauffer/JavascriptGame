import Vector from "./vector.js";

export default class Boid {
  constructor(xVal = 0, yVal = 0) {
    this.position = new Vector(xVal, yVal);
    this.velocity = new Vector(0,0);
    this.velocity.randomize(6);
    this.acceleration = new Vector(0,0);
    this.maxSpeed = 5;
    this.maxForce = .1;
    this.velocity.setMagnitude(this.maxSpeed);
    this.logged = false;
  }

  draw(ctx) {
    const boidSize = 10;
    const HALF_PI = Math.PI/2;
    const QUARTER_PI = Math.PI/4;

    let xAxis = new Vector(400,300);
    let angle = Vector.angleBetween(this.velocity, xAxis);

    const point1 = new Vector(this.position.x + Math.cos(angle - HALF_PI - QUARTER_PI) * boidSize, this.position.y + Math.sin(angle - HALF_PI - QUARTER_PI) * boidSize);
    const point2 = new Vector(this.position.x + Math.cos(angle) * 2 * boidSize, this.position.y + Math.sin(angle) * 2 * boidSize);
    const point3 = new Vector(this.position.x + Math.cos(angle + HALF_PI + QUARTER_PI) * boidSize, this.position.y+ Math.sin(angle + HALF_PI + QUARTER_PI) * boidSize);

    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.fillStyle = "blue";
    ctx.fill();

  }

  wrapAround(width, height) {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.zeroize();
    this.wrapAround(800,600);
  }

  align(boids) {
    let perceptionRadius = 30;
    let alignVector = new Vector(0,0);
    let total = 0;

    for (let other of boids) {
      let d = this.position.calcDistance(other.position);
      
      if (other !== this && d < perceptionRadius) {
        alignVector.add(other.velocity);
        total++;
      }
    }

    if (total > 0) {
      alignVector.divide(total);
      alignVector.setMagnitude(this.maxSpeed);
      alignVector.subtract(this.velocity);
      alignVector.limit(this.maxForce);
    }
    return alignVector;
  }

  cohesion(boids) {
    let perceptionRadius = 30;
    let cohesionVector = new Vector(0,0);
    let total = 0;

    for (let other of boids) {
      let d = this.position.calcDistance(other.position);
      
      if (other !== this && d < perceptionRadius) {
        cohesionVector.add(other.position);
        total++;
      }
    }

    if (total > 0) {
      cohesionVector.divide(total);
      cohesionVector.subtract(this.position);
      cohesionVector.setMagnitude(this.maxSpeed);
      cohesionVector.subtract(this.velocity);
      cohesionVector.limit(this.maxForce);
    }
    return cohesionVector;
  }

  separation(boids) {
    let perceptionRadius = 20;
    let separationVector = new Vector(0,0);
    let total = 0;

    for (let other of boids) {
      let d = this.position.calcDistance(other.position);
      
      if (other !== this && d < perceptionRadius) {
        let difference = new Vector(0,0);
        difference = Vector.subtractVectors(this.position, other.position);
        separationVector.add(difference);
        total++;
      }
    }

    if (total > 0) {
      separationVector.divide(total);
      separationVector.setMagnitude(this.maxSpeed);
      separationVector.subtract(this.velocity);
      separationVector.limit(.15);
    }
    return separationVector;
  }

  steer(boids) {
    let alignVector = new Vector(0,0);
    let cohesionVector = new Vector(0,0);
    let separationVector = new Vector(0,0);
    
    alignVector = this.align(boids);
    cohesionVector = this.cohesion(boids);
    separationVector = this.separation(boids);

    this.acceleration.add(alignVector);
    this.acceleration.add(cohesionVector);
    this.acceleration.add(separationVector);
  }
}
