/**ROUTERS **/
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';

/**
 * Router Helper
 */
export const routeHelper = {
  /**
   * Update path with parameters or query
   * @param {String} path
   * @param {Objects} params
   * @param {Objects} query
   * @param {String} host
   * @example getRoute('/path/to/:id/:sub', {id: 1, sub: 2}) => /path/to/1/2
   * @example getRoute('/path/to/', {}. {id:1, sub: 2}) => /path/to?id=1&sub=2
   */
  getRoute: (path, params = {}, query = {}, host = undefined) => {
    const prevPath = path;
    Object.keys(params).forEach((key) => {
      path = path.replace(`:${key}`, params[key]);
    });

    // When the path doesn't have identify of parameter
    if (prevPath === path && !isEmpty(params)) {
      if (path.slice(-1) !== '/') {
        path += '/';
      }
      path += Object.keys(params)
        .map((key) => `${params[key]}`)
        .join('/');
    }

    const queryValues = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');

    if (host !== undefined) {
      path = `${host}${path}?${queryValues}`;
    }
    return `${path}?${queryValues}`;
  },
};


/**
 * How to use:
 * Example ULR: http://abc.com?key=value
 * const query = useQuery();
 * query.get('key')
 */
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
