import type { CodeIssue } from '../types'

export const getHighlightedLines = (issues: CodeIssue[]): number[] => {
  if (issues.length && issues[0].line) {
    return issues.map((issue) => issue.line!).filter(Boolean);
  }
  return [];
};

export const getExplanationForLine = (issues: CodeIssue[], line: number): string => {
  const found = issues.find((issue) => issue.line === line);
  return found ? found.explanation : '';
};

export const getIssueForLine = (issues: CodeIssue[], line: number): CodeIssue | undefined => {
  return issues.find((issue) => issue.line === line);
};