import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'sb-typewriter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './typewriter.component.html',
  styleUrl: './typewriter.component.scss',
})
export class TypewriterComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  words = [' Better', 'Cheaper', 'Faster'];
  typingSpeed = 200; 
  deletingSpeed = 100;
  pauseTime = 1000; 

  ngAfterViewInit(): void {
    this.startTypingLoop();
  }

  private async startTypingLoop() {
    while (true) {  
      for (const word of this.words) {
        await this.addDynamicText(word);
        await this.delay(this.pauseTime);
        await this.removeDynamicText();
        await this.delay(500); // Small pause before next word
      }
    }
  }

  private async addDynamicText(text: string) {
    let input = this.input.nativeElement;
    input.textContent = ''; // Clear text

    for (let i = 0; i < text.length; i++) {
      input.textContent = text.substring(0, i + 1);
      await this.delay(this.typingSpeed);
    }
  }

  private async removeDynamicText() {
    let input = this.input.nativeElement;
    
    while (input.textContent && input.textContent.length > 0) {
      input.textContent = input.textContent.slice(0, -1);
      await this.delay(this.deletingSpeed);
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

