import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

interface PolicySection {
  title: string;
  description: string;
  points: string[];
}

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [ButtonModule, CardModule, DividerModule],
  templateUrl: './politicas.component.html',
  styleUrls: ['./politicas.component.scss'],
})
export class PoliticasComponent {
  policies: PolicySection[] = [
    {
      title: 'Datos que recolectamos',
      description: 'Solo solicitamos la información necesaria para operar tu cuenta y agenda.',
      points: [
        'Datos de contacto (nombre, email, teléfono) para crear usuarios y notificar turnos.',
        'Disponibilidad y configuración de turnos para ofrecer reservas correctas.',
        'Registros técnicos mínimos para seguridad y trazabilidad.',
      ],
    },
    {
      title: 'Protección y almacenamiento',
      description: 'Cuidamos tus datos con buenas prácticas de seguridad.',
      points: [
        'Transmisión cifrada (HTTPS) y controles de acceso por rol.',
        'Backups periódicos y monitoreo de disponibilidad.',
        'Accesos internos limitados y auditados.',
      ],
    },
    {
      title: 'Derechos y control',
      description: 'Tú decides qué sucede con tu información.',
      points: [
        'Podés solicitar acceso, corrección o eliminación de tus datos.',
        'Configurá qué notificaciones se envían a tus clientes.',
        'Portabilidad de datos disponible bajo pedido.',
      ],
    },
  ];
}
