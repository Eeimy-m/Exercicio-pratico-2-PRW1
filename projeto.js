
function carregarPacientes(event) {
    if (event) {
        event.preventDefault();
    }
    fetch("https://ifsp.ddns.net/webservices/clinicaMedica/pacientes")
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error("Erro na requisição");
            }
            return resposta.json();
        })
        .then(listarPacientes)
        .catch((error) => {
            console.log(`Deu problema: ${error.message}`);
        });
}

async function addPaciente(event) {
    event.preventDefault();
    const options = {
        method: "POST",
        body: JSON.stringify({
            nome: document.querySelector("input[name=nome]").value,
            dataNascimento: document.querySelector("input[name=dataNascimento]").value,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        let hoje = new Date();
        let inputData = document.querySelector("input[name=dataNascimento]").value;
        let dataNascimento = new Date(inputData);
        if (dataNascimento > hoje) {
            throw new Error("Data de nascimento inválida")
        }
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/pacientes", options)
        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        alert("Paciente cadastrado com sucesso!");
        document.getElementById("form-paciente").reset();
        carregarPacientes();
    }
    catch (error) {
        alert(`Não foi possível cadastrar: ${error.message}`);
    }
}

function listarPacientes(pacientes) {
    let container = document.getElementById("container-conteudo");
    container.innerHTML = "";
    let table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Data de Nascimento</th>
                <th>Data de Cadastro</th>
            </tr>
        </thead>
    `;
    let tbody = document.createElement("tbody");
    tbody.id = "corpo-listar-pacientes";
    for (let paciente of pacientes) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${paciente.nome}</td>
        <td>${paciente.dataNascimento}</td>
        <td>${paciente.dataCadastro}</td>
        <td><button id="btn-consultas-paciente">Consultas</button></td>
        <td><button id="btn-editar-paciente">Editar</button></td>
        <td><button id="btn-deletar-paciente">Deletar</button></td>
       `
        tbody.append(tr);
    }
    table.append(tbody);
    container.append(table);
}

function mostrarFormularioPaciente(event) {
    event.preventDefault();
    let container = document.getElementById("container-conteudo")
    container.innerHTML = "";
    container.innerHTML = `
        <h2>Cadastrar Novo Paciente</h2>
        
        <form id="form-paciente"> 
            <div>
                <label for="nome">Nome:</label>
                <input type="text" name="nome" id="nome" required>
            </div>
            <div>
                <label for="dataNascimento">Data de Nascimento:</label>
                <input type="date" name="dataNascimento" id="dataNascimento required>
            </div>
            
            <button type="submit">Salvar Paciente</button>
        </form>
    `;
    let form = document.getElementById("form-paciente");
    form.addEventListener("submit", addPaciente);
}

function carregarMedicos(event) {
    if (event) {
        event.preventDefault();
    }
    fetch("https://ifsp.ddns.net/webservices/clinicaMedica/medicos")
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error("Erro na requisição");
            }
            return resposta.json();
        })
        .then(listarMedicos)
        .catch((error) => {
            console.log(`Deu problema: ${error.message}`);
        });
}
async function carregarEspecialidade() {
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/especialidades");
        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        let dados = await resposta.json();
        return dados;

    } catch (error) {
        console.log(`Deu problema: ${error.message}`);
    }
}
async function addMedicos(event) {
    event.preventDefault();
    const options = {
        method: "POST",
        body: JSON.stringify({
            nome: document.querySelector("input[name=nome]").value,
            idEspecialidade: document.querySelector("select[name=especialidade]").value,
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/medicos", options)
        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        document.getElementById("form-medico").reset()
        alert("Médico salvo com sucesso!");
        carregarMedicos();
    }
    catch (error) {
        alert(`Não foi possível cadastrar: ${error.message}`);
    }
}

async function listarMedicos(medicos) {
    let container = document.getElementById("container-conteudo");
    let especialidades = await carregarEspecialidade();
    container.innerHTML = "";
    let table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Especialidade</th>
                <th>Data de Cadastro</th>
            </tr>
        </thead>
    `;
    let tbody = document.createElement("tbody");
    tbody.id = "corpo-listar-medicos";

    for (let medico of medicos) {
        let nomeEspecialidade = `ID ${medico.idEspecialidade}`;
        for (let especialidade of especialidades) {
            if (especialidade.id == medico.idEspecialidade) {
                nomeEspecialidade = especialidade.nome;
                break;
            }
        }
        let tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${medico.nome}</td>
        <td>${nomeEspecialidade}</td>
        <td>${medico.dataCadastro}</td>
        <td><button id="btn-consultas-medico">Consultas</button></td>
        <td><button id="btn-editar-medico">Editar</button></td>
        <td><button id="btn-deletar-medico">Deletar</button></td>
       `
        tbody.append(tr);
    }
    table.append(tbody);
    container.append(table);
}

async function mostrarFormularioMedicos(event) {
    event.preventDefault();
    let especialidades = await carregarEspecialidade();
    let container = document.getElementById("container-conteudo")
    container.innerHTML = "";
    container.innerHTML = `
        <h2> Cadastrar Novo Médico</h2 >

            <form id="form-medico">
                <div>
                    <label for="nome">Nome:</label>
                    <input type="text" name="nome" id="nomeMedico" required>
                </div>

                <div>
                    <label for="especialidade">Especialidade:</label>
                    <select name="especialidade" id="especialidade" required>
                        <option value="">Selecione uma especialidade</option>
                    </select> </div>

                <button type="submit">Salvar Médico</button>
            </form>
    `;
    let select = document.getElementById("especialidade");
    for (let especialidade of especialidades) {
        let option = document.createElement("option");
        option.value = `${especialidade.id}`;
        option.innerText = `${especialidade.nome}`;
        select.append(option);
    }

    let form = document.getElementById("form-medico");
    form.addEventListener("submit", addMedicos);
}

async function addConsulta(event) {
    event.preventDefault();
    const options = {
        method: "POST",
        body: JSON.stringify({
            medico: document.querySelector("select[name=select-medico]"),
            paciente: document.querySelector("select[name=select-paciente]"),
            data: document.getElementById("data"),
            horario: document.getElementById("horario")
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/consultas", options);
        if(!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        document.getElementById("form-consulta").reset()
        alert("Consulta cadastrada com sucesso!");
        carregarMedicos();
    }
    catch (error) {
        alert(`Não foi possível cadastrar: ${error.message}`);
    }
}

async function carregarMedicosParaSelect(selectId) {
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/medicos");
        if(!resposta.ok) {
            throw new Error ("Não foi possível carregar os dados dos médicos disponíveis.");
        }
        let medicos = await resposta.json();
        let select = document.getElementById(selectId);
        select.innerHTML = `<option value="">Selecione um médico</option>`
        for(let medico of medicos) {
            let option = document.createElement("option");
            option.value = medico.id;
            option.innerText = medico.nome;
            select.append(option);
        }
    }
    catch(error) {
        console.log(`Deu problema ao carregar médicos: ${error.message}`);
    }
}

async function carregarPacienteParaSelect(selectId) {
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/pacientes");
        if(!resposta.ok) {
            throw new Error ("Não foi possível carregar os dados dos médicos disponíveis.");
        }
        let select = document.getElementById(selectId);
        let pacientes = await resposta.json();
        for(let paciente of pacientes) {
            let option = document.createElement("option");
            option.value = paciente.id;
            option.innerText = paciente.nome;
            select.append(option);
        }
    }
    catch(error){
        console.log(`Deu problema ao carregar médicos: ${error.message}`);
    }
}

async function formularioConsulta(event) {
    event.preventDefault();
    let container = document.getElementById("container-conteudo");
    container.innerHTML = "";
    container.innerHTML = `
        <h2>Marcar Consulta</h2>

            <form id="form-consulta">
                <div>
                    <label for="medico" name="medico">Médico</label>
                    <select id="select-medico" name="select=medico">
                        <option>Selecione um médico</option>
                    </select>
                </div>
                <div>
                    <label for="paciente">Paciente</label>
                    <select id="select-paciente" name="select-paciente">
                        <option>Selecione um paciente</option>
                    </select>
                </div>
                <div>
                    <label for="data-consulta">Data da consulta</label>
                    <input type="date" id="data">
                </div>
                <div>
                    <label for="horario-consulta">Horário da consulta</label>
                    <input type="time" id="horario">
                </div>
                <button type="submit">Salvar Consulta</button>
            </form>
    `

    await carregarMedicosParaSelect("select-medico");
    await carregarPacienteParaSelect("select-paciente");

    let consulta = document.getElementById("form-consulta");
    consulta.addEventListener("submit", addConsulta);
}

async function listarConsultas(consultas, paciente, medicos) {
    let container = document.getElementById("container-conteudo");
    let especialidades = await carregarEspecialidade();
    container.innerHTML = "";
    let table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Médico</th>
                <th>Paciente</th>
                <th>Data da consulta</th>
                <th>Horário</th>
            </tr>
        </thead>
    `;
    let tbody = document.createElement("tbody");
    tbody.id = "corpo-listar-consulta";

    for(let medico of medicos) {
        let nomeEspecialidade = medico.idEspecialidade;
        for(let especialidade of especialidades) {
            if(especialidade.id == nomeEspecialidade) {
                nomeEspecialidade = especialidade.nome;
                break;
            }
        }
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${medico.nome}</td>
            <td>${paciente.nome}</td>
        `
    }
}

function main() {
    let clickListaPaciente = document.getElementById("link-listar-pacientes");
    clickListaPaciente.addEventListener("click", carregarPacientes);
    let clicKAddPaciente = document.getElementById("link-cadastrar-pacientes");
    clicKAddPaciente.addEventListener("click", mostrarFormularioPaciente);

    let clickListarMedicos = document.getElementById("listar-medicos");
    clickListarMedicos.addEventListener("click", carregarMedicos);
    let clickAddMedicos = document.getElementById("cadastrar-medicos");
    clickAddMedicos.addEventListener("click", mostrarFormularioMedicos);

    let adicionarConsulta = document.getElementById("addConsulta");
    adicionarConsulta.addEventListener("click", formularioConsulta);
}
main()