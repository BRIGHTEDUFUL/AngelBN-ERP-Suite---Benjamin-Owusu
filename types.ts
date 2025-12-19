import React from 'react';

export type Platform = 'Radio' | 'TV';
export type ProgramStatus = 'Completed' | 'On Air' | 'Upcoming';
export type SegmentType = 'Content' | 'Ad' | 'Music' | 'News' | 'Intro' | 'Outro';
export type UserRole = 
  | 'Admin' 
  | 'Production Manager' 
  | 'Producer' 
  | 'Programs Manager' 
  | 'Traffic Manager';

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ProgramSegment {
  id: string;
  title: string;
  duration: string;
  type: SegmentType;
  status: 'Done' | 'Live' | 'Next' | 'Pending';
  notes?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  host: string;
  timeSlot: string;
  platform: Platform;
  status: ProgramStatus;
  type: 'News' | 'Sports' | 'Entertainment' | 'Religious' | 'Talk Show';
  adsScheduled: number;
  segments?: ProgramSegment[];
}

export interface AdItem {
  id: string;
  client: string;
  duration: string;
  slots: string[];
  status: 'Active' | 'Completed' | 'Pending';
  priority: 'High' | 'Normal';
}

export interface ArchiveItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: 'Archived' | 'Flagged' | 'Public';
  category: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  lastService: string;
  status: 'Operational' | 'Maintenance' | 'Faulty';
  health: number;
  type: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ElementType;
  color: string;
}

export interface ScheduleItemRowProps {
  item: ScheduleItem;
  onEdit: (item: ScheduleItem) => void;
  onRundown: (item: ScheduleItem) => void;
}