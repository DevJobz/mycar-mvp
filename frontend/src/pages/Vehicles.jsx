// src/pages/Vehicles.jsx
import React, { useEffect, useState } from 'react';
import { getVehicles, createVehicle } from '../services/api';

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [newVehicle, setNewVehicle] = useState({
        brand: '',
        model: '',
        year: '',
        plate: '',
        usageProfile: 'urban',
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const data = await getVehicles();
            setVehicles(data);
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVehicle(newVehicle);
            fetchVehicles();
            setNewVehicle({
                brand: '',
                model: '',
                year: '',
                plate: '',
                usageProfile: 'urban',
            });
        } catch (error) {
            console.error('Erro ao criar veículo:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Lista de Veículos</h1>
            <form onSubmit={handleSubmit} className="mb-4 space-y-2">
                <input
                    type="text"
                    placeholder="Marca"
                    className="border p-2 w-full"
                    value={newVehicle.brand}
                    onChange={(e) =>
                        setNewVehicle({ ...newVehicle, brand: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    className="border p-2 w-full"
                    value={newVehicle.model}
                    onChange={(e) =>
                        setNewVehicle({ ...newVehicle, model: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Ano"
                    className="border p-2 w-full"
                    value={newVehicle.year}
                    onChange={(e) =>
                        setNewVehicle({ ...newVehicle, year: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Placa"
                    className="border p-2 w-full"
                    value={newVehicle.plate}
                    onChange={(e) =>
                        setNewVehicle({ ...newVehicle, plate: e.target.value })
                    }
                />
                <select
                    className="border p-2 w-full"
                    value={newVehicle.usageProfile}
                    onChange={(e) =>
                        setNewVehicle({
                            ...newVehicle,
                            usageProfile: e.target.value,
                        })
                    }
                >
                    <option value="urban">Urbano</option>
                    <option value="rodoviario">Rodoviário</option>
                    <option value="misto">Misto</option>
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Cadastrar Veículo
                </button>
            </form>

            {/* Lista de veículos */}
            <ul className="space-y-2">
                {vehicles.map((vehicle) => (
                    <li key={vehicle._id} className="border p-2 rounded">
                        <strong>{vehicle.brand}</strong> - {vehicle.model} (
                        {vehicle.year})
                        <span className="ml-2 text-sm text-gray-600">
                            {vehicle.plate}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Vehicles;
