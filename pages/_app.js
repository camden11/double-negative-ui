import App from "next/app";
import React from "react";
import { PageTransition } from "next-page-transitions";
import { initGA, logPageView } from "../utils/analytics";
import Nav from "../components/nav";
import Footer from "../components/footer";
import GlobalStyle from "../style/global";

const AnimateMobile = ({ children }) => {
  return <div className="transition-fade-enter-done">{children}</div>;
};

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
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
    const { Component, pageProps, router } = this.props;
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
      <>
        <GlobalStyle />
        <div className="container">
          <Nav />
          <div className="main-content">
            <OptionalTransition {...transitionProps}>
              <Component {...pageProps} key={router.route} />
            </OptionalTransition>
          </div>
          <Footer />
        </div>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 200ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 200ms;
          }
          .container {
            padding-top: 20px;
            width: 90%;
            max-width: 1100px;
            margin: 0 auto;
          }

          .main-content {
            margin-top: 70px;
          }

          @media (max-width: 992px) {
            .container {
              width: 85%;
            }
          }
        `}</style>
      </>
    );
  }
}
