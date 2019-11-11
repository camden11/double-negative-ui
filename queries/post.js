const postQuery = `{
  post {
    ...postFields
    author {
      name
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
