const homePageQuery = `{
  home_page {
    featured_post {
      title
      blurb
      feature_image
      authors {
        author {
          name
        }
      }
      categories {
        category {
          name
          uid
        }
      }
      genres {
        genre {
          name
          uid
        }
      }
      legacy_publish_date
    }
  }
}`;

export default homePageQuery;
