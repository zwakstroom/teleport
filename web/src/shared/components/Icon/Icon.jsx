import React from 'react';
import './../../assets/icomoon/style.css';

function makeFontIcon(kind, displayName) {
  const Icon = function(){
    return <span className={`icon icon-${kind}`} />
  }

  Icon.displayName = `Icon.${displayName}`;

  return Icon;
}

export const Microsoft = makeFontIcon('windows', 'Microsoft')

export const Google = makeFontIcon('google-plus2', 'Google');

export const Github = makeFontIcon('github', 'Github');