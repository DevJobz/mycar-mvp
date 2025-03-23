import React from 'react';

function DashboardCompany() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Painel da Empresa</h1>
            <p className="mb-2">
                Bem-vindo, usuário do tipo <strong>Empresa</strong>!
            </p>

            {/* Seção de gerenciamento de frota, funcionários, etc. */}
            <section className="mb-4">
                <h2 className="text-xl font-semibold">Gerenciar Frota</h2>
                <p className="text-gray-700">
                    Aqui você pode adicionar, editar ou remover veículos da sua
                    frota.
                </p>
                {/* Exemplo de link para página de veículos */}
                <a
                    href="#/vehicles"
                    className="text-blue-500 hover:underline inline-block mt-2"
                >
                    Ir para Veículos
                </a>
            </section>

            {/* Seção de relatórios, estatísticas, etc. */}
            <section className="mb-4">
                <h2 className="text-xl font-semibold">Relatórios</h2>
                <p className="text-gray-700">
                    Visualize relatórios de uso, manutenções pendentes e mais.
                </p>
                {/* Exemplo de componente de relatório futuro */}
                {/* <CompanyReport /> */}
            </section>
        </div>
    );
}

export default DashboardCompany;
