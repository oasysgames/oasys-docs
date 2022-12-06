import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'White Paper',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    linkTo: "/docs/whitepaper/intro",
    description: (
      <>
        Oasys is an EVM-Compatible protocol that adopts the Oasys Architecture. 
      </>
    ),
  },
  {
    title: 'Quick Start',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    linkTo: "/docs/quick-start/setup-metamask/1-1-how-to-setup",
    description: (
      <>
        Quick Start for users.
      </>
    ),
  },
  {
    title: 'Technical Documentation',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    linkTo: "/docs/documentation/whats-oasys/1-1-whats-oasys",
    description: (
      <>
        Documentation for dApps Developers.
      </>
    ),
  },
];

function Feature({Svg, linkTo, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <Link className={styles.topPageLink} to={linkTo}>
        <div className="text--center">
          {/* <Svg className={styles.featureSvg} role="img" /> */}
        </div>
        <div className="text--center padding-horiz--sm">
          <h2 className={styles.largeText}>{title}</h2>
          <p className={styles.smallText} >{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
