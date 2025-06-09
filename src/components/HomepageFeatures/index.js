import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'For Users',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    linkTo: "/docs/staking/stake-oasys/1-1-stake",
    description: (
      <>
        Users can stake OAS with Metamask.
      </>
    ),
  },
  {
    title: 'For VerseBuilder / GameDeveloper',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    linkTo: "/docs/verse-developer/intro",
    description: (
      <>
        Documentation for Developers to build on the Verse Layer.
      </>
    ),
  },
  {
    title: 'For Validators',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    linkTo: "/docs/hub-validator/operate-validator/hd-requirement",
    description: (
      <>
        Documentation for Oasys Hub Layer Validators.
      </>
    ),
  },
  {
    title: 'Architecture',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    linkTo: "/docs/architecture/overview/oasys-architecture/ecosystem-architecture",
    description: (
      <>
        Oasys Architecture. 
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
