class Sprite {
  constructor({ position, imageSrc, scale = 1, framesMax = 1 }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
  }

  draw() {
    c.drawImage(
      this.image,
      // The location of image which you want to crop
      this.framesCurrent * (this.image.width / this.framesMax),
      0,
      this.image.width / this.framesMax,
      this.image.height,
      // The image is drawed in the destination canvas
      this.position.x,
      this.position.y,
      (this.image.width / this.framesMax) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.framesElapsed++;

    // For speed of image
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    offset,
    imageSrc,
    scale = 1,
    framesMax = 1,
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
    });

    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
  }

  draw() {
    // For player
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // For attack box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
