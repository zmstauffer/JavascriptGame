export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  randomize() {
    this.x = Math.random() * this.negatize();
    this.y = Math.random() * this.negatize();
  }

  normalize() {
    let deltaX = Math.pow(this.x, 2);
    let deltaY = Math.pow(this.y, 2);
    const vhat = Math.sqrt(deltaX + deltaY);
    this.x /= vhat;
    this.y /= vhat;
  }

  setMagnitude(magnitude) {
    this.normalize();
    this.x *= magnitude;
    this.y *= magnitude;
  }

  add(newVector) {
    if (newVector === undefined) return;
    this.x += newVector.x;
    this.y += newVector.y;
  }

  subtract(subtrahend) {
    this.x -= subtrahend.x;
    this.y -= subtrahend.y;
  }

  divide(divisor) {
    this.x /= divisor;
    this.y /= divisor;
  }

  negatize() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  zeroize() {
    this.x = 0;
    this.y = 0;
  }

  calcDistance(point) {
    let deltaX = Math.pow(point.x - this.x, 2);
    let deltaY = Math.pow(point.y - this.y, 2);
    return Math.sqrt(deltaX + deltaY);
  }

  limit(max) {
    let mag = this.magnitude();
    if (mag <= max) return;
    this.setMagnitude(max);
  }

  magnitude(){
    let tempX = Math.pow(this.x, 2);
    let tempY = Math.pow(this.y, 2);
    return Math.sqrt(tempX + tempY);
  }

  static addVectors(vec1, vec2){
    let tempVector = new Vector(0,0);
    tempVector.x = vec1.x + vec2.x;
    tempVector.y = vec1.y + vec2.y;
    return tempVector;
  }

  static subtractVectors(vec1, vec2){
    let tempVector = new Vector(0,0);
    tempVector.x = vec1.x - vec2.x;
    tempVector.y = vec1.y - vec2.y;
    return tempVector;
  }

  static calcHeading(vec){
    const centerVector = new Vector(800/2, 600/2);
    let tempVector = new Vector(vec.x,vec.y);
    centerVector.subtract(tempVector);
    return Math.atan2(centerVector.y, centerVector.x);
  }

  static dot(vec1, vec2){
    let temp = vec1.x * vec2.x + vec1.y * vec2.y;
    return temp;
  }

  static angleBetween(a, b){
    let p = new Vector(-b.y, b.x);
    let bCoord = Vector.dot(a,b);
    let pCoord = Vector.dot(a,p);
    return Math.atan2(pCoord, bCoord);
  }

}
