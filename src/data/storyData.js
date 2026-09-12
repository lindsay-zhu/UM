import charactersArt from '../assets/characters.png';
import company from '../assets/company.png';
import office from '../assets/office.png';
import ceoOffice from '../assets/ceo-office.png';

export const assets = { charactersArt, company, office, ceoOffice };
export const characters = [
  { id: 'ceo', name: 'CEO', actor: 'Chen Peilin', role: 'The boss and the real power in this family business', gender: 'female', index: 0 },
  { id: 'frank', name: 'CFO — Frank', actor: 'Chen Fengyu', role: 'The person who designs the new performance review plan', gender: 'male', index: 1, background: 'Fun fact: Frank and the CEO are both named Chen, but they’re not actually related.' },
  { id: 'manager', name: 'Manager', actor: 'Liu Kexin', role: 'Runs one of the company’s departments', gender: 'female', index: 2 },
];
export const story = {
  title: 'WELCOME TO THE COMPANY', subtitle: 'THE CASE OF THE PERFORMANCE APPRAISAL',
  welcome: 'You are now a member of the Executive Committee.', tagline: 'A corporate ethics simulation.',
  hook: 'What is your first reaction to employees marked N/A?',
  company: ['A mid-sized, family-run contracting company.', 'Doing reasonably well.', 'Facing rapid changes in its business.'],
  status: [['Ownership', 'Family-run'], ['Performance', 'Stable'], ['Business Pressure', 'Increasing']],
  objective: 'Understand the company before making decisions',
  conversation: [
    { speaker: 'ceo', text: 'Frank, I need your help reducing staff in a way we can defend as fair and ethical.' },
    { speaker: 'frank', text: 'I’d rank employees by the average of their last three annual performance reviews.' },
  ],
  rules: ['Average of last 3 reviews', 'Rank within each department', 'Special cases reviewed separately', 'Executive Committee sets the cutoff'],
  firstDecision: { title: 'DECISION 01', question: 'Is it fair to lay people off based on performance rankings?', options: ['Fair', 'Not fair', 'Neither / Neutral'] },
  missingAlert: '3 veteran employees have no formal performance score.',
  manager: 'These employees have been here almost since the company was founded. They were allowed to keep receiving informal reviews.',
  mood: 'Very Confused', moodStatus: 'Confusing Conversation',
  frankQuestion: 'How can we justify putting them at the bottom?',
  ceoResponses: ['They’re close to retirement.', 'Their performance isn’t what it used to be.', 'They’re highly paid.', 'Letting them go could save younger employees’ jobs.', 'Everyone thinks you’re a great fit here.'],
  finalDecision: { title: 'FINAL DECISION', question: 'If you were Frank, what would you do?', options: ['Say no and insist on a fair ranking', 'Agree with the CEO', 'Other'] },
  easterEgg: { text: 'D. Refuse the CEO — and kill her.', requirement: '[Psychopathy 5 Required]', locked: 'Psychopathy level too low.' },
  values: ['FAIRNESS', 'LOYALTY', 'SELF-PRESERVATION'], dilemma: 'What should Frank sacrifice first?',
};
// Transcribed from the embedded appraisal table on PowerPoint slide 6.
export const employees = [ ['Emily Wong',91], ['Jason Lee',88], ['Sarah Chan',86], ['Michael Ho',82], ['Ivy Lau',79], ['Robert Chen',null], ['Susan Lam',null], ['James Wu',null] ];
// The source deck has no personal team photographs, four unnamed presenters,
// and no contributions. Fill these slots with supplied information when ready.
// Portrait may be an imported local asset. Blank values remain explicitly unassigned.
export const team = [
  { name: '', role: 'Narrator', contribution: '', portrait: null },
  { name: '', role: 'Interaction host 1', contribution: '', portrait: null },
  { name: '', role: 'Interaction host 2', contribution: '', portrait: null },
  { name: '', role: 'Interaction host 3', contribution: '', portrait: null },
  { name: 'Chen Peilin', role: 'CEO', contribution: '', portrait: null },
  { name: 'Chen Fengyu', role: 'CFO — Frank', contribution: '', portrait: null },
  { name: 'Liu Kexin', role: 'Manager', contribution: '', portrait: null },
];
export const sceneNames = ['Main menu', 'First impressions', 'Meet the characters', 'Enter the company', 'Private conversation', 'Decision 01', 'N/A detected', 'The CEO’s office', 'Final decision', 'The real dilemma', 'Development team', 'Division of labor', 'Thank you'];

import negativePlumbob from '../assets/negative-plumbob.png';
import relationshipLoss from '../assets/relationship-loss.png';
assets.negativePlumbob = negativePlumbob; assets.relationshipLoss = relationshipLoss;

import frankStatusHud from '../assets/frank-status-hud.png';
import thoughtCompany from '../assets/thought-company.png';
import thoughtKnife from '../assets/thought-knife.png';
assets.frankStatusHud = frankStatusHud; assets.thoughtCompany = thoughtCompany; assets.thoughtKnife = thoughtKnife;
