import { DefaultResponseMsg } from './../../types/DefaultResponseMsg';
import { UserModel } from './../../models/UserModel';
import { connectDB } from './../../middlewares/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';
import { NextRequest, NextResponse } from 'next/server';
import md5 from 'md5';


type CadastroRequest = {
    name: string,
    email: string,
    password: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
    try{
        if(req.method !== 'POST') {
            return res.status(405).json({error: 'Método solicitado não existe!'});
        }

        const {body} = req;
        const dados = body as CadastroRequest;

        if(!dados.name || !dados.email || !dados.password){
            return res.status(400).json({error: 'Favor preencher os campos!'});
        }

        if(!dados.name || dados.name.length < 2){
            return res.status(400).json({error: 'Nome inválido.'});
        }

        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
        if(!emailRegex.test(dados.email)){
            return res.status(400).json({error: 'Email inválido.'});
        }

        const senhaRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
        if(!senhaRegex.test(dados.password)){
            return res.status(400).json({error: 'Senha inválida.'});
        }

        const existsUsers = await UserModel.find({email: dados.email});
        if(existsUsers && existsUsers.length > 0){
            return res.status(400).json({error: 'Já exite conta com esse email'});
        }

        dados.password = md5(dados.password);
        await UserModel.create(dados);

        return res.status(200).json({msg: 'Cadastro concluído com sucesso!'});
    }catch(e: any){
        console.log('Erro ao efetuar cadastro: ', e);
        return res.status(500).json({error: 'Ocorreu erro ao cadastrar, tente novamente!'});
    }
}

export default connectDB(handler);
