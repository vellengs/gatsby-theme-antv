import React, { useState, useEffect } from 'react';
import { withPrefix } from 'gatsby';
import { default as RCFooter, FooterProps as RcFooterProps } from 'rc-footer';
import { useTranslation } from 'react-i18next';
import {
  GithubOutlined,
  WeiboOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';
import omit from 'omit.js';
import { getProducts } from './getProducts';
import { useChinaMirrorHost } from '../hooks';
import styles from './Footer.module.less';
import 'rc-footer/assets/index.less';

interface FooterProps extends RcFooterProps {
  rootDomain?: string;
  language?: string;
  githubUrl?: string;
  location: Location;
}

const Footer: React.FC<FooterProps> = ({
  columns,
  bottom,
  theme = 'dark',
  language,
  rootDomain = '',
  location,
  ...restProps
}) => {
  const [withMenu, setWithMenu] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const lang = language || i18n.language;
  const [isChinaMirrorHost] = useChinaMirrorHost();
  const products = getProducts({
    t,
    language: lang,
    rootDomain,
    isChinaMirrorHost,
  });

  const defaultColumns = products
    .filter((product) => product.category !== 'ecology')
    .map((product) => ({
      title: (
        <span>
          {product.title}
          <span className={styles.description}>{product.slogan}</span>
        </span>
      ),
      items: product.links,
    }));

  useEffect(() => {
    // 有 menu 的模版 footer 表现不同，通过 location 判断加载的模版
    const pathPrefix = withPrefix('/').replace(/\/$/, '');
    const path = location.pathname.replace(pathPrefix, '');
    const isExamplePage =
      path.startsWith(`/zh/examples`) || path.startsWith(`/en/examples`);
    const isDocsPage =
      path.startsWith(`/zh/docs`) || path.startsWith(`/en/docs`);
    // examples 页面里目前只有 gallery 是有 footer 的，
    // 且 gallery 会出现 `location.key = 'initial'` 逻辑，所以先统一处理为需要 menu
    if (isExamplePage) {
      setWithMenu(true);
    } else if (isDocsPage) {
      // 文档页为 404 时 footer 没有 menu
      setWithMenu(!((location as any).key === 'initial'));
    } else {
      setWithMenu(false);
    }
  }, [location]);

  const getColums = () => {
    if (products.length % 2 !== 0) {
      return [...defaultColumns];
    }
    return [...defaultColumns];
  };

  return (
    <RCFooter
      maxColumnsPerRow={5}
      theme={theme}
      columns={columns || getColums()}
      className={classnames(styles.footer, {
        [styles.withMenu]: withMenu,
      })}
      bottom={bottom}
      // {...omit(restProps, ['githubUrl'])}
    />
  );
};

export default Footer;
