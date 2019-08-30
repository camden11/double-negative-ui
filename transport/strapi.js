import fetch from "isomorphic-unfetch";

class Strapi {
  static formatParams(params) {
    if (!params) {
      return "";
    }
    const { sort, filters } = params;
    const sortString = sort ? `_sort=${sort.field}:${sort.order}` : "";
    let filterString;
    if (filters && filters.length > 0) {
      filterString = filters
        .map(filter => `${filter.field}_in=${filter.value}`)
        .join("&");
    } else {
      filterString = "";
    }

    const connector =
      sortString.length > 0 && filterString.length > 0 ? "&" : "";
    const paramString = `?${sortString}${connector}${filterString}`;
    return paramString;
  }

  static async getEntry(contentType, slug) {
    const response = await fetch(
      `${process.env.STRAPI_URL}/${contentType}?slug=${slug}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
        }
      }
    );
    const data = await response.json();
    return data;
  }

  static async getEntries(contentType, params) {
    const paramString = this.formatParams(params);
    const response = await fetch(
      `${process.env.STRAPI_URL}/${contentType}${paramString}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
        }
      }
    );
    const data = await response.json();
    return data;
  }
}

export default Strapi;
