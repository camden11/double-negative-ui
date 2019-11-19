const allPostsQuery = `{
  post {
    title
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
}`;

export default allPostsQuery;
