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
    title: 'Technical Materials',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    linkTo: "/docs/techdocs/technical-materials/1-1",
    description: (
      <>
        Guides on how to build nodes and run networks.
      </>
    ),
  },
  // {
  //   title: 'Powered by React',
  //   Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
  //   description: (
  //     <>
  //       Extend or customize your website layout by reusing React. Docusaurus can
  //       be extended while reusing the same header and footer.
  //     </>
  //   ),
  // },
];

function Feature({Svg, linkTo, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <Link className={styles.topPageLink} to={linkTo}>
        <div className="text--center">
          {/* <Svg className={styles.featureSvg} role="img" /> */}
        </div>
        <div className="text--center padding-horiz--lg">
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
