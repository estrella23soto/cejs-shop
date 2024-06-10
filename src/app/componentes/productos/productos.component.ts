import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../servicios/producto.service';
import { Producto } from '../../interfaces/producto';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoDialog: boolean = false;
  productoForm!: FormGroup;
  producto: Producto | null = null;
  selectedProducts: Producto[] = [];
  submitted: boolean = false;
productoDialogedit: any;
productoDialogEdit: any;
productoFormedit!: FormGroup;


  constructor(
    private productoService: ProductoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // this.productoForm = this.fb.group({
    //   id: [null],
    //   codigo: ['', Validators.required],
    //   nombre: ['', Validators.required],
    //   descripcion: ['', Validators.required],
    //   precio: ['', Validators.required],
    //   imagen: [''],
    //   categoria: ['', Validators.required],
    //   cantidad: ['', Validators.required],
    //   estadoInventario: [''],
    //   rating: [0]
    // });

    this.productoForm = this.fb.group({
      id: [null],
      codigo:['',''],
      nombre: ['', ''],
      descripcion: ['', ''],
      precio: [0,0],
      imagen: ['', ''],
      categoria: ['', ''],
      cantidad: [0, ''],
      estadoInventario: ['', ''],
      rating: [0, 0]
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();

    // this.productoForm = this.fb.group({
    //   codigo: [''],
    //   nombre: [''],
    //   descripcion: [''],
    //   precio: ['']
    // });
    // this.productoForm = this.fb.group({
    //   id: [null],
    //   codigo: ['', Validators.required],
    //   nombre: ['', Validators.required],
    //   descripcion: ['', Validators.required],
    //   precio: ['', Validators.required],
    //   imagen: [''],
    //   categoria: ['', Validators.required],
    //   cantidad: ['', Validators.required],
    //   estadoInventario: [''],
    //   rating: [0]
    // });
    // this.productoFormedit = this.fb.group({
    //   id: [null],
    //   codigo: ['', Validators.required],
    //   nombre: ['', Validators.required],
    //   descripcion: ['', Validators.required],
    //   precio: ['', Validators.required],
    //   imagen: [''],
    //   categoria: ['', Validators.required],
    //   cantidad: ['', Validators.required],
    //   estadoInventario: [''],
    //   rating: [0]
    // });
  }
  onSubmit() {
    console.log(this.productoForm.value);
    const productoData = this.productoForm.value as Producto;
    this.productoService.addProducto(productoData).subscribe(
      (response) => {
        console.log('Producto guardado exitosamente:', response);
        // Aquí puedes realizar otras acciones después de guardar el producto
      },
      (error) => {
        console.error('Error al guardar el producto:', error);
      }
    );
  }


  obtenerProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
      console.log(data)
    });
  }

  openNew() {
    this.producto = null;
    this.productoForm.reset();
    this.productoDialog = true;
  }

  hideDialog() {
    this.productoDialog = false;
    this.submitted = false;
  }



  editProducto(producto: Producto) {
    this.producto = { ...producto };
    this.productoFormedit.patchValue(producto);
    this.productoDialogEdit = true; // Abrir el diálogo de edición
  }

  updateProducto() { // Método para actualizar el producto
    this.submitted = true;
    if (this.productoFormedit.invalid) {
      return;
    }
    console.log("Hola mundo ",this.productoFormedit.value)
    if (this.producto) {
      this.productoService.updateProducto(this.productoFormedit.value).subscribe(() => {
        this.obtenerProductos();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Actualizado', life: 3000 });
        this.productoDialogEdit = false;
        this.producto = null;
      });
    }
  }
  deleteProducto(producto: Producto) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar ' + producto.nombre + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoService.deleteProducto(producto.id).subscribe(() => {
          this.obtenerProductos();
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto Eliminado', life: 3000 });
        });
      }
    });
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar los productos seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedProducts.forEach(producto => {
          this.productoService.deleteProducto(producto.id).subscribe(() => {
            this.obtenerProductos();
          });
        });
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Productos Eliminados', life: 3000 });
        this.selectedProducts = [];
      }
    });
  }
  hideDialogEdit() { // Método para cerrar el diálogo de edición
    this.productoDialogEdit = false;
    this.submitted = false;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  saveProduct() {
    console.log("entrando al metodo")
    console.log(this.productoForm.value)
    if (this.productoForm.valid) {
      const newProduct = this.productoForm.value;
      // Lógica para guardar el producto (puedes hacer una llamada al servicio aquí)
      console.log('Producto guardado', newProduct);
      this.productoService.addProducto(newProduct).subscribe(
        (response) => {
          console.log('Producto guardado exitosamente:', response);
          // Aquí puedes realizar otras acciones después de guardar el producto
        },
        (error) => {
          console.error('Error al guardar el producto:', error);
        }
      );
      this.hideDialog();
      this.obtenerProductos(); // Actualiza la lista de productos después de guardar
    }
  }

}


