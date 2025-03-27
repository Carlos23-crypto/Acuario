import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface Service {
  nombre: string;
  imagen: string;
  precio: string;
  descripcion?: string;
  capacidad?: string;
}

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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const header = document.querySelector('.transparent-header');
    if (header) { // Verificación de null
      if (window.scrollY > 50) {
        header.classList.add('header-scroll');
      } else {
        header.classList.remove('header-scroll');
      }
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
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
  //Inicio de Listas
  colors = ['#40cdf0', '#32CD32', '#FF1493', '#FF8C00', '#FFD700', '#800080'];
  selectedService: Service | null = null;

  datos: Service[] = [
    {
      nombre: 'Espacio para casa de campaña por noche',
      imagen: 'assets/CasasAcampar.jpg',
      precio: '$350',
      descripcion: 'Espacio designado para instalar tu propia casa de campaña',
      capacidad: '4x4 metros'
    },
    {
      nombre: 'Renta de casa de campaña para 4 personas',
      imagen: 'assets/Cabania4Per.jpg',
      precio: '$150',
      descripcion: 'Casa de campaña equipada para 4 personas'
    },
    {
      nombre: 'Renta de casa de campaña para 8 personas',
      imagen: 'assets/Cabania6Per.jpg',
      precio: '$180',
      descripcion: 'Casa de campaña equipada para 8 personas'
    },
    {
      nombre: 'Renta de casa de campaña para 12 personas',
      imagen: 'assets/CasasAcampar.jpg',
      precio: '$220',
      descripcion: 'Casa de campaña equipada para 12 personas'
    },
    {
      nombre: 'Cabaña para 4 personas',
      imagen: 'assets/Cabania4Per.jpg',
      precio: '$2500',
      descripcion: 'Cabaña completamente equipada con capacidad para 4 personas'
    },
    {
      nombre: 'Cabaña para 6 personas',
      imagen: 'assets/Cabania6Per.jpg',
      precio: '$3000',
      descripcion: 'Cabaña completamente equipada con capacidad para 6 personas'
    },
    {
      nombre: 'Silla',
      imagen: 'assets/Asadores.jpg',
      precio: '$30',
      descripcion: 'Renta de silla individual'
    },
    {
      nombre: 'Mesa',
      imagen: 'assets/Asadores.jpg',
      precio: '$50',
      descripcion: 'Renta de mesa para 6 personas'
    },
    {
      nombre: 'Sombrilla',
      imagen: 'assets/Asadores.jpg',
      precio: '$50',
      descripcion: 'Renta de sombrilla grande'
    },
    {
      nombre: 'Entrada Adulto',
      imagen: 'assets/ParqueFamiliar.jpg',
      precio: '$180',
      descripcion: 'Entrada al parque para adultos'
    },
    {
      nombre: 'Entrada Niño',
      imagen: 'assets/ParqueInfantil.jpg',
      precio: '$120',
      descripcion: 'Entrada al parque para niños (3-12 años)'
    },
    {
      nombre: 'Entrada AQUA COLOR FEST',
      imagen: 'assets/LogoAQUA.jpg',
      precio: '$899',
      descripcion: 'Acceso al festival de Musica Electronica (18 años en adelante)'
    }
  ];
  //Fin
  
  constructor(private router: Router) {}

  openServiceModal(service: Service) {
    this.selectedService = service;
  }

  closeServiceModal() {
    this.selectedService = null;
  }
}