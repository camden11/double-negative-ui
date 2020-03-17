import App from "next/app";
import React from "react";
import { PageTransition } from "next-page-transitions";
import { get } from "lodash";
import Prismic from "prismic-javascript";
import { parseCookies } from "nookies";
import PrismicClient from "../transport/prismic";
import { initGA, logPageView } from "../utils/analytics";
import Nav from "../components/nav";
import Footer from "../components/footer";
import Announcement from "../components/announcement";
import GlobalStyle from "../style/global";

const AnimateMobile = ({ children }) => {
  return <div className="transition-fade-enter-done">{children}</div>;
};

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { navAnimating: false };
  }

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
    this.disableTransitions = "ontouchstart" in document.documentElement;
  }

  render() {
    const { Component, pageProps, router, globalData, cookies } = this.props;
    const {
      announcement_title,
      announcement_text,
      show_announcement
    } = globalData;
    const { navAnimating } = this.state;
    const OptionalTransition = this.disableTransitions
      ? AnimateMobile
      : PageTransition;
    const transitionProps = this.disableTransitions
      ? {}
      : {
          timeout: 200,
          classNames: "page-transition",
          monkeyPatchScrolling: true
        };
    return (
      <div className="site-wrapper">
        <GlobalStyle />
        <Nav
          setAnimating={animating => this.setState({ navAnimating: animating })}
        />
        <div
          className={`main-content ${navAnimating ? "" : "allow-transition"}`}
        >
          <OptionalTransition {...transitionProps}>
            <Component {...pageProps} key={router.route} />
          </OptionalTransition>
        </div>
        {show_announcement && (
          <Announcement
            title={announcement_title}
            text={announcement_text}
            cookies={cookies}
          />
        )}
        <Footer />
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .allow-transition .page-transition-enter-active {
            opacity: 1;
            transition: opacity 200ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 0ms;
          }
          .allow-transition .page-transition-exit-active {
            opacity: 0;
            transition: opacity 200ms;
          }

          .main-content {
            padding-top: 80px;
          }
        `}</style>
      </div>
    );
  }
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const cookies = parseCookies(ctx);
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const globalData = await PrismicClient.query(
    Prismic.Predicates.at("document.type", "global_settings")
  );

  return { pageProps, globalData: get(globalData, "results[0].data"), cookies };
};
