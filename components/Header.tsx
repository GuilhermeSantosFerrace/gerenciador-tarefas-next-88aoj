/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type {NextPage} from 'next';
import { useState } from 'react';
import { executeRequest } from '../services/api';

type HeaderProps = {
    sair(): void
}

export const Header : NextPage<HeaderProps> = ({sair}) =>{

    const fullName = localStorage.getItem('userName');
    const firstName = fullName?.split(' ')[0] || '';
    
    return(
        <div className='container-header'>
            <img src='/logo.svg' alt='Logo Fiap'className='logo'/>
            <button><span>+</span> Adicionar tarefa</button>
            <div className='mobile'>
                <span>Olá, {firstName}</span>
                <img src='/exit-mobile.svg' alt='Sair' onClick={sair}/>
            </div>
            <div className='desktop'>
                <span>Olá, {firstName}</span>
                <img src='/exit-desktop.svg' alt='Sair' onClick={sair}/>
            </div>
        </div>
    );
}