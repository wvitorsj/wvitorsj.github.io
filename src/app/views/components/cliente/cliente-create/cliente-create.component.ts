import { Cliente } from './../../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(10)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router:Router,
    private service: ClienteService) { }

  ngOnInit(): void {
  }

  cancel():void{
    this.router.navigate(['/clientes'])
  }

  create():void{
    this.service.create(this.cliente).subscribe((resposta) =>{
      this.router.navigate(['/clientes'])
      this.service.message('Cliente Inserido com Sucesso!')
    }, err =>{
      if(err.error.error.match('já cadastrado')){
        this.service.message(err.error.error)
      } else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
        this.service.message("CPF Inválido!")        
      } 
    })
  }

  errorValidName(){
    if(this.nome.invalid){
      return 'O Nome deve ter entre 10 e 60 caracteres!';
    }
    return false;
  }

  errorValidCpf(){
    if(this.cpf.invalid){
      return 'O CPF deve conter no mínimo 11 caracteres!';
    }
    return false;
  }

  errorValidTelefone(){
    if(this.telefone.invalid){
      return 'O Telefone deve conter no mínimo 11 caracteres!';
    }
    return false;
  }

}
