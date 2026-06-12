import React from 'react';
import { Icon } from '../core/Icon';
import { Button } from '../core/Button';

export function EmptyState({ icon = 'package-open', title, description, actionLabel, onAction, error = false, className }) {
  return (
    <div className={['da-empty', className || ''].filter(Boolean).join(' ')}>
      <span className={error ? 'da-empty__icon da-empty__icon--error' : 'da-empty__icon'}>
        <Icon name={error ? 'circle-alert' : icon} size={26} strokeWidth={1.6} />
      </span>
      <p className="da-empty__title">{title}</p>
      {description ? <p className="da-empty__desc">{description}</p> : null}
      {actionLabel ? (
        <Button variant={error ? 'outline' : 'primary'} size="sm" icon={error ? 'refresh-cw' : 'plus'} onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
