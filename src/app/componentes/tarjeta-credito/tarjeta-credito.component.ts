import { TarjetaService } from './../../services/tarjeta.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listaTarjetas: any[] = [];
  accion = 'Agregar'
  form: FormGroup;
  id: number |undefined

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tarjetaService: TarjetaService
    ) {
    this.form = fb.group({
      titular:['', Validators.required],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this.tarjetaService.getTarjetas().subscribe(data =>{
      console.log(data);
      this.listaTarjetas= data;

    },error =>{
      console.log(error);

    })
  }



  guardarTarjeta(){

    const tarjeta:any ={
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    if (this.id == undefined) {
      //agregamos un nueva tarjeta
      this.tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('La tarjeta fue registrada con éxito!', 'Tarjeta Registrada!');
        this.obtenerTarjetas();
        this.form.reset();
      },error =>{
        this.toastr.error('Opss!,...Error ocurrio', 'Error!');
        console.log(error);
      })

    }else{
      //Editamos una tarjeta
      tarjeta.id = this.id;
      this.tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion='agregar';
        this.id == undefined;
        this.toastr.info('La tarjeta fue actualizada con éxito!', 'Tarjeta actualizada!');
        this.obtenerTarjetas();

      },error =>{
        console.log(error);

      })

    }


  }

  eliminarTarjeta(id: number){
    this.tarjetaService.deleteTarjeta(id).subscribe(data =>{
      this.toastr.error('La tarjeta fue eliminada con éxito!', 'Tarjeta eliminada!');
      this.obtenerTarjetas();
    },error=> {
        console.log(error);

    })
  }

  editarTarjerta(tarjeta: any){
    this.accion = 'editar';
    this.id= tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta : tarjeta.numeroTarjeta,
      fechaExpiracion : tarjeta.fechaExpiracion,
      cvv : tarjeta.cvv,
    })

  }
}
