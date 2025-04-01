import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';

interface Glitter {
  x: number;
  y: number;
  size?: number;
  opacity?: number;
  lastInteractionTime: number;
  vx: number;
  vy: number;
}

@Component({
  selector: 'async-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas.component.html',
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasBlock!: ElementRef;
  @Input({ required: true }) wrapper: HTMLDivElement;
  private canvas?: HTMLCanvasElement | null;
  private ctx?: CanvasRenderingContext2D;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private glitterCount = 5000;
  private glitters: Array<Glitter> = [];
  private mouseStoppedTimeout?: ReturnType<typeof setTimeout>;
  private mouseStopDelay = 200;

  constructor(@Inject('IS_BROWSER') public isBrowser: boolean) {}

  @HostListener('mousemove', ['$event'])
  mousemove(e: MouseEvent) {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;

    for (const glitter of this.glitters) {
      const dx = glitter.x - this.mouseX;
      const dy = glitter.y - this.mouseY;
      const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
      if (distanceToMouse < 25) {
        glitter.lastInteractionTime = Date.now();
        glitter.opacity = 1;

        // Встановлюємо напрямок руху тільки один раз при взаємодії
        const angle = Math.atan2(dy, dx);
        glitter.vx = Math.cos(angle) * -3; // Початкова швидкість
        glitter.vy = Math.sin(angle) * -3;
      }
    }

    if (this.mouseStoppedTimeout) {
      clearTimeout(this.mouseStoppedTimeout);
    }

    this.mouseStoppedTimeout = setTimeout(() => {
      this.onMouseStop();
    }, this.mouseStopDelay);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.canvas = this.canvasBlock.nativeElement as HTMLCanvasElement;

      setTimeout(() => {
        this.initializeCanvas();
        this.initializeGlitters();
        this.animate();
      }, 0);
    }
  }

  private onMouseStop() {}

  private updateGlitterPositions() {
    const currentTime = Date.now();

    for (const glitter of this.glitters) {
      const condition = currentTime - glitter.lastInteractionTime < 2000;
      glitter.opacity = condition ? glitter.opacity : 0;

      if (condition) {
        glitter.x += glitter.vx;
        glitter.y += glitter.vy;

        // Уповільнення для поступового зупинення
        glitter.vx *= 0.9991;
        glitter.vy *= 0.9991;

        glitter.x = Math.max(0, Math.min(this.canvas?.width ?? 0, glitter.x));
        glitter.y = Math.max(0, Math.min(this.canvas?.height ?? 0, glitter.y));
      }
    }
  }

  private initializeGlitters() {
    if (this.canvas) {
      for (let i = 0; i < this.glitterCount; i++) {
        this.glitters.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: 1,
          opacity: Math.random(),
          lastInteractionTime: 0,
          vx: 0,
          vy: 0,
        });
      }
    }
  }

  private initializeCanvas() {
    this.ctx = this.canvas?.getContext('2d') as CanvasRenderingContext2D;

    if (this.canvas) {
      this.canvas.width = this.wrapper.clientWidth;
      this.canvas.height = this.wrapper.clientHeight;

      this.canvas.style.width = `${this.wrapper.clientWidth}px`;
      this.canvas.style.height = `${this.wrapper.clientHeight}px`;
    }
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    this.updateGlitterPositions();
    this.draw();
  }

  private flash() {
    return `rgba(247, 16, 240, ${Math.random()})`;
  }

  private draw() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (const glitter of this.glitters) {
        if (glitter.opacity) {
          this.ctx.fillStyle = this.flash();
          this.ctx.beginPath();
          this.ctx.arc(glitter.x, glitter.y, glitter.size ?? 0, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
    }
  }
}
