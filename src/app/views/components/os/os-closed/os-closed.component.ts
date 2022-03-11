import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit {

  osLista: OS[] = [];

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.osLista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService){}

  ngAfterViewInit() {    
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe((resposta) =>{
      resposta.forEach(o => {
        if(o.status == "ENCERRADA"){
          this.osLista.push(o);
        }
      })
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OS>(this.osLista);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  listarTecnico():void {
    this.osLista.forEach(t => {
      this.tecnicoService.findById(t.tecnico).subscribe((resposta) => {
        t.tecnico = resposta.nome;
      })
    })
  }

  listarCliente():void {
    this.osLista.forEach(c => {
      this.clienteService.findById(c.cliente).subscribe((resposta) => {
        c.cliente = resposta.nome;
      })
    })
  }

  prioridade(p : any){
    if(p == 'BAIXA'){
      return 'baixa'
    } else if(p == 'MEDIA'){
      return 'media'
    } else{
      return 'alta'
    }
  }
}
