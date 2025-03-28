import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import * as QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  @ViewChild('clienteForm') clienteForm!: NgForm;
  @ViewChild('resumenCompra') resumenCompra!: ElementRef;

  // Datos del cliente
  cliente = {
    nombre: '',
    apellidos: '',
    edad: null as number | null,
    sexo: ''
  };

  // Lista de servicios disponibles
  servicios = [
    { nombre: 'Mesas', precio: 100, cantidad: 0 },
    { nombre: 'Espacio para casa de campaña por noche', precio: 350, cantidad: 0 },
    { nombre: 'Renta de casa de campaña para 12 personas', precio: 220, cantidad: 0 },
    { nombre: 'Cabaña para 4 personas', precio: 2500, cantidad: 0 },
    { nombre: 'Sillas', precio: 50, cantidad: 0 },
    { nombre: 'Cabaña para 6 personas', precio: 3000, cantidad: 0 },
    { nombre: 'Sombrilla', precio: 50, cantidad: 0 },
    { nombre: 'Asadores', precio: 350, cantidad: 0 },
    { nombre: 'Regaderas', precio: 100, cantidad: 0 },
    { nombre: 'Entrada AQUA COLOR FEST', precio: 899, cantidad: 0 },
    { nombre: 'Entrada Adulto', precio: 180, cantidad: 0 },
    { nombre: 'Entrada Niño', precio: 120, cantidad: 0 }
  ];

  // Control de flujo
  primerFormularioCompletado = false;
  codigoReserva = '';
  mostrarResumen = false;

  // Valida el primer formulario
  validarPrimerFormulario(): boolean {
    return (
      !!this.cliente.nombre.trim() &&
      !!this.cliente.apellidos.trim() &&
      this.cliente.edad !== null &&
      !!this.cliente.sexo
    );
  }

  // Continuar al formulario de compra
  continuarACompra() {
    if (this.validarPrimerFormulario()) {
      this.primerFormularioCompletado = true;
    }
  }

  // Genera el resumen y el QR
  generarResumen() {
    this.codigoReserva = this.generarCodigoAleatorio();
    this.mostrarResumen = true;
    
    // Espera un ciclo de detección de cambios para asegurar que el elemento QR esté en el DOM
    setTimeout(() => {
      this.generarQR();
    }, 0);
  }

  // Genera un código aleatorio de 8 caracteres
  private generarCodigoAleatorio(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  // Genera el código QR
  generarQR() {
    const qrElement = document.getElementById('qr-code');
    if (qrElement) {
      QRCode.toCanvas(qrElement, this.codigoReserva, { 
        width: 150,
        margin: 2,
        color: {
          dark: '#40cdf0',  // Color principal del QR
          light: '#ffffff'  // Fondo blanco
        }
      });
    }
  }

  // Genera y descarga el PDF
  async generarPDF() {
    if (!this.resumenCompra?.nativeElement) {
      console.error('Elemento resumen-compra no encontrado');
      return;
    }
  
    try {
      console.log('Iniciando generación de PDF...');
      
      const options = {
        scale: 1,
        logging: true, // Temporalmente activado para debug
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0
      };
  
      console.log('Opciones:', options);
      
      const canvas = await html2canvas(this.resumenCompra.nativeElement, options);
      console.log('Canvas generado:', canvas);
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Reserva_${this.codigoReserva}.pdf`);
      
      console.log('PDF generado exitosamente');
    } catch (error) {
      console.error('Error completo:', error);
      alert('No se pudo generar el PDF. Consola para detalles.');
    }
  }

  // Calcula el total general de la compra
  get totalGeneral(): number {
    return this.servicios.reduce((total, servicio) => {
      return total + (servicio.precio * servicio.cantidad);
    }, 0);
  }
}