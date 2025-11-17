
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
                <input type="date" name="dataNascimento" id="dataNascimento" required>
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

function addConsulta(event) {

}

function formularioConsulta(event) {
    event.preventDefault();
    let container = document.getElementById("container-conteudo");
    container.innerHTML = "";
    container.innerHTML = `
        < h2 > Marcar Consulta</h2 >

            <form id="form-consulta">
                <div>
                    <label for="medico">Médico</label>
                    <select id="select-medico"></select>
                </div>
                <div>
                    <label for="paciente">Paciente</label>
                    <select id="select-paciente"></select>
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
    let consulta = document.getElementById("form-consulta");
    consulta.addEventListener("submit", addConsulta);
}
function listarConsultas(consultas, pacientes, medicos) {
    let container = document.getElementById("container-conteudo");
    container.innerHTML = "";



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