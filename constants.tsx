
import React from 'react';
import { Project, Skill } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const SKILLS: Skill[] = [
  { name: 'Circuit Analysis', level: 90, category: 'Core EEE' },
  { name: 'Control Systems', level: 85, category: 'Core EEE' },
  { name: 'Microcontrollers', level: 80, category: 'Core EEE' },
  { name: 'Python', level: 75, category: 'Programming' },
  { name: 'C++', level: 70, category: 'Programming' },
  { name: 'MATLAB', level: 85, category: 'Tools' },
  { name: 'Proteus', level: 80, category: 'Tools' },
  { name: 'Arduino', level: 90, category: 'Tools' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Smart Power Management System',
    description: 'An IoT-based solution for real-time monitoring of energy consumption using Arduino and ESP8266.',
    tags: ['IoT', 'Embedded Systems', 'C++'],
    imageUrl: 'https://picsum.photos/seed/eee1/800/600',
  },
  {
    id: 2,
    title: 'Automated Solar Tracker',
    description: 'Dual-axis solar tracking system designed to maximize panel efficiency throughout the day.',
    tags: ['Renewable Energy', 'Arduino', 'LDR'],
    imageUrl: 'https://picsum.photos/seed/eee2/800/600',
  },
  {
    id: 3,
    title: 'Line Following Robot',
    description: 'PID controlled robot capable of navigating complex paths with high precision.',
    tags: ['Robotics', 'Control Theory', 'Sensors'],
    imageUrl: 'https://picsum.photos/seed/eee3/800/600',
  },
];
