import { Container } from '@/components/ui/Container';
import { SKILLS_PAGE_DATA } from '@/data/portfolio';
import styles from './SkillsManifest.module.css';

interface SkillsManifestProps {
  embedded?: boolean;
}

/**
 * Shared categorized technical skills view rendered both on /skills and inside the RISHI OS Skills application.
 */
export function SkillsManifest({ embedded = false }: SkillsManifestProps) {
  const { eyebrow, pathLabel, heading, subtitle, categories } = SKILLS_PAGE_DATA;
  const PageHeadingTag = embedded ? 'h2' : 'h1';
  const CategoryHeadingTag = embedded ? 'h3' : 'h2';

  const headerContent = (
    <div className={styles.headerBlock}>
      <div className={styles.eyebrowRow}>
        <span>{eyebrow}</span>
        <span className={styles.linuxDot} aria-hidden="true" />
        <span>{pathLabel}</span>
      </div>

      <PageHeadingTag
        id={embedded ? undefined : 'skills-page-heading'}
        className={styles.pageTitle}
      >
        {heading}
      </PageHeadingTag>

      <p className={styles.pageSubtitle}>{subtitle}</p>
    </div>
  );

  const categoriesGrid = (
    <div className={styles.categoriesGrid}>
      {categories.map((category) => (
        <section
          key={category.index}
          className={styles.categoryCard}
          aria-labelledby={`skills-cat-${category.index}`}
        >
          <div className={styles.categoryHeader}>
            <div className={styles.categoryTitleWrap}>
              <span className={styles.cardIndex}>[{category.index}]</span>
              <CategoryHeadingTag
                id={`skills-cat-${category.index}`}
                className={styles.domainTitle}
              >
                {category.title}
              </CategoryHeadingTag>
            </div>
            <span className={styles.itemCount}>{category.items.length}</span>
          </div>

          <ul className={styles.skillList} aria-label={category.title}>
            {category.items.map((skill) => (
              <li key={skill.name} className={styles.skillRow}>
                <span className={styles.skillName}>{skill.name}</span>
                <span
                  className={
                    skill.tone === 'learning'
                      ? `${styles.contextPill} ${styles.contextPillLearning}`
                      : styles.contextPill
                  }
                >
                  {skill.context}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );

  if (embedded) {
    return (
      <div className={styles.embeddedWrap}>
        <header>{headerContent}</header>
        {categoriesGrid}
      </div>
    );
  }

  return (
    <>
      <section className={styles.pageHeader} aria-labelledby="skills-page-heading">
        <Container>{headerContent}</Container>
      </section>

      <section className={styles.pageMain} aria-label="Technical skill categories">
        <Container>{categoriesGrid}</Container>
      </section>
    </>
  );
}
