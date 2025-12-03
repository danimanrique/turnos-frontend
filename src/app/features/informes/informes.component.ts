import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ProgressBarModule, ChartModule],
  templateUrl: './informes.component.html',
  styleUrl: './informes.component.scss',
})
export class InformesComponent {
  kpis = signal([
    { label: 'Turnos del mes', value: 1280, diff: '+12% vs. mes anterior', severity: 'success' },
    { label: 'Usuarios activos', value: 842, diff: '+5% vs. mes anterior', severity: 'info' },
    { label: 'Empleados en equipo', value: 34, diff: 'Sin cambios', severity: 'info' },
    { label: 'Cancelaciones', value: 72, diff: '-8% vs. mes anterior', severity: 'warn' },
  ]);

  usoRecursos = signal([
    { nombre: 'Profesionales', turnos: 620, porcentaje: 48 },
    { nombre: 'Canchas', turnos: 420, porcentaje: 32 },
    { nombre: 'Salas', turnos: 240, porcentaje: 20 },
  ]);

  distribucionChart = signal({
    labels: ['Profesionales', 'Canchas', 'Salas'],
    datasets: [
      {
        data: [48, 32, 20],
        backgroundColor: ['#0ea5e9', '#6366f1', '#f97316'],
        hoverBackgroundColor: ['#0284c7', '#4f46e5', '#ea580c'],
      },
    ],
  });

  lineChart = signal({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Turnos reservados',
        data: [820, 910, 980, 1200, 1280, 1360],
        borderColor: '#0ea5e9',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Cancelaciones',
        data: [120, 110, 105, 98, 92, 88],
        borderColor: '#f97316',
        tension: 0.3,
        fill: false,
      },
    ],
  });
}
