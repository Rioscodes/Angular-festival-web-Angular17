import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { productos } from '../../common/productos';
import { DataProductosPaginaService } from '../../data/data-productos-pagina.service';
import { ProductosPagina } from '../../common/productosPagina';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { TituProductosComponent } from '../titu-productos/titu-productos.component';

@Component({
    selector: 'app-productos-automaticos',
    standalone: true,
    imports: [
        CommonModule,RouterLink,RouterLinkActive,TituProductosComponent
    ],
    template: `
    <section class="d-flex justify-content-center align-items-center px-5 row"  style="background-color:#F4F6F7">
    <app-titu-productos/>
      <div class="col-sm-12 col-md-4" *ngFor="let p of productos">
        <div class="" style="height:430px; width:auto; overflow: hidden;">
          <img [src]="p.imagen" class="card-img-top" alt="...">
        </div>
        <div class="text text-center " style="padding-bottom: 50px; padding-top:20px;">
          <h4 class="card-title">{{p.Titulo}}</h4>
          <p class="card-title" style="text-align: justify;">{{p.descripcion}}</p>
          <p class="card-title"><strong> {{p.precio}}€ </strong></p>
          <a href="#" class="btn btn-primary" routerLink="/talla" routerLinkActive="active">{{p.botonTxt}}</a>
        </div>
      </div>
    </section>

    `,
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosAutomaticosComponent implements OnInit {

  //variables generales
  productos: ProductosPagina[] = [];

  constructor(private _dataservice:DataProductosPaginaService,private cdRef:ChangeDetectorRef){}

  ngOnInit(){
      this.traerproductos();

  }

  traerproductos(){

    this._dataservice.getProductosPagina().subscribe((res:any)=>
      {
        if (res) {
          this.productos = res.productos;
          this.cdRef.detectChanges();
        } else {

        }
      }
    );

  }


}
