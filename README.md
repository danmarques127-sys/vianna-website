# Vianna Commercial Services — Website

Código-fonte do website institucional da Vianna Commercial Services.

**Domínio configurado no código:** https://vianaservices.com/

## Estrutura
- `index.html`, `about.html`, `services.html`, `contact.html`: páginas principais.
- `privacy-policy.html`, `terms.html`, `404.html`: páginas auxiliares.
- `assets/css/`, `assets/js/`, `assets/photos/`: estilos, scripts e imagens.
- `services/`, `about/`, `backend-blog/`: páginas/módulos ainda não implementados na cópia recebida.

## Desenvolvimento local
Abra `index.html` no navegador ou use um servidor estático local (`python -m http.server 8000`).

## Pendências encontradas
- Configurar a integração real do formulário: ainda existe `YOUR_FORM_ID` no HTML.
- Verificar as referências a favicons ausentes do ZIP.
- Implementar ou remover links para páginas de conteúdo vazio conforme a estratégia de publicação.
- O arquivo `blog.php` e os scripts PHP em `backend-blog/` estão vazios: não há backend funcional incluído.
- Confirmar hosting/deploy antes de integrar o repositório ao website em produção.

**Importante:** adicionar senhas, tokens ou credenciais somente em armazenamento seguro de segredos, nunca no repositório.
