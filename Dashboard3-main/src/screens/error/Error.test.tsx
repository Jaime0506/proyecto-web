import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import Dashboard from '../dashboard/DashboardScreen';
import { expect, test } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom'; // Importar jest-dom para usar `toBeInTheDocument`

test('Redirige a la vista principal en la ruta predeterminada', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Dashboard title={undefined} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});

test('Muestra "Página no encontrada" para una ruta inexistente', () => {
  render(
    <MemoryRouter initialEntries={['/ruta-inexistente']}>
      <Routes>
        <Route path="/" element={<Dashboard title={undefined} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();
});
