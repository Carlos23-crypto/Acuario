import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  showModal: boolean = false;
  currentIndex: number = 0;
  private intervalId: any;
  
  carouselImages = [
    'assets/ParqueFamiliar.jpg',
    'assets/Cabania4Per.jpg',
    'assets/OlayTobogan.jpg',
    'assets/Cabania6Per.jpg',
    'assets/ParqueInfantil.jpg'
  ];

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambia cada 3 segundos
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}