import React from 'react';
import './../../assets/icomoon/style.css';

const fontIconClasses = {
  "Cluster": 'icon-site-map',
  "Ellipsis": 'icon-ellipsis',
  "Windows": 'icon-windows',
  "Github": 'icon-github',
  "Google": 'icon-google-plus2',
  "SortDesc": 'icon-chevron-down',
  "SortAsc": 'icon-chevron-up',
  "Sort": 'icon-chevrons-expand-vertical',
}

function makeFontIcon(kind) {
  const className = fontIconClasses[kind];
  const Icon = function(){
    return <span className={`icon ${className}`} />
  }

  Icon.displayName = `Icon.${kind}`;

  return Icon;
}

export const Cluster = makeFontIcon('Cluster');

export const Ellipsis = makeFontIcon('Ellipsis');

export const Microsoft = makeFontIcon('Windows');

export const Google = makeFontIcon('Google');

export const Github = makeFontIcon('Github');

export const SortDesc = makeFontIcon('SortDesc');

export const SortAsc = makeFontIcon('SortAsc');

export const Sort = makeFontIcon('Sort');