async function getMedicos()
{
    try{
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/medicos");
        if(!resposta.ok){
            throw new Error("Erro na requisição de medicos.");
        }
        const medicos = await resposta.json();
        return medicos;
    }
    catch(error)
    {
        console.error("Falha em getMedicos", error);
    }
}
async function getPacientes()
{
    try{
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/pacientes");
        if(!resposta.ok){
            throw new Error("Erro na requisição de pacientes.");
        }
        const pacientes = await resposta.json();
        return pacientes;
    }
    catch(error)
    {
        console.error("Falha em getPacientes",error);
    }
}
async function getConsultas()
{
    try{
        let resposta = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/consultas");
        if(!resposta.ok){
            throw new Error("Erro na requisição de consultas.")
        }
        const consultas = await consultas.json();
        return consultas;
    }
    catch(error)
    {
        console.error("Falha em getConsultas", error);
    }
}