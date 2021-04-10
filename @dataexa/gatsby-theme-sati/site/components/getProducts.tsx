import React from 'react';

import {
  AreaChartOutlined,
  DingdingOutlined,
  GithubOutlined,
  HistoryOutlined,
  HomeOutlined,
  PieChartOutlined,
  ReadOutlined,
  YuqueOutlined,
} from '@ant-design/icons';

import { getChinaMirrorHost } from '../utils';

const tuple = <T extends string[]>(...args: T) => args;
const Categories = tuple('basic', 'extension', 'ecology');

export interface ProductItem {
  title: string;
  icon?: React.ReactNode;
  slogan?: string;
  description: string;
  category: typeof Categories[number];
  links?: Array<{
    icon?: React.ReactNode;
    title: React.ReactNode;
    url?: string;
    openExternal?: boolean;
  }>;
}

const ANTV_DOMAIN = 'antv.vision';

export type ValuesOf<T extends any[]> = T[number];

export const getProducts = ({
  t,
  language,
  isChinaMirrorHost = false,
}: {
  t: (key: string) => string;
  language: string;
  rootDomain?: string;
  isChinaMirrorHost?: boolean;
}): ProductItem[] => {
  const hosts: { [name: string]: string } = {};
  [
    'g2',
    'g2plot',
    'g6',
    'l7',
    'f2',
    'f2native',
    'graphin',
    'g',
    'x6',
    'ava',
  ].forEach((name: string) => {
    hosts[name] = isChinaMirrorHost
      ? getChinaMirrorHost(`${name}.${ANTV_DOMAIN}`)
      : `${name}.${ANTV_DOMAIN}`;
  });
  const products: any[] = [];

  return products;
};
