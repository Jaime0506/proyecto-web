import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AreaProgressChart from './AreaProgressChart';
import React from 'react';

describe('AreaProgressChart', () => {
  it('debe mostrar los datos de progreso correctamente', () => {
    const { container } = render(<AreaProgressChart />);

    // Verifica que los elementos se rendericen correctamente
    expect(screen.getByText('Uno')).toBeInTheDocument();
    expect(screen.getByText('Dos')).toBeInTheDocument();
    expect(screen.getByText('Tres')).toBeInTheDocument();
    expect(screen.getByText('Cuatro')).toBeInTheDocument();
    expect(screen.getByText('Cinco')).toBeInTheDocument();

    // Verifica que los valores de porcentaje estén correctos
    expect(screen.getByText('70')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    // Verifica que los estilos de las barras estén correctos
    const bars = container.querySelectorAll('.bar-item-filled'); // Ahora busca por clase
    expect(bars[0]).toHaveStyle('width: 70%');
    expect(bars[1]).toHaveStyle('width: 40%');
    expect(bars[2]).toHaveStyle('width: 60%');
    expect(bars[3]).toHaveStyle('width: 80%');
    expect(bars[4]).toHaveStyle('width: 20%');
  });
});
