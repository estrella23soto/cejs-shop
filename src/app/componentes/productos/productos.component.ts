import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../interfaces/producto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  productos: Producto[] = [];
  displayAddProductDialog: boolean = false;
  displayEditProductDialog: boolean = false;
  newProductForm: FormGroup;
  editProductForm: FormGroup;
  selectedProduct: Producto = {} as Producto;

  estadosInventario: any[] = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];
  

  constructor(
    private productosService: ProductoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.newProductForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      estadoInventrario: ['', Validators.required],
      rating: [0]
    });

    this.editProductForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      estadoInventrario: ['', Validators.required],
      rating: [0]
    });
  }

  ngOnInit() {
    this.loadProductos();
  }

  getSeverity(status: string): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' | undefined {
    switch(status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  loadProductos(): void {
    this.productosService.getProductos().subscribe(
      (data: Producto[]) => this.productos = data,
      (error) => console.error(error)
    );
  }

  showAddProductDialog(): void {
    this.newProductForm.reset(); // Reiniciar el formulario
    this.displayAddProductDialog = true;
  }

  addProduct(): void {
    if (this.newProductForm.valid) {
      const newProduct: Producto = this.newProductForm.value;
      this.productosService.addProducto(newProduct).subscribe(
        (producto: Producto) => {
          this.productos.push(producto);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto agregado exitosamente'
          });
          this.displayAddProductDialog = false;
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar el producto'
          });
        }
      );
    }
  }

  showEditProductDialog(producto: Producto): void {
    // Clonamos el producto seleccionado para evitar modificarlo directamente
    this.selectedProduct = { ...producto };
    
    // Llenamos el formulario de edición con los datos del producto seleccionado
    this.editProductForm.patchValue({
      codigo: this.selectedProduct.codigo,
      nombre: this.selectedProduct.nombre,
      descripcion: this.selectedProduct.descripcion,
      precio: this.selectedProduct.precio,
      imagen: this.selectedProduct.imagen,
      categoria: this.selectedProduct.categoria,
      cantidad: this.selectedProduct.cantidad,
      estadoInventrario: this.selectedProduct.estadoInventrario,
      rating: this.selectedProduct.rating
    });
  
    // Mostramos el modal de edición
    this.displayEditProductDialog = true;
  }

  updateProduct(): void {
    if (this.editProductForm.valid) {
      // Obtenemos los datos del formulario de edición
      const updatedProduct: Producto = this.editProductForm.value;
  
      // Actualizamos el producto en la base de datos mediante el servicio
      this.productosService.updateProducto(this.selectedProduct.id, updatedProduct).subscribe(
        (producto: Producto) => {
          // Reemplazamos el producto antiguo con el producto actualizado en la lista de productos
          const index = this.productos.findIndex(p => p.id === this.selectedProduct.id);
          if (index !== -1) {
            this.productos[index] = producto;
          }
  
          // Mostramos un mensaje de éxito
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto actualizado exitosamente'
          });
  
          // Ocultamos el modal de edición
          this.displayEditProductDialog = false;
        },
        error => {
          // Mostramos un mensaje de error si la actualización falla
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el producto'
          });
        }
      );
    }
  }

  confirmDeleteProducto(event: Event, id: number): void {
    if (event.target) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Está seguro de que desea eliminar este producto?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          this.deleteProduct(id);
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelado',
            detail: 'Eliminación cancelada'
          });
        }
      });
    }
  }

  deleteProduct(id: number): void {
    this.productosService.deleteProducto(id).subscribe(
      () => {
        this.productos = this.productos.filter(p => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'El producto se ha eliminado correctamente'
        });
      },
      error => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se ha podido eliminar el producto'
        });
      }
    );
  }
}
