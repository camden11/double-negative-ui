import fetch from "isomorphic-unfetch";
import constants from "../constants";

class Strapi {
  static async fetch(path) {
    const response = await fetch(path, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`
      }
    });
    const data = await response.json();
    return data;
  }

  static formatParams(params) {
    if (!params) {
      return "";
    }

    const { sort, filters, start, limit } = params;
    const paramArray = [];
    if (sort) {
      paramArray.push(`_sort=${sort.field}:${sort.order}`);
    }

    if (filters && filters.length > 0) {
      filters.forEach(filter =>
        paramArray.push(`${filter.field}_in=${filter.value}`)
      );
    }

    if (start) {
      paramArray.push(`_start=${start}`);
    }

    if (limit) {
      paramArray.push(`_limit=${limit}`);
    }
    const paramString = paramArray.join("&");
    return `?${paramString}`;
  }

  static async getEntry(contentType, slug) {
    return this.fetch(`${process.env.STRAPI_URL}/${contentType}?slug=${slug}`);
  }

  static async getEntries(contentType, params) {
    const paramString = this.formatParams(params);
    return this.fetch(`${process.env.STRAPI_URL}/${contentType}${paramString}`);
  }

  static async getEntryCount(contentType, params) {
    const paramString = this.formatParams({
      ...params,
      start: null,
      limit: null
    });
    return this.fetch(
      `${process.env.STRAPI_URL}/${contentType}/count${paramString}`
    );
  }
}

export default Strapi;
