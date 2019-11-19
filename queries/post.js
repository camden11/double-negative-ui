const postQuery = `{
  post {
    ...postFields
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
    gallery {
      photo
    }
  }
}`;

export default postQuery;
