import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  navItems = [
    { name: 'Home', icon: 'bi bi-house' },
    { name: 'Alerts', icon: 'bi bi-bell' },
    { name: 'Live', icon: 'bi bi-camera-video' },
    { name: 'Recordings', icon: 'bi bi-collection-play' },
    { name: 'Use Cases', icon: 'bi bi-layers' },
    { name: 'Reports', icon: 'bi bi-bar-chart' },
    { name: 'Face Recognition', icon: 'bi bi-person-check' },
    { name: 'Usecase Cluster', icon: 'bi bi-diagram-3' },
    { name: 'Configure', icon: 'bi bi-gear' }
  ];

}
