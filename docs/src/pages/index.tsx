import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className="hero__title">
            Adaptly, The AI-Adaptive UI Library for React and Next.js
          </Heading>
          <p
            className="hero__subtitle"
            style={{
              fontSize: "1.1rem",
              padding: "0 50px",
              marginBottom: "40px",
            }}
          >
            Create intelligent interfaces that adapt to user needs through
            natural language. No complex configuration—just describe what you
            want and watch your UI transform.
          </p>
          <div className={styles.heroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/quick-start"
            >
              Get Started in 5 Minutes
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>5min</div>
              <div className={styles.statLabel}>Quick Setup</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>∞</div>
              <div className={styles.statLabel}>Possibilities</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>⌘K</div>
              <div className={styles.statLabel}>Natural Commands</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Type Safe</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.sectionHeader}>
              <h2>Why developers choose Adaptly</h2>
              <p>
                The only UI library that understands natural language and adapts
                to your needs
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col--4">
            <div className={styles.featureCard}>
              <h3>AI-Powered Intelligence</h3>
              <p>
                Describe your UI in plain English and watch it transform
                instantly. Works with Google Gemini, OpenAI GPT, and Anthropic
                Claude for maximum flexibility.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featureCard}>
              <h3>Developer-First Design</h3>
              <p>
                Built for modern React developers with full TypeScript support,
                IntelliSense, and seamless Next.js integration. No learning
                curve.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featureCard}>
              <h3>Persistent & Reliable</h3>
              <p>
                Your UI adaptations are automatically saved and restored. Never
                lose your custom layouts with intelligent state management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeExample() {
  return (
    <section className={styles.codeSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.sectionHeader}>
              <h2>How it works</h2>
              <p>Three simple steps to intelligent, adaptive UIs</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeTitle}>1. Define Components</span>
                <span className={styles.codeLanguage}>adaptly.json</span>
              </div>
              <pre>
                <code>{`{
  "components": {
    "MetricCard": {
      "description": "Display key performance indicators",
      "props": {
        "title": { "type": "string", "required": true },
        "value": { "type": "string", "required": true }
      },
      "useCases": ["revenue tracking", "user metrics"],
      "space": { "min": [2, 1], "max": [3, 2], "preferred": [2, 1] }
    }
  }
}`}</code>
              </pre>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeTitle}>
                  2. Use Natural Language
                </span>
                <span className={styles.codeLanguage}>Command</span>
              </div>
              <div className={styles.commandExample}>
                <div className={styles.commandBar}>
                  <span className={styles.commandPrompt}>⌘K</span>
                  <span className={styles.commandText}>
                    Create a sales dashboard with revenue metrics
                  </span>
                </div>
                <div className={styles.commandResult}>
                  <div className={styles.resultIcon}>✨</div>
                  <div className={styles.resultText}>
                    <strong>AI generates MetricCard components</strong>
                    <span>with realistic data and optimal layout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DocumentationSection() {
  return (
    <section className={styles.documentationSection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.sectionHeader}>
              <h2>Documentation</h2>
              <p>Everything you need to build with Adaptly</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <div className={styles.docCard}>
              <div className={styles.docHeader}>
                <h3>👶 Getting Started</h3>
                <p>New to Adaptly? Start here</p>
              </div>
              <div className={styles.docLinks}>
                <Link to="/docs/quick-start" className={styles.docLink}>
                  <span className={styles.docLinkTitle}>Quick Start Guide</span>
                  <span className={styles.docLinkDesc}>
                    Get running in 5 minutes
                  </span>
                </Link>
                <Link to="/docs/component-registry" className={styles.docLink}>
                  <span className={styles.docLinkTitle}>
                    Component Registry
                  </span>
                  <span className={styles.docLinkDesc}>
                    Configure your components
                  </span>
                </Link>
                <Link to="/docs/llm-providers" className={styles.docLink}>
                  <span className={styles.docLinkTitle}>LLM Providers</span>
                  <span className={styles.docLinkDesc}>
                    Set up AI providers
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={styles.docCard}>
              <div className={styles.docHeader}>
                <h3>🚀 Advanced</h3>
                <p>Power user features</p>
              </div>
              <div className={styles.docLinks}>
                <Link to="/docs/advanced-features" className={styles.docLink}>
                  <span className={styles.docLinkTitle}>Advanced Features</span>
                  <span className={styles.docLinkDesc}>
                    Custom loaders, validation
                  </span>
                </Link>
                <Link to="/docs/storage-service" className={styles.docLink}>
                  <span className={styles.docLinkTitle}>Storage Service</span>
                  <span className={styles.docLinkDesc}>
                    Persistent state management
                  </span>
                </Link>
                <Link to="/docs/api/core-components" className={styles.docLink}>
                  <span className={styles.docLinkTitle}>API Reference</span>
                  <span className={styles.docLinkDesc}>
                    Complete documentation
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.communitySection}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className={styles.sectionHeader}>
              <h2>Community & Support</h2>
              <p>Get help, share ideas, and stay updated</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col col--3">
            <Link
              to="https://github.com/gauravfs-14/adaptly/issues"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityCard}
            >
              <h3>Issues</h3>
              <p>Report bugs and request features</p>
            </Link>
          </div>
          <div className="col col--3">
            <Link
              to="https://github.com/gauravfs-14/adaptly/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityCard}
            >
              <h3>Discussions</h3>
              <p>Ask questions and share ideas</p>
            </Link>
          </div>
          <div className="col col--3">
            <Link
              to="https://www.npmjs.com/package/adaptly"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.communityCard}
            >
              <h3>NPM</h3>
              <p>Install from npm</p>
            </Link>
          </div>
          <div className="col col--3">
            <Link to="/docs/changelog" className={styles.communityCard}>
              <h3>Changelog</h3>
              <p>See what's new</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - AI-Adaptive UI Library`}
      description="Build intelligent, adaptive UIs with natural language. AI-powered component selection and layout generation for React and Next.js applications."
    >
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <CodeExample />
        <DocumentationSection />
        <CommunitySection />
      </main>
    </Layout>
  );
}
