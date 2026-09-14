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
  finalOutcomes: [
    {
      title: 'YOU CHOSE: PROCEDURAL FAIRNESS',
      action: 'Frank refuses to rank the N/A employees at the bottom without comparable evidence.',
      protects: ['Fairness', 'Evidence', 'Consistency'],
      risks: ['Conflict with the CEO', 'Career pressure', 'Delayed action'],
      reflection: 'How much personal risk should a manager accept to defend a fair process?',
    },
    {
      title: 'YOU CHOSE: LOYALTY & EFFICIENCY',
      action: 'Frank accepts the CEO’s reasoning and allows the downsizing process to continue.',
      protects: ['Speed', 'Cost control', 'Organizational loyalty'],
      risks: ['Procedural fairness', 'Employee trust', 'Decision legitimacy'],
      reflection: 'Can an efficient decision still be ethical if the process is not equally fair?',
    },
    {
      title: 'YOU CHOSE: SEEK AN ALTERNATIVE',
      action: 'Frank pauses the decision and proposes another way forward before ranking the N/A employees.',
      directions: ['Reconstruct performance evidence', 'Independent review', 'Voluntary separation', 'Alternative cost reductions'],
      protects: ['Flexibility', 'Fairness', 'Multiple stakeholder interests'],
      risks: ['Delay', 'Ambiguity', 'Leadership resistance'],
      reflection: 'What would make an alternative both ethical and practical?',
    },
  ],
  easterEgg: { text: 'D. Refuse the CEO — and kill her.', requirement: '[Psychopathy 5 Required]', locked: 'Psychopathy level too low.' },
  values: ['FAIRNESS', 'LOYALTY', 'SELF-PRESERVATION'], dilemma: 'What should Frank sacrifice first?',
};
// Transcribed from the embedded appraisal table on PowerPoint slide 6.
export const employees = [ ['Emily Wong',91], ['Jason Lee',88], ['Sarah Chan',86], ['Michael Ho',82], ['Ivy Lau',79], ['Robert Chen',null], ['Susan Lam',null], ['James Wu',null] ];
export const team = [
  { name: 'Chen Peilin', chineseName: '陈沛霖', studentId: 'MC536871', role: 'CEO', portraitId: 'ceo', roleTone: 'purple' },
  { name: 'Chen Fengyu', chineseName: '陈凤雨', studentId: 'MC632333', role: 'CFO — Frank', portraitId: 'frank', roleTone: 'blue' },
  { name: 'Liu Kexin', chineseName: '刘珂欣', studentId: 'MC653938', role: 'Manager', portraitId: 'manager', roleTone: 'green' },
  { name: 'Zou Kexin', chineseName: '邹可心', studentId: 'MC635433', role: 'Narrator', portraitId: null, roleTone: 'violet' },
  { name: 'Zhu Wenjing', chineseName: '朱雯菁', studentId: 'MC646342', role: 'Interaction Host 1', portraitId: null, roleTone: 'cyan' },
  { name: 'Xiao Rong', chineseName: '肖容', studentId: 'MC64887', role: 'Interaction Host 2', portraitId: null, roleTone: 'teal' },
  { name: 'Song Jinling', chineseName: '宋金玲', studentId: 'MC648261', role: 'Interaction Host 3', portraitId: null, roleTone: 'aqua' },
];
export const sceneNames = ['Main menu', 'First impressions', 'Meet the characters', 'Enter the company', 'Private conversation', 'Decision 01', 'N/A detected', 'The CEO’s office', 'Final decision', 'The real dilemma', 'Development team', 'Thank you'];

import negativePlumbob from '../assets/negative-plumbob.png';
import relationshipLoss from '../assets/relationship-loss.png';
assets.negativePlumbob = negativePlumbob; assets.relationshipLoss = relationshipLoss;

import frankStatusHud from '../assets/frank-status-hud.png';
import thoughtCompany from '../assets/thought-company.png';
import thoughtKnife from '../assets/thought-knife.png';
assets.frankStatusHud = frankStatusHud; assets.thoughtCompany = thoughtCompany; assets.thoughtKnife = thoughtKnife;
