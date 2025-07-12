// import { CodeIssue, SeverityBreakdown, SeverityColor } from '../types';

import type { CodeIssue, SeverityBreakdown, SeverityColor } from "../types";

export const getSeverityColor = (severity?: string): SeverityColor => {
  switch ((severity || '').toLowerCase()) {
    case 'critical': return 'red';
    case 'warning': return 'orange';
    case 'info': return 'blue';
    default: return 'gray';
  }
};

export const getSeverityBreakdown = (issues: CodeIssue[]): SeverityBreakdown => {
  const counts: SeverityBreakdown = { Critical: 0, Warning: 0, Info: 0 };
  issues.forEach((issue) => {
    const sev = (issue.severity || 'info').toLowerCase();
    if (sev === 'critical') counts.Critical++;
    else if (sev === 'warning') counts.Warning++;
    else counts.Info++;
  });
  return counts;
};
