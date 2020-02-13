var express = require("express");
var servidor = express();
servidor.set("view engine", "ejs");
/*  ---------------Conexão estilo--------------- */
servidor.use('/', express.static('estilos/'));
servidor.use('/', express.static('estilos/Design/'));
/*  ---------------------------------------------- */

/*                 ---------------Conexões---------------                               */

/*                 ---------------Pagina principal---------------                               */
function pagPrincipal(req, resp) {
    resp.render('home');
};
servidor.get("/", pagPrincipal);

/*                 ---------------Curriculo---------------                               */
function curriculopag(req, resp) {
    resp.render('curriculo');
}

servidor.get('/curriculo', curriculopag);

/*                 ---------------Contato---------------                               */
function contatopag(req, resp) {
    resp.render('contato');
}

servidor.get('/contato', contatopag);

/*   Conexão Exibir mensagem     */

messages = {
    nome: [], email: [], tel: [], message: []
}
usuroot = {login: 'root', senha: 'zada'}

function envia(req, resp) {
    var nomeu = req.query.txt_nome;
    var emailu = req.query.txt_email;
    var telu = req.query.txt_telefone;
    var msg = req.query.txt_mensagem;
    messages.nome.push(nomeu);
    messages.email.push(emailu);
    messages.tel.push(telu);
    messages.message.push(msg);
    console.log(messages.nome[0], messages.email[0], messages.tel[0], messages.message[0]);
    resp.render('Enviado')
}

servidor.get("/sendmessage", envia);

function login(req, resp) {
    var logu = req.query.loginu;
    var senu = req.query.pas;

    if (logu == usuroot.login && senu == usuroot.senha) {
        resp.render('admin')
    } else if (logu != usuroot.login || senu != usuroot.senha) {

        resp.render('LoginErro');
    }
}
    servidor.get("/trylog", login);

    function listm(req, resp) {
        resp.render("admin", {messages: messages})
    }

    servidor.get("/admin", listm);


    servidor.listen(8000);

