
async function carregarPacientes() { //FUNCIONANDO
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/pacientes");
        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        return await resposta.json();
    } catch (error) {
        console.log(`Deu problema: ${error.message}`);
    }
}
async function carregarMedicos() { //FUNCIONANDO
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/medicos");
        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        return await resposta.json();
    } catch (error) {
        console.log(`Deu problema: ${error.message}`);
    }
}
async function carregarEspecialidade() {  //FUNCIONANDO
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/especialidades");
        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        return await resposta.json();
    } catch (error) {
        console.log(`Deu problema: ${error.message}`);
    }
}
async function carregarConsultas() {
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/consultas");
        if (!resposta.ok) {
            throw new Error("Erro na requisição");
        }
        return await resposta.json();
    } catch (error) {
        console.log(`Deu problema: ${error.message}`);
    }
}

async function carregarMedicosParaSelect(selectId) {
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/medicos");
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados dos médicos disponíveis.");
        }
        let medicos = await resposta.json();
        let select = document.getElementById(selectId);
        select.innerHTML = `<option value="">Selecione um médico</option>`
        for (let medico of medicos) {
            let option = document.createElement("option");
            option.value = medico.id;
            option.innerText = medico.nome;
            select.append(option);
        }
    }
    catch (error) {
        console.log(`Deu problema ao carregar médicos: ${error.message}`);
    }
}

async function carregarPacienteParaSelect(selectId) {
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/pacientes");
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados dos médicos disponíveis.");
        }
        let select = document.getElementById(selectId);
        let pacientes = await resposta.json();
        for (let paciente of pacientes) {
            let option = document.createElement("option");
            option.value = paciente.id;
            option.innerText = paciente.nome;
            select.append(option);
        }
    }
    catch (error) {
        console.log(`Deu problema ao carregar médicos: ${error.message}`);
    }
}

async function addPaciente(event) {  //// FUNCIONANDO
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

async function addMedicos(event) { ///// FUNCIONANDO
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

async function addConsulta(event) {
    event.preventDefault();
    const options = {
        method: "POST",
        body: JSON.stringify({
            medico: document.querySelector("select[name=select-medico]"),
            paciente: document.querySelector("select[name=select-paciente]"),
            data: document.getElementById("data-consulta"),
            horario: document.getElementById("horario")
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/consultas", options);
        if (!resposta.ok) {
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

function listarPacientes(pacientes) {  ////FUNCIONANDO
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
        <td><button id="btn-consultas-paciente-${paciente.id}">Consultas</button></td>
        <td><button id="btn-editar-paciente-${paciente.id}">Editar</button></td>
        <td><button id="btn-deletar-paciente-${paciente.id}">Deletar</button></td>
       `
        tbody.append(tr);
    }
    table.append(tbody);
    container.append(table);
    adicionarListenersPacientes();
}
async function listarMedicos(medicos) {  //// FUNCIONANDO
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

    for(let medico of medicos) {
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
        <td><button id="btn-consultas-medico-${medico.id}">Consultas</button></td>
        <td><button id="btn-editar-medico-${medico.id}">Editar</button></td>
        <td><button id="btn-deletar-medico-${medico.id}">Deletar</button></td>
       `
        tbody.append(tr);
    }
    table.append(tbody);
    container.append(table);
    
    adicionarListenersMedicos();
}
async function listarConsultas(pacienteID) { /////FUNCIONANDO
    let container = document.getElementById("container-consultas");
    container.innerHTML = "";
    let table = document.createElement("table");
    let listaPacientes = await criarListaPacientesPorId();
    let listaMedicos = await criarListaMedicosPorId();
    let consultas = await carregarConsultas();

    let consultasFiltradas = consultas.filter(consulta => {
        return String(consulta.idPaciente) === String(pacienteID);
    })
    table.innerHTML = `

        <thead>
        <tr>
        <th>Consultas</th>
        </tr>
            <tr>
                <th>Médico</th>
                <th>Paciente</th>
                <th>Data</th>
                <th>Cancelar</th>
            </tr>
        </thead>
    `;

    let nomePaciente = listaPacientes[pacienteID];
    let tbody = document.createElement("tbody");
    tbody.id = "corpo-listar-consulta";
    if (consultasFiltradas.length > 0) {
        for (let consulta of consultasFiltradas) {

            let nomeMedico = listaMedicos[consulta.idMedico];
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${nomeMedico}</td>
                <td>${nomePaciente}</td>
                <td>${consulta.data}</td>
                <td><button id="cancelar-consulta">Cancelar</button></td>
            `
            tbody.append(tr);


        }
    }
    else {
        table.innerHTML="";
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>Nenhuma consulta encontrada para este paciente.</td>`;
        tbody.append(tr);
    }
    table.append(tbody);
    container.append(table);

}

function adicionarListenersPacientes() {  ///FUNCIONANDO, MAS INCOMPLETA, FAZER FUNÇÃO IDENTICA PARA MEDICOS
    let tbody = document.getElementById("corpo-listar-pacientes");
    if (!tbody) return;

    tbody.addEventListener('click', (event) => {
        const elementoClicado = event.target;

        if (elementoClicado.id.startsWith('btn-consultas-paciente-')) {
            const partesDoId = elementoClicado.id.split('-');
            const idPaciente = partesDoId.pop();
            listarConsultas(idPaciente);
        }
        else if (elementoClicado.id.startsWith('btn-editar-paciente-')) {
            editarPaciente(event);
        }
        else if(elementoClicado.id.startsWith('btn-deletar-paciente-')) {
            deletarPaciente(event);
        }
    });
}

function adicionarListenersMedicos() {  ///FUNCIONANDO, MAS INCOMPLETA
    let tbody = document.getElementById("corpo-listar-medicos");
    if (!tbody) return;

    tbody.addEventListener('click', (event) => {
        const elementoClicado = event.target;

        if (elementoClicado.id.startsWith('btn-consultas-medico-')) {
            const partesDoId = elementoClicado.id.split('-');
            const idPaciente = partesDoId.pop();
            listarConsultas(idPaciente);
        }
        else if (elementoClicado.id.startsWith('btn-editar-paciente-')) {

        }
        else if(elementoClicado.id.startsWith('btn-deletar-medico-')) {
            deletarMedico(event);
        }
    });
}

async function criarListaPacientesPorId() {
    let pacientes = await carregarPacientes();
    let listaPacientes = {};
    for (let paciente of pacientes) {
        listaPacientes[paciente.id] = paciente.nome;
    }
    return listaPacientes;
}
async function criarListaMedicosPorId() {
    let medicos = await carregarMedicos();
    let listaMedicos = {};
    for (let medico of medicos) {
        listaMedicos[medico.id] = medico.nome
    }
    return listaMedicos;
}

function mostrarFormularioPaciente(event) {  ////FUNCIONANDO
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

async function mostrarFormularioMedicos(event) {   ////FUNCIONANDO
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
                    <input type="date" id="data-consulta">
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

async function eventListarPacientes(event) {  //FUNCIONANDO
    event.preventDefault();
    let pacientes = await carregarPacientes();
    listarPacientes(pacientes);
}
async function eventListarMedicos(event) { /// FUNCIONANDO
    event.preventDefault();
    let medicos = await carregarMedicos();
    listarMedicos(medicos);
}

async function deletarPaciente(event) {
    event.preventDefault();
    let idPaciente = event.target.id.split('-').pop();
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        let resposta = await fetch(`https://ifsp.ddns.net/webservices/clinicaMedica/pacientes/${idPaciente}`, options);
        if(!resposta.ok) {
            throw new Error ("Erro ao deletar.");
        }
        alert("Paciente deletado com sucesso!");
        carregarPacientes();
        let pacientes = await carregarPacientes();
        listarPacientes(pacientes);
    }
    catch(error) {
        alert(`Não foi possível deletar: ${error}`);
    }
    
}

async function deletarMedico(event) {
    event.preventDefault();
    let idMedico = event.target.id.split('-').pop();
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };
        let resposta = await fetch(`https://ifsp.ddns.net/webservices/clinicaMedica/medicos/${idMedico}`, options);
        if(!resposta.ok) {
            throw new Error ("Erro ao deletar.");
        }
        alert("Médico deletado com sucesso!");
        carregarMedicos();
        let medicos = await carregarMedicos();
        listarMedicos(medicos);
    }
    catch(error) {
        alert(`Não foi possível deletar: ${error}`);
    }
    
}

async function editarPaciente(event) {
    event.preventDefault();
    let idPaciente = event.target.id.split('-').pop();
    try {
        let resposta = await fetch(`https://ifsp.ddns.net/webservices/clinicaMedica/pacientes/${idPaciente}`);
        if(!resposta.ok) {
            throw new Error ("Erro ao editar.");
        }
        const paciente = await resposta.json();

        let container = document.getElementById("container-conteudo");
        container.innerHTML = `
            <h2>Editar Paciente</h2>
            <form id="form-paciente">
                <div>
                    <label for="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" required>
                </div>
                <div>
                    <label for="dataNascimento">Data de Nascimento:</label>
                    <input type="date" name="dataNascimento" id="dataNascimento" required>
                </div>
                <button type="submit">Salvar Alterações</button>
            </form>
        `;

        document.querySelector("input[name=nome]").value = paciente.nome || "";
        document.querySelector("input[name=dataNascimento]").value = paciente.dataNascimento || "";

        const form = document.getElementById("form-paciente");
        const submitHandler = async (e) => {
            e.preventDefault();
            try {
                const options = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome: document.querySelector("input[name=nome]").value,
                        dataNascimento: document.querySelector("input[name=dataNascimento]").value
                    })
                };
                let r = await fetch(`https://ifsp.ddns.net/webservices/clinicaMedica/pacientes/${idPaciente}`, options);
                if (!r.ok) {
                    throw new Error("Erro ao salvar alterações");
                } 
                alert("Paciente atualizado com sucesso!");
                form.removeEventListener("submit", submitHandler);
                const pacientes = await carregarPacientes();
                listarPacientes(pacientes);
            } 
            catch (err) {
                alert(`Não foi possível atualizar: ${err.message}`);
            }
        };
        form.addEventListener("submit", submitHandler);

    }
    catch(error) {
        alert(`Não foi possível editar: ${error}`);
    }
}

async function editarMedico(event) {
    event.preventDefault();
}

async function main() {
    let clickListaPaciente = document.getElementById("link-listar-pacientes");
    clickListaPaciente.addEventListener("click", eventListarPacientes);

    let clicKAddPaciente = document.getElementById("link-cadastrar-pacientes");
    clicKAddPaciente.addEventListener("click", mostrarFormularioPaciente);

    let clickListarMedicos = document.getElementById("listar-medicos");
    clickListarMedicos.addEventListener("click", eventListarMedicos);
    let clickAddMedicos = document.getElementById("cadastrar-medicos");
    clickAddMedicos.addEventListener("click", mostrarFormularioMedicos);

    let adicionarConsulta = document.getElementById("addConsulta");
    adicionarConsulta.addEventListener("click", formularioConsulta);


}
main()