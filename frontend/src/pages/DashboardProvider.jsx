import React from 'react';

function DashboardProvider() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Painel do Prestador de Serviço
            </h1>
            <p className="mb-2">
                Bem-vindo, usuário do tipo <strong>Prestador</strong>!
            </p>

            {/* Seção de serviços ativos, agendamentos, etc. */}
            <section className="mb-4">
                <h2 className="text-xl font-semibold">Serviços</h2>
                <p className="text-gray-700">
                    Aqui você pode gerenciar seus serviços (oficinas, funilaria,
                    pintura, autopeças, etc.).
                </p>
                {/* Exemplo de link para criar novo serviço */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600">
                    Cadastrar novo serviço
                </button>
            </section>

            {/* Seção de solicitações dos usuários */}
            <section className="mb-4">
                <h2 className="text-xl font-semibold">
                    Solicitações Recebidas
                </h2>
                <p className="text-gray-700">
                    Veja solicitações de manutenções ou cotações de peças vindas
                    dos usuários.
                </p>
                {/* Exemplo de componente futuro:
            <RequestList requests={requestsData} /> 
        */}
            </section>
        </div>
    );
}

export default DashboardProvider;
