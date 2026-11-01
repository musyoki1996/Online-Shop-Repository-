import { CountyDeliveryZone } from '../types';

export const KENYA_COUNTIES: CountyDeliveryZone[] = [
  {
    county: 'Nairobi',
    towns: ['CBD', 'Westlands', 'Kilimani', 'Karen', 'Langata', 'Parklands', 'Upper Hill', 'South B / South C', 'Kileleshwa', 'Runda', 'Lavington', 'Eastleigh', 'Roysambu', 'Kasaran', 'Embakasi', 'Ngong Road'],
    standardFee: 250,
    expressFee: 450,
    estimatedDays: 'Same-day or Next-day'
  },
  {
    county: 'Kiambu',
    towns: ['Thika', 'Kiambu Town', 'Ruiru', 'Kikuyu', 'Limuru', 'Juja', 'Karuri', 'Banana'],
    standardFee: 350,
    expressFee: 600,
    estimatedDays: '1 - 2 business days'
  },
  {
    county: 'Mombasa',
    towns: ['Mombasa CBD', 'Nyali', 'Bamburi', 'Mtwapa', 'Likoni', 'Changamwe', 'Kizingo'],
    standardFee: 450,
    expressFee: 850,
    estimatedDays: '2 - 3 business days'
  },
  {
    county: 'Nakuru',
    towns: ['Nakuru Town', 'Naivasha', 'Gilgil', 'Molo', 'Njoro', 'Subukia'],
    standardFee: 400,
    expressFee: 750,
    estimatedDays: '2 business days'
  },
  {
    county: 'Kisumu',
    towns: ['Kisumu City', 'Milimani', 'Kondele', 'Maseno', 'Ahero'],
    standardFee: 450,
    expressFee: 850,
    estimatedDays: '2 - 3 business days'
  },
  {
    county: 'Uasin Gishu',
    towns: ['Eldoret Town', 'Kapsoya', 'Langas', 'Turbo', 'Burnt Forest'],
    standardFee: 450,
    expressFee: 850,
    estimatedDays: '2 - 3 business days'
  },
  {
    county: 'Machakos',
    towns: ['Machakos Town', 'Athi River', 'Syokimau', 'Mlolongo', 'Kangundo', 'Tala'],
    standardFee: 350,
    expressFee: 650,
    estimatedDays: '1 - 2 business days'
  },
  {
    county: 'Kajiado',
    towns: ['Ngong', 'Kitengela', 'Ongata Rongai', 'Kiserian', 'Kajiado Town'],
    standardFee: 350,
    expressFee: 650,
    estimatedDays: '1 - 2 business days'
  },
  {
    county: 'Kilifi',
    towns: ['Kilifi Town', 'Malindi', 'Watamu', 'Mtwapa', 'Mariakani'],
    standardFee: 500,
    expressFee: 950,
    estimatedDays: '2 - 4 business days'
  },
  {
    county: 'Nyeri',
    towns: ['Nyeri Town', 'Karatina', 'Othaya', 'Mukurweini'],
    standardFee: 450,
    expressFee: 800,
    estimatedDays: '2 business days'
  },
  {
    county: 'Meru',
    towns: ['Meru Town', 'Nkubu', 'Maua', 'Timau'],
    standardFee: 500,
    expressFee: 900,
    estimatedDays: '2 - 3 business days'
  },
  {
    county: 'Kakamega',
    towns: ['Kakamega Town', 'Mumias', 'Lugari', 'Malava'],
    standardFee: 500,
    expressFee: 900,
    estimatedDays: '2 - 4 business days'
  },
  {
    county: 'Kisii',
    towns: ['Kisii Town', 'Ogembo', 'Suneka', 'Tabaka'],
    standardFee: 500,
    expressFee: 900,
    estimatedDays: '2 - 4 business days'
  }
];

export const getCountyDeliveryInfo = (countyName: string): CountyDeliveryZone => {
  const found = KENYA_COUNTIES.find(c => c.county.toLowerCase() === countyName.toLowerCase());
  return found || {
    county: countyName || 'Countrywide',
    towns: ['Main Depot', 'Posta', 'Courier Pick-up'],
    standardFee: 500,
    expressFee: 950,
    estimatedDays: '2 - 4 business days'
  };
};
