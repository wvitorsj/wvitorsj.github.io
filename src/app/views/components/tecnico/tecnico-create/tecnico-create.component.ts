import { Tecnico } from './../../../../models/tecnico';
import { TecnicoService } from './../../../../services/tecnico.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
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
    private service: TecnicoService) { }

  ngOnInit(): void {
  }

  cancel():void{
    this.router.navigate(['/tecnicos'])
  }

  create():void{
    this.service.create(this.tecnico).subscribe((resposta) =>{
      this.router.navigate(['/tecnicos'])
      this.service.message('Técnico Inserido com Sucesso!')
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
