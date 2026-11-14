import { AestheticCategory, BudgetTier, SpaceType } from '@/types';

export const BUDGET_TIERS: { id: BudgetTier; label: string; limit: number; description: string }[] = [
  { id: 'under-2k', label: 'Under ₹2,000', limit: 2000, description: 'Micro-upgrades & atmospheric lighting' },
  { id: 'under-5k', label: 'Under ₹5,000', limit: 5000, description: 'Focused study and bedding transformations' },
  { id: 'under-10k', label: 'Under ₹10,000', limit: 10000, description: 'Complete aesthetic rental overhauls' },
  { id: 'under-20k', label: 'Under ₹20,000', limit: 20000, description: 'Full studio & compact bedroom architecture' },
];

export const AESTHETIC_CATEGORIES: { id: AestheticCategory; label: string; description: string; image: string }[] = [
  {
    id: 'Japandi',
    label: 'Japandi',
    description: 'Clean cedar lines, organic linen bedding, tactile raw ceramics, and diffused 2700K illumination.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5y8-IhRqi0GLLldM0VYrMsO7NxHisTvMlcVfO4ij5x-CDwkZcCUJUBMJNNJahK6mlwvTfQmkXg2JMXoM0kjZL9p-CPXQP7mUgC6i8nZuZmr_KuF27b8mLCmld6njsBGVW5TYiownH2EeJLzlLgp3In2XAOMy0Tbm-2kjS-gbfHHFbO59l5PXlGchxzIYPxZjH1be6OjLRxqTdhIf5PNZ7A7FPFIaA7MFXUWgZfqo'
  },
  {
    id: 'Korean Minimal',
    label: 'Korean Minimal',
    description: 'Butter-yellow warmth, pleated lamps, sheer unbleached curtains, and low-profile wood tones.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI40o4A-oCZMzHF6OGTX054LMmHNvw1gAGeSsa8p0lLevUove2SdMGV-V4AI9zegz2wJPsANpV80rtuAaJ9XEOJMogDAk684CVVCifhgv3969Qybce4D9fJpDofp3W3VUgrJstY79KL29oNMjosbujuGZLMHdqNxfhyDygGsXVKxAiA8MNym0vrmnp_JXe-esRdmSXJtYNyb_tJ_v6K5XAJogv4Rxqn_1vsE-wLtQ'
  },
  {
    id: 'Modern Indian',
    label: 'Modern Indian',
    description: 'Hand block-printed cottons, raw cane headboards, warm brass accents, and terracotta flora.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0iXvqEEYE_f_jALHKG1pOYZ31OTnaobzJfTwa9SXnG1oK3K5kmmuP6_kiv3r5u2ZHWierduhy1SpSJposRf6HlcAn41-yNV_rgeCZlx-6G_5salnguNXgO2Hp7d0EssKs8g8rsgru_kuOz05JvrBqRfmL28l2OeOb09ibRxQ48xANbFAyw9RZdc-N_g7q0PhHgiCJedRPbaWHXxLBtmKrc3_az3_8oMLYJpIXdSk'
  },
  {
    id: 'Warm Neutral',
    label: 'Warm Neutral',
    description: 'Layered washed oatmeal linens, woven seagrass textures, and peaceful morning daylight.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC51v0o0jwTeZgT45a4WsmtHZNywf7THunMoxm-Cxjvnt19bxnIwdzjL5G0xfqRcsmtyyn7SGhx4B5TQGwwmWd8Tmaee4kINbFNl0xh9BmlI361jQjFwIXFhnXQhda9eUwpW4Fa9qkbJ_bYSOKd6I3-eV7MPqRhdNKRNiqCuogGminsPBZtHDUC_Rzf6mOuz0PfGZtXIRu4yo49SkYs_BE6tUyz7M3CjhzJDdEmXeQ'
  },
  {
    id: 'Cozy Bedroom',
    label: 'Cozy Bedroom',
    description: 'Ambient rice lights, bamboo accent lamps, plush textured pillows, and layered floor rugs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4_IAWjTGj1YnWCuSsLurvswcl7VeT7drq3GqmCOIy-Vb6wXPD_2_VJzOHnUplP681W-WP5U5-P_t20UnbCxsyPVIwUshUSbHOVPfcNy4Tq07UVYNYMMfjuBF4TM4nI9XI3nqlGqxkgzoKVAas4v37yMcCWAu3EKE11hrhCr013tH3h5I8MiDkS0Ww3AYraLD30kAaildBNFnPDWm-9fY4yOyS0_qhaIjdCNuX9nc'
  },
  {
    id: 'Dark Academia',
    label: 'Dark Academia',
    description: 'Walnut wood tones, architectural monographs, brass desk accessories, and shaded library sconces.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj9PTkSDDaX3MWSlR3rba0Hktg6U-0yJdhq1LaldgQQGlY4F2012Gyz19YdY25Q1VfR6-NB76QjQN-iKVfSZFcRaMNKutxajN9LnpyguJE36XX5ieppc59bie6EgyDELlAncNoqf2IylI5jpKFORXgl_h-SguYY3WCRpTsr0iJ2Vk-15vJdT4yrI9tNtnehGTsQTRxqWtzIEDqPY1wRQUU4jH-uJBci4lGn3OjyyQ'
  },
  {
    id: 'Small Space Living',
    label: 'Small Space Living',
    description: 'Vertical wall utilization, pegboard utility, floating storage, and multipurpose modular furniture.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiEMUhuuafp52zf0NgZA1hVvNsuw5zOafzzkKadgSZ_Vs7WefhNQbwBNoW2Q_zfNZZCNSdcCDvMhWbN7k_rcuYrnGJ8Hq6jAAHgKTc1oh8vgjaaPeh6kHWsrUyZP4PUyKHTvkcT4QHbMkSL1lDhivvBH3Nrf1oPrM1GAprNoybeXozx7leVYEpdxsl6kpnN7qE6EmWBhfB0_1oT36bzmWvttOe3r8if9RtCtPTv9U'
  },
  {
    id: 'Boho',
    label: 'Boho Sanctuary',
    description: 'Woven macrame details, terracotta planters, botanical greenery, and earthen clay accents.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7rN0keG35K2NFKkItnX0Wb6XZWh_rbX-xXSvzORvgb4bJ51qJyfxCkk2bnsNXdMy4vfLpCcAlm6wwebTFEfpqMl698UIyZPUCHeuZH0B_-YTymm2OtnGEZPxDY0VsdT_URG6ThyA5QY0eT2jqxmAyAPNacPM7DOJP2MIFC48iyd1FFneBEqMjntW9vVr6DLRlTWkiQM50lI83GrlPfEhjxccNcngNzANtBw5SKzs'
  },
  {
    id: 'Gaming Setup',
    label: 'Refined Battlestation',
    description: 'Ergonomic oak surfaces, mechanical desk elements, subtle 3000K bias backlight, and acoustic felt panels.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3Bo6Y3cmJYTQAlf6HboscKWcCurXM93SaV5SMfc_R3ZQW0Pm5CwjP95xCHQ1kRsc_uUoDDBHtXHeC_9P4uo5Mo490tkxtWQbaYWbQn9dOM1P6wcA62rUFC8Xqw1TkEqLae6rQOUEYkapsm1ZZaa4eE9VBgKu9rbuU9aOoT5Ncj-lorExV8XCXZ8uW5OkncvTd3BYundWyn-ETwJ8M_bEJgdhPJ6oBEqXI912ul-8'
  },
];

export const SPACE_TYPES: SpaceType[] = [
  'Bedroom',
  'PG Room',
  'Hostel Nook',
  'Study Alcove',
  'Rental Living',
  'Studio Apartment',
];
