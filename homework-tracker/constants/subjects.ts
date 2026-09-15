export const SUBJECTS = [
  'General Science',
  'Biology',
  'General Math',
  'PagKas',
  'Mabisang Komunikasyon',
  'Effective Communication',
  'Life and Career',
] as const;

export type Subject = typeof SUBJECTS[number];
