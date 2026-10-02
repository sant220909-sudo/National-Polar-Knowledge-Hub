import React from 'react';
import { ContentStatus } from '../../types';

interface StatusBadgeProps {
  status: ContentStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true
}) => {
  const configs: Record<ContentStatus, { label: string; dot: string; text: string }> = {
    PUBLISHED: {
      label: 'Published',
      dot: 'bg-emerald-500',
      text: 'text-emerald-800 bg-emerald-50/80 border-emerald-200/70',
    },
    APPROVED: {
      label: 'Approved',
      dot: 'bg-teal-500',
      text: 'text-teal-800 bg-teal-50/80 border-teal-200/70',
    },
    READY_TO_PUBLISH: {
      label: 'Ready to Publish',
      dot: 'bg-indigo-500',
      text: 'text-indigo-800 bg-indigo-50 border-indigo-200 font-semibold',
    },
    REQUIRES_REAPPROVAL: {
      label: 'Requires Re-approval',
      dot: 'bg-amber-600',
      text: 'text-amber-900 bg-amber-100 border-amber-300 font-semibold',
    },
    UNDER_REVIEW: {
      label: 'Under Review',
      dot: 'bg-amber-500',
      text: 'text-amber-800 bg-amber-50/80 border-amber-200/70',
    },
    NEEDS_CHANGES: {
      label: 'Needs Changes',
      dot: 'bg-rose-500',
      text: 'text-rose-800 bg-rose-50/80 border-rose-200/70',
    },
    READY_FOR_EDITING: {
      label: 'Ready for Editing',
      dot: 'bg-sky-500',
      text: 'text-sky-800 bg-sky-50/80 border-sky-200/70',
    },
    AI_PROCESSING: {
      label: 'AI Processing',
      dot: 'bg-purple-500 animate-pulse',
      text: 'text-purple-800 bg-purple-50/80 border-purple-200/70',
    },
    DRAFT: {
      label: 'Draft',
      dot: 'bg-slate-400',
      text: 'text-slate-700 bg-slate-100 border-slate-200',
    },
    UNPUBLISHED: {
      label: 'Unpublished',
      dot: 'bg-zinc-400',
      text: 'text-zinc-700 bg-zinc-100 border-zinc-200',
    },
    REJECTED: {
      label: 'Rejected',
      dot: 'bg-rose-600',
      text: 'text-rose-900 bg-rose-100/80 border-rose-300',
    },
  };

  const current = configs[status] || configs.DRAFT;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-xs font-semibold px-3 py-1 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${current.text} ${sizeClasses}`}
    >
      {showIcon && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dot}`} aria-hidden="true" />}
      <span>{current.label}</span>
    </span>
  );
};
