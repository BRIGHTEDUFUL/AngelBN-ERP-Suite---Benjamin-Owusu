
import { ScheduleItem, ArchiveItem, EquipmentItem, AdItem } from './types';

export const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: '1', title: 'Angel Morning Drive', host: 'Captain Smart', timeSlot: '06:00 - 10:00', platform: 'Radio', status: 'Completed', type: 'Talk Show', adsScheduled: 12 },
  { id: '2', title: 'Sports Cort', host: 'Saddick Adams', timeSlot: '10:00 - 12:00', platform: 'TV', status: 'On Air', type: 'Sports', adsScheduled: 8, segments: [
    { id: 's1', title: 'Show Opener', duration: '05:00', type: 'Intro', status: 'Done' },
    { id: 's2', title: 'EPL Weekend Review', duration: '15:00', type: 'Content', status: 'Done' },
    { id: 's3', title: 'Local League Update', duration: '12:00', type: 'Content', status: 'Live' },
    { id: 's4', title: 'Coca Cola Ad Block', duration: '02:00', type: 'Ad', status: 'Next' }
  ]},
  { id: '3', title: 'Midday News', host: 'Kwadwo Dickson', timeSlot: '12:00 - 13:00', platform: 'Radio', status: 'Upcoming', type: 'News', adsScheduled: 5 },
  { id: '4', title: 'Ladies Circle', host: 'Nana Yaa Brefo', timeSlot: '13:00 - 15:00', platform: 'TV', status: 'Upcoming', type: 'Entertainment', adsScheduled: 10 },
  { id: '5', title: 'Drive Time', host: 'Ohemaa Woyeje', timeSlot: '15:00 - 18:00', platform: 'Radio', status: 'Upcoming', type: 'Entertainment', adsScheduled: 15 }
];

export const MOCK_ADS: AdItem[] = [
  { id: 'AD-001', client: 'Kasapreko Alomo Bitters', duration: '30s', slots: ['10:45', '11:15', '14:20'], status: 'Active', priority: 'High' },
  { id: 'AD-002', client: 'GCB Bank SME Loan', duration: '45s', slots: ['09:15', '12:45'], status: 'Active', priority: 'High' },
  { id: 'AD-003', client: 'FanMilk FanYogo Promo', duration: '15s', slots: ['08:00', '16:00'], status: 'Pending', priority: 'Normal' },
  { id: 'AD-004', client: 'Guinness Ghana', duration: '60s', slots: ['20:00', '22:00'], status: 'Completed', priority: 'Normal' },
  { id: 'AD-005', client: 'Telecel Ghana Data Bundle', duration: '30s', slots: ['07:30', '19:45'], status: 'Active', priority: 'High' },
  { id: 'AD-006', client: 'Pepsodent Strong Teeth', duration: '30s', slots: ['06:15', '18:15'], status: 'Active', priority: 'Normal' }
];

export const MOCK_ARCHIVE: ArchiveItem[] = [
  { id: 'a1', title: 'Morning Drive: Election 2024 Presidential Debate', date: '2024-12-20', duration: '04:00:00', status: 'Archived', category: 'News' },
  { id: 'a2', title: 'Sports Cort: Black Stars vs Sudan Analysis', date: '2025-01-19', duration: '02:00:00', status: 'Public', category: 'Sports' },
  { id: 'a3', title: 'Galamsey Documentary: The River Pra Crisis', date: '2025-01-10', duration: '01:30:00', status: 'Archived', category: 'Documentary' },
  { id: 'a4', title: 'Asantehene 25th Anniversary Special Coverage', date: '2024-05-15', duration: '06:00:00', status: 'Public', category: 'Culture' },
  { id: 'a5', title: 'VGMA 2024 Red Carpet Highlights', date: '2024-06-01', duration: '02:45:00', status: 'Archived', category: 'Entertainment' },
  { id: 'a6', title: 'Midday News: Budget Reading 2025', date: '2024-11-15', duration: '03:15:00', status: 'Public', category: 'News' }
];

export const MOCK_EQUIPMENT: EquipmentItem[] = [
  { id: 'CAM-01', name: 'Accra Studio A Main Cam (Sony 4K)', lastService: '2025-01-10', status: 'Operational', health: 98, type: 'Visual' },
  { id: 'MIC-03', name: 'Kumasi Studio B Wireless Mic (Sennheiser)', lastService: '2024-12-15', status: 'Maintenance', health: 45, type: 'Audio' },
  { id: 'ENC-02', name: 'Accra Digital Encoder #2', lastService: '2025-01-05', status: 'Operational', health: 88, type: 'Network' },
  { id: 'LGT-01', name: 'Studio B Grid (Accra)', lastService: '2024-11-20', status: 'Faulty', health: 12, type: 'Lighting' },
  { id: 'TRAN-01', name: 'Koforidua Transmitter Station', lastService: '2025-01-20', status: 'Operational', health: 92, type: 'Transmitter' },
  { id: 'OB-VAN-01', name: 'Angel Mobile OB Van (Accra Base)', lastService: '2024-12-01', status: 'Operational', health: 85, type: 'Vehicle' }
];

export const CHART_DATA = [
  { name: 'News', value: 15 },
  { name: 'Sports', value: 25 },
  { name: 'Entertainment', value: 40 },
  { name: 'Religious', value: 20 },
];

export const ADS_DATA = [
  { name: 'Mon', ads: 45 }, { name: 'Tue', ads: 52 }, { name: 'Wed', ads: 38 },
  { name: 'Thu', ads: 65 }, { name: 'Fri', ads: 82 }, { name: 'Sat', ads: 40 }, { name: 'Sun', ads: 30 }
];
