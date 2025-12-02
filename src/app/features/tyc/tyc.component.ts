import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

interface Section {
  title: string;
  description: string;
  points: string[];
}

@Component({
  selector: 'app-tyc',
  standalone: true,
  imports: [ButtonModule, CardModule, DividerModule],
  templateUrl: './tyc.component.html',
  styleUrls: ['./tyc.component.scss'],
})
export class TycComponent {
  sections: Section[] = [
    {
      title: 'Uso del servicio',
      description: 'Lineamientos básicos para operar tu agenda y gestionar turnos.',
      points: [
        'Cuenta única por usuario y acceso mediante credenciales personales.',
        'Respeta los cupos configurados para evitar sobreventa de turnos.',
        'Los cambios de agenda quedan registrados para auditoría.',
      ],
    },
    {
      title: 'Responsabilidades',
      description: 'Compromisos tanto del equipo de Turnero como de tu negocio.',
      points: [
        'Turnero garantiza disponibilidad del servicio salvo mantenimientos programados.',
        'Tu equipo es responsable de la exactitud de horarios y políticas de cancelación.',
        'Notificaciones y recordatorios se envían según la configuración que definas.',
      ],
    },
    {
      title: 'Pagos y facturación',
      description: 'Información relevante para planes, ciclos de cobro y soporte.',
      points: [
        'Los planes pagos se facturan mensualmente.',
        'Podés cambiar de plan en cualquier momento; los ajustes aplican al siguiente ciclo.',
        'Soporte prioritario disponible para planes avanzados y premium.',
      ],
    },
  ];
}
