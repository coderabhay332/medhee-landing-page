/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HealthCard {
  id: string;
  type: 'medication' | 'allergy' | 'report' | 'chronic' | 'diet' | 'symptom';
  label: string;
  value: string;
  meta?: string;
  iconName: string;
}

export interface StoryFrame {
  step: number;
  title: string;
  description: string;
  highlightText: string;
  type: 'context' | 'input' | 'analysis' | 'triage' | 'doctor' | 'update';
}

export interface TriageTier {
  id: 'low' | 'moderate' | 'high';
  title: string;
  subtitle: string;
  description: string;
  outcome: string;
  colorClass: string;
  actionText: string;
}
