# 🏥 Sistema de Gerenciamento de Clínica Médica
Frontend desenvolvido para simular o gerenciamento de uma clínica médica, permitindo o CRUD completo de médicos, pacientes e consultas.

✨ Funcionalidades
👨‍⚕️ Gestão de Médicos
Cadastrar novos médicos

Listar todos os médicos

Atualizar informações de médicos

Remover médicos do sistema

👥 Gestão de Pacientes
Cadastrar novos pacientes

Listar todos os pacientes

Atualizar informações de pacientes

Remover pacientes do sistema

📅 Gestão de Consultas
Cadastrar novas consultas

Remover consultas agendadas

🔍 Funcionalidades Especiais
Filtrar por Especialidade: Visualizar todos os médicos de uma especialidade específica

Consultas por Médico: Visualizar todas as consultas de um médico selecionado

Consultas por Paciente: Visualizar todas as consultas de um paciente selecionado

🛠️ Tecnologias Utilizadas
Frontend: [Especificar framework - Angular/React/Vue/etc]

Backend: API REST disponível em https://ifsp.ddns.net/webservices/clinicaMedica/

HTTP Client: Axios/Fetch para consumo da API

🌐 API Backend
A aplicação consome dados do serviço backend disponível em:

text
https://ifsp.ddns.net/webservices/clinicaMedica/
⚠️ Importante
O frontend foi desenvolvido para ser flexível e sempre utilizar os dados provenientes do backend, nunca assumindo que valores como IDs serão sempre válidos ou existirão.

🚀 Como Executar
Pré-requisitos
Node.js (versão X.X.X)

npm ou yarn

Instalação e Execução
bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Acesse o diretório
cd clinica-medica-frontend

# Instale as dependências
npm install

# Execute a aplicação
npm start

# Ou para desenvolvimento
npm run dev
A aplicação estará disponível em http://localhost:3000

📁 Estrutura do Projeto
text
clinica-medica/
├── src/
│   ├── components/
│   │   ├── medicos/
│   │   ├── pacientes/
│   │   └── consultas/
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   └── App.js
├── public/
└── package.json
🔗 Endpoints da API
Médicos
GET /medicos - Listar todos os médicos

POST /medicos - Cadastrar médico

PUT /medicos/{id} - Atualizar médico

DELETE /medicos/{id} - Remover médico

Pacientes
GET /pacientes - Listar todos os pacientes

POST /pacientes - Cadastrar paciente

PUT /pacientes/{id} - Atualizar paciente

DELETE /pacientes/{id} - Remover paciente

Consultas
GET /consultas - Listar todas as consultas

POST /consultas - Cadastrar consulta

DELETE /consultas/{id} - Remover consulta

🎯 Exemplo em Funcionamento
Uma versão de exemplo da aplicação (com recursos parcialmente implementados) está disponível em:
https://ifsp.ddns.net/angular/clinicaMedica/

🤝 Contribuição
Faça o fork do projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Desenvolvido por
[Seu Nome] - [seu.email@exemplo.com]
